"""Async SQLAlchemy engine configuration."""

from __future__ import annotations

import os

from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine

_engine: AsyncEngine | None = None


def get_database_url() -> str:
    return os.environ.get(
        "DATABASE_URL",
        "postgresql+asyncpg://cellforge:cellforge@localhost:5432/cellforge",
    )


def get_engine() -> AsyncEngine:
    global _engine
    if _engine is None:
        _engine = create_async_engine(
            get_database_url(),
            pool_size=5,
            max_overflow=10,
        )
    return _engine


async def dispose_engine() -> None:
    global _engine
    if _engine is not None:
        await _engine.dispose()
        _engine = None
