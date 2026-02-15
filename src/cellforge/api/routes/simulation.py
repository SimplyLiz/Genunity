"""Simulation API routes (PRD §7.1) — token-gated."""

from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from cellforge.api.deps import get_current_user
from cellforge.api.schemas import (
    PerturbationRequest,
    SimulationCreateRequest,
    SimulationCreateResponse,
    SimulationStateResponse,
    SimulationStatusResponse,
)
from cellforge.db.models import SimulationRun, User
from cellforge.db.session import get_db
from cellforge.services import token_service

router = APIRouter(prefix="/simulations", tags=["simulations"])


@router.post("/", response_model=SimulationCreateResponse)
async def create_simulation(
    request: SimulationCreateRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> SimulationCreateResponse:
    """Create a new simulation (auth required)."""
    run = SimulationRun(
        id=uuid.uuid4(),
        user_id=user.id,
        organism_name=request.organism_name,
        config=request.config,
        status="created",
    )
    db.add(run)
    await db.flush()

    return SimulationCreateResponse(
        simulation_id=str(run.id),
        status="created",
    )


@router.get("/{simulation_id}", response_model=SimulationStatusResponse)
async def get_simulation_status(simulation_id: str) -> SimulationStatusResponse:
    """Get simulation status."""
    raise NotImplementedError("get_simulation_status not yet implemented")


@router.post("/{simulation_id}/start")
async def start_simulation(
    simulation_id: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, str]:
    """Start a simulation (deducts 1 token)."""
    try:
        run_uuid = uuid.UUID(simulation_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid simulation ID"
        ) from exc

    try:
        await token_service.debit_token_for_simulation(db, user.id, run_uuid)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail=str(exc),
        ) from exc

    # TODO: actually start the simulation engine
    return {"status": "running", "simulation_id": simulation_id}


@router.post("/{simulation_id}/stop")
async def stop_simulation(simulation_id: str) -> dict[str, str]:
    """Stop a running simulation."""
    raise NotImplementedError("stop_simulation not yet implemented")


@router.get("/{simulation_id}/state", response_model=SimulationStateResponse)
async def get_simulation_state(simulation_id: str) -> SimulationStateResponse:
    """Get current simulation state."""
    raise NotImplementedError("get_simulation_state not yet implemented")


@router.post("/{simulation_id}/perturbation")
async def inject_perturbation(
    simulation_id: str, request: PerturbationRequest
) -> dict[str, str]:
    """Inject a perturbation into a running simulation."""
    raise NotImplementedError("inject_perturbation not yet implemented")
