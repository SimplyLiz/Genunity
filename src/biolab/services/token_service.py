"""Token balance and transaction logic."""

from __future__ import annotations

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from biolab.db.models.platform import TokenTransaction


async def get_balance(db: AsyncSession, user_id: uuid.UUID) -> int:
    """Get a user's token balance (ledger-derived)."""
    result = await db.execute(
        select(func.coalesce(func.sum(TokenTransaction.amount), 0)).where(
            TokenTransaction.user_id == user_id
        )
    )
    return int(result.scalar_one())


async def credit_tokens(
    db: AsyncSession,
    user_id: uuid.UUID,
    amount: int,
    transaction_type: str,
    stripe_session_id: str | None = None,
    description: str | None = None,
) -> TokenTransaction:
    """Credit tokens to a user's account."""
    txn = TokenTransaction(
        user_id=user_id,
        amount=amount,
        transaction_type=transaction_type,
        stripe_session_id=stripe_session_id,
        description=description,
    )
    db.add(txn)
    await db.flush()
    return txn


async def debit_token_for_simulation(
    db: AsyncSession,
    user_id: uuid.UUID,
    simulation_run_id: uuid.UUID,
) -> TokenTransaction:
    """Deduct 1 token for a simulation run. Raises ValueError if balance < 1."""
    balance = await get_balance(db, user_id)
    if balance < 1:
        raise ValueError("Insufficient token balance")

    txn = TokenTransaction(
        user_id=user_id,
        amount=-1,
        transaction_type="simulation",
        simulation_run_id=simulation_run_id,
        description="Simulation run token deduction",
    )
    db.add(txn)
    await db.flush()
    return txn
