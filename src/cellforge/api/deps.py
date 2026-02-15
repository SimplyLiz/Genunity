"""Shared FastAPI dependencies."""

from __future__ import annotations

import uuid

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from cellforge.api.middleware.clerk_auth import get_current_user_clerk_id
from cellforge.db.models import User
from cellforge.db.session import get_db


async def get_current_user(
    clerk_user_id: str = Depends(get_current_user_clerk_id),
    db: AsyncSession = Depends(get_db),
) -> User:
    """Resolve Clerk user ID to a DB User. Creates user on first auth (JIT)."""
    result = await db.execute(
        select(User).where(User.clerk_user_id == clerk_user_id)
    )
    user = result.scalar_one_or_none()
    if user is None:
        user = User(id=uuid.uuid4(), clerk_user_id=clerk_user_id)
        db.add(user)
        await db.flush()
    return user
