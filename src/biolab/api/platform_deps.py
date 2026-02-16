"""Platform-layer FastAPI dependencies (async PostgreSQL, Clerk auth)."""

from __future__ import annotations

import uuid

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from biolab.api.middleware.clerk_auth import get_current_user_clerk_id
from biolab.db.async_engine import get_async_db
from biolab.db.models.platform import User


async def get_platform_db(
    db: AsyncSession = Depends(get_async_db),
) -> AsyncSession:
    """Alias for the async platform DB session."""
    return db


async def get_current_user(
    clerk_user_id: str = Depends(get_current_user_clerk_id),
    db: AsyncSession = Depends(get_async_db),
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
