"""Token balance and checkout routes."""

from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from cellforge.api.deps import get_current_user
from cellforge.api.schemas import CheckoutRequest, CheckoutResponse, TokenBalanceResponse
from cellforge.db.models import User
from cellforge.db.session import get_db
from cellforge.services import token_service
from cellforge.services.stripe_service import create_checkout_session

router = APIRouter(prefix="/tokens", tags=["tokens"])


@router.get("/balance", response_model=TokenBalanceResponse)
async def get_balance(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> TokenBalanceResponse:
    """Get current user's token balance."""
    balance = await token_service.get_balance(db, user.id)
    return TokenBalanceResponse(balance=balance)


@router.post("/checkout", response_model=CheckoutResponse)
async def create_checkout(
    request: CheckoutRequest,
    user: User = Depends(get_current_user),
) -> CheckoutResponse:
    """Create a Stripe Checkout session for purchasing tokens."""
    session = create_checkout_session(
        clerk_user_id=user.clerk_user_id,
        user_email=user.email,
        quantity=request.quantity,
    )
    return CheckoutResponse(checkout_url=session.url or "")
