"""Platform API schemas (auth, tokens, public research)."""

from __future__ import annotations

from pydantic import BaseModel


class UserInfoResponse(BaseModel):
    id: str
    clerk_user_id: str
    email: str | None = None
    display_name: str | None = None
    avatar_url: str | None = None
    token_balance: int = 0


class TokenBalanceResponse(BaseModel):
    balance: int


class CheckoutRequest(BaseModel):
    quantity: int = 1


class CheckoutResponse(BaseModel):
    checkout_url: str


class PublicResearchItem(BaseModel):
    id: str
    organism_name: str
    config: dict | None = None
    result_summary: dict | None = None
    started_at: str | None = None
    completed_at: str | None = None
    researcher_name: str
    researcher_avatar_url: str | None = None
