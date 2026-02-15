"""users_tokens_simulation_runs

Revision ID: 001
Revises:
Create Date: 2026-02-15

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("clerk_user_id", sa.String(255), unique=True, nullable=False, index=True),
        sa.Column("email", sa.String(320), nullable=True),
        sa.Column("display_name", sa.String(255), nullable=True),
        sa.Column("avatar_url", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )

    op.create_table(
        "token_transactions",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "user_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id"),
            nullable=False,
            index=True,
        ),
        sa.Column("amount", sa.Integer(), nullable=False),
        sa.Column("transaction_type", sa.String(50), nullable=False),
        sa.Column("stripe_session_id", sa.String(255), nullable=True),
        sa.Column("simulation_run_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )

    op.create_table(
        "simulation_runs",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "user_id",
            postgresql.UUID(as_uuid=True),
            sa.ForeignKey("users.id"),
            nullable=False,
            index=True,
        ),
        sa.Column("organism_name", sa.String(255), nullable=False),
        sa.Column("config", postgresql.JSONB(), nullable=True),
        sa.Column("status", sa.String(50), nullable=False, server_default="created"),
        sa.Column("is_public", sa.Boolean(), server_default="true"),
        sa.Column("result_summary", postgresql.JSONB(), nullable=True),
        sa.Column("started_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
        ),
    )

    op.create_index(
        "ix_simulation_runs_public_completed",
        "simulation_runs",
        ["is_public", sa.text("completed_at DESC")],
        postgresql_where=sa.text("status = 'completed'"),
    )


def downgrade() -> None:
    op.drop_index("ix_simulation_runs_public_completed", table_name="simulation_runs")
    op.drop_table("simulation_runs")
    op.drop_table("token_transactions")
    op.drop_table("users")
