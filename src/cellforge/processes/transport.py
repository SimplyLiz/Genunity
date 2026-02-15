"""Membrane transport process (PRD §5)."""

from __future__ import annotations

from typing import Any

from cellforge.core.process import CellForgeProcess, ProcessPorts, Port


class Transport(CellForgeProcess):
    """Membrane transport process for nutrient uptake and secretion."""

    name = "transport"
    algorithm = "ode_rk45"
    preferred_dt = 1.0

    def ports(self) -> ProcessPorts:
        return ProcessPorts(
            inputs=[
                Port(name="external_metabolites", dtype="float64"),
                Port(name="internal_metabolites", dtype="float64"),
                Port(name="transporter_counts", dtype="int64"),
            ],
            outputs=[
                Port(name="metabolite_flux", dtype="float64"),
            ],
        )

    def step(self, state: dict[str, Any], dt: float) -> dict[str, Any]:
        raise NotImplementedError("Transport.step not yet implemented")
