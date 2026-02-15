"""Public research feed routes (no auth required)."""

from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from cellforge.api.schemas import PublicResearchItem
from cellforge.db.models import SimulationRun, User
from cellforge.db.session import get_db

router = APIRouter(prefix="/public", tags=["public"])


@router.get("/research", response_model=list[PublicResearchItem])
async def list_public_research(
    limit: int = Query(default=20, le=100),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_db),
) -> list[PublicResearchItem]:
    """List completed public simulation runs with researcher info."""
    result = await db.execute(
        select(SimulationRun, User)
        .join(User, SimulationRun.user_id == User.id)
        .where(SimulationRun.is_public.is_(True), SimulationRun.status == "completed")
        .order_by(SimulationRun.completed_at.desc())
        .limit(limit)
        .offset(offset)
    )
    rows = result.all()

    return [
        PublicResearchItem(
            id=str(run.id),
            organism_name=run.organism_name,
            config=run.config,
            result_summary=run.result_summary,
            started_at=run.started_at,
            completed_at=run.completed_at,
            researcher_name=user.display_name or "Anonymous Researcher",
            researcher_avatar_url=user.avatar_url,
        )
        for run, user in rows
    ]


@router.get("/research/{run_id}", response_model=PublicResearchItem)
async def get_public_research(
    run_id: str,
    db: AsyncSession = Depends(get_db),
) -> PublicResearchItem:
    """Get detail view of a single public simulation result."""
    try:
        run_uuid = uuid.UUID(run_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid run ID"
        ) from exc

    result = await db.execute(
        select(SimulationRun, User)
        .join(User, SimulationRun.user_id == User.id)
        .where(
            SimulationRun.id == run_uuid,
            SimulationRun.is_public.is_(True),
            SimulationRun.status == "completed",
        )
    )
    row = result.one_or_none()
    if row is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Research not found"
        )

    run, user = row
    return PublicResearchItem(
        id=str(run.id),
        organism_name=run.organism_name,
        config=run.config,
        result_summary=run.result_summary,
        started_at=run.started_at,
        completed_at=run.completed_at,
        researcher_name=user.display_name or "Anonymous Researcher",
        researcher_avatar_url=user.avatar_url,
    )
