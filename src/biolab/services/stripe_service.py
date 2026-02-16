"""Stripe Checkout and webhook verification."""

from __future__ import annotations

import os

import stripe


def _get_stripe() -> None:
    stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")


def create_checkout_session(
    clerk_user_id: str,
    user_email: str | None,
    quantity: int = 1,
) -> stripe.checkout.Session:
    """Create a Stripe Checkout session for token purchase."""
    _get_stripe()
    price_id = os.environ.get("STRIPE_PRICE_ID", "")
    frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:5173")

    params: dict = {
        "mode": "payment",
        "line_items": [{"price": price_id, "quantity": quantity}],
        "success_url": f"{frontend_url}/tokens?success=true",
        "cancel_url": f"{frontend_url}/tokens?canceled=true",
        "metadata": {"clerk_user_id": clerk_user_id},
    }
    if user_email:
        params["customer_email"] = user_email

    return stripe.checkout.Session.create(**params)


def verify_webhook_signature(
    payload: bytes,
    sig_header: str,
) -> stripe.Event:
    """Verify and parse a Stripe webhook event."""
    _get_stripe()
    webhook_secret = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
    return stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
