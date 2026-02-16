"""Auth routes: user info and Clerk webhook."""

from __future__ import annotations

import json

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from biolab.api.platform_deps import get_current_user
from biolab.api.v1.platform_schemas import UserInfoResponse
from biolab.db.async_engine import get_async_db
from biolab.db.models.platform import TokenTransaction, User

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/me", response_model=UserInfoResponse)
async def get_me(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_async_db),
) -> UserInfoResponse:
    result = await db.execute(
        select(func.coalesce(func.sum(TokenTransaction.amount), 0)).where(
            TokenTransaction.user_id == user.id
        )
    )
    balance = result.scalar_one()

    return UserInfoResponse(
        id=str(user.id),
        clerk_user_id=user.clerk_user_id,
        email=user.email,
        display_name=user.display_name,
        avatar_url=user.avatar_url,
        token_balance=int(balance),
    )


@router.post("/clerk-webhook")
async def clerk_webhook(request: Request, db: AsyncSession = Depends(get_async_db)) -> dict[str, str]:
    body = await request.body()
    try:
        payload = json.loads(body)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON") from exc

    event_type = payload.get("type")
    if event_type not in ("user.created", "user.updated"):
        return {"status": "ignored"}

    data = payload.get("data", {})
    clerk_user_id = data.get("id")
    if not clerk_user_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Missing user ID")

    email_addresses = data.get("email_addresses", [])
    primary_email = email_addresses[0].get("email_address") if email_addresses else None

    display_name_parts = []
    if data.get("first_name"):
        display_name_parts.append(data["first_name"])
    if data.get("last_name"):
        display_name_parts.append(data["last_name"])
    display_name = " ".join(display_name_parts) or None
    avatar_url = data.get("image_url")

    result = await db.execute(select(User).where(User.clerk_user_id == clerk_user_id))
    user = result.scalar_one_or_none()
    if user is None:
        user = User(clerk_user_id=clerk_user_id)
        db.add(user)

    if primary_email is not None:
        user.email = primary_email
    if display_name is not None:
        user.display_name = display_name
    if avatar_url is not None:
        user.avatar_url = avatar_url

    await db.flush()
    return {"status": "ok"}
