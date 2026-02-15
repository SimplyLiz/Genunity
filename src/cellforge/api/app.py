"""FastAPI application factory (PRD §7)."""

from __future__ import annotations

import os
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
    yield
    from cellforge.db.engine import dispose_engine

    await dispose_engine()


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title="CellForge API",
        description="Genome-agnostic whole-cell simulation engine",
        version="0.1.0",
        lifespan=lifespan,
    )

    frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:5173")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173", frontend_url],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    from cellforge.api.routes.annotation import router as annotation_router
    from cellforge.api.routes.auth import router as auth_router
    from cellforge.api.routes.health import router as health_router
    from cellforge.api.routes.payments import router as payments_router
    from cellforge.api.routes.public import router as public_router
    from cellforge.api.routes.simulation import router as simulation_router
    from cellforge.api.routes.tokens import router as tokens_router

    app.include_router(health_router, prefix="/api/v1")
    app.include_router(auth_router, prefix="/api/v1")
    app.include_router(simulation_router, prefix="/api/v1")
    app.include_router(annotation_router, prefix="/api/v1")
    app.include_router(tokens_router, prefix="/api/v1")
    app.include_router(payments_router, prefix="/api/v1")
    app.include_router(public_router, prefix="/api/v1")

    return app
