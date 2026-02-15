"""DNA replication process — ODE-based (PRD §5)."""

from __future__ import annotations

from typing import Any

from cellforge.core.process import CellForgeProcess, ProcessPorts, Port


class Replication(CellForgeProcess):
    """ODE RK45-based DNA replication process."""

    name = "replication"
    algorithm = "ode_rk45"
    preferred_dt = 1.0

    def ports(self) -> ProcessPorts:
        return ProcessPorts(
            inputs=[
                Port(name="dntp_concentrations", dtype="float64"),
                Port(name="replisome_state", dtype="float64"),
            ],
            outputs=[
                Port(name="replication_progress", dtype="float64"),
                Port(name="dntp_updates", dtype="float64"),
            ],
        )

    def step(self, state: dict[str, Any], dt: float) -> dict[str, Any]:
        raise NotImplementedError("Replication.step not yet implemented")
