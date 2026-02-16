"""Token balance and checkout routes."""

from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from biolab.api.platform_deps import get_current_user
from biolab.api.v1.platform_schemas import CheckoutRequest, CheckoutResponse, TokenBalanceResponse
from biolab.db.async_engine import get_async_db
from biolab.db.models.platform import User
from biolab.services import token_service
from biolab.services.stripe_service import create_checkout_session

router = APIRouter(prefix="/tokens", tags=["tokens"])


@router.get("/balance", response_model=TokenBalanceResponse)
async def get_balance(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_db),
) -> TokenBalanceResponse:
    balance = await token_service.get_balance(db, user.id)
    return TokenBalanceResponse(balance=balance)


@router.post("/checkout", response_model=CheckoutResponse)
async def create_checkout(
    request: CheckoutRequest,
    user: User = Depends(get_current_user),
) -> CheckoutResponse:
    session = create_checkout_session(
        clerk_user_id=user.clerk_user_id,
        user_email=user.email,
        quantity=request.quantity,
    )
    return CheckoutResponse(checkout_url=session.url or "")
