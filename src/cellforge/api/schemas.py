"""API request/response schemas (PRD §7.1)."""

from __future__ import annotations

from pydantic import BaseModel, Field


class SimulationCreateRequest(BaseModel):
    """Request to create a new simulation."""

    organism_name: str
    genome_fasta: str | None = None
    knowledge_base_id: str | None = None
    config: dict[str, object] = Field(default_factory=dict)


class SimulationCreateResponse(BaseModel):
    """Response after creating a simulation."""

    simulation_id: str
    status: str = "created"


class SimulationStatusResponse(BaseModel):
    """Current simulation status."""

    simulation_id: str
    status: str
    time: float = 0.0
    total_time: float = 0.0
    progress: float = 0.0


class SimulationStateResponse(BaseModel):
    """Simulation state snapshot."""

    simulation_id: str
    time: float
    state: dict[str, object] = Field(default_factory=dict)


class PerturbationRequest(BaseModel):
    """Request to inject a perturbation."""

    perturbation_type: str
    target: str
    value: object


class AnnotationRequest(BaseModel):
    """Request to run genome annotation."""

    genome_fasta: str
    output_dir: str = "annotation_output"


class AnnotationStatusResponse(BaseModel):
    """Annotation pipeline status."""

    job_id: str
    status: str
    stage: str = ""
    progress: float = 0.0


class HealthResponse(BaseModel):
    """Health check response."""

    status: str = "ok"
    version: str = "0.1.0"
    engine_available: bool = False


class UserInfoResponse(BaseModel):
    """Current user info with token balance."""

    id: str
    clerk_user_id: str
    email: str | None = None
    display_name: str | None = None
    avatar_url: str | None = None
    token_balance: int = 0


class TokenBalanceResponse(BaseModel):
    """Token balance response."""

    balance: int


class CheckoutRequest(BaseModel):
    """Request to create a Stripe Checkout session."""

    quantity: int = 1


class CheckoutResponse(BaseModel):
    """Response with Stripe Checkout URL."""

    checkout_url: str


class PublicResearchItem(BaseModel):
    """Public research result for the feed."""

    id: str
    organism_name: str
    config: dict | None = None
    result_summary: dict | None = None
    started_at: str | None = None
    completed_at: str | None = None
    researcher_name: str
    researcher_avatar_url: str | None = None
