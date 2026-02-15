"""Stripe payment webhook route."""

from __future__ import annotations

import logging

from fastapi import APIRouter, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from cellforge.db.models import User
from cellforge.db.session import get_db
from cellforge.services import token_service
from cellforge.services.stripe_service import verify_webhook_signature

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/payments", tags=["payments"])

TOKENS_PER_PACK = 10


@router.post("/webhook")
async def stripe_webhook(request: Request) -> dict[str, str]:
    """Handle Stripe webhook events."""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    try:
        event = verify_webhook_signature(payload, sig_header)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Webhook verification failed: {exc}",
        ) from exc

    if event.type == "checkout.session.completed":
        session = event.data.object
        clerk_user_id = session.metadata.get("clerk_user_id") if session.metadata else None

        if not clerk_user_id:
            logger.error("Checkout session missing clerk_user_id metadata")
            return {"status": "error", "detail": "missing clerk_user_id"}

        # Use own DB session (not auth-gated)
        async for db in get_db():
            result = await db.execute(
                select(User).where(User.clerk_user_id == clerk_user_id)
            )
            user = result.scalar_one_or_none()
            if user is None:
                user = User(clerk_user_id=clerk_user_id)
                db.add(user)
                await db.flush()

            quantity = session.get("quantity", 1) if isinstance(session, dict) else 1
            total_tokens = TOKENS_PER_PACK * quantity

            await token_service.credit_tokens(
                db,
                user.id,
                amount=total_tokens,
                transaction_type="purchase",
                stripe_session_id=session.id if hasattr(session, "id") else str(session),
                description=f"Purchased {total_tokens} research tokens",
            )

    return {"status": "ok"}
