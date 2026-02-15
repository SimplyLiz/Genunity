"""Metabolism process — Flux Balance Analysis (PRD §5)."""

from __future__ import annotations

from typing import Any

from cellforge.core.process import CellForgeProcess, ProcessPorts, Port


class Metabolism(CellForgeProcess):
    """FBA-based metabolism process."""

    name = "metabolism"
    algorithm = "fba"
    preferred_dt = 1.0

    def ports(self) -> ProcessPorts:
        return ProcessPorts(
            inputs=[
                Port(name="metabolite_concentrations", dtype="float64"),
                Port(name="enzyme_concentrations", dtype="float64"),
            ],
            outputs=[
                Port(name="flux_distribution", dtype="float64"),
                Port(name="metabolite_updates", dtype="float64"),
                Port(name="growth_rate", dtype="float64"),
            ],
        )

    def step(self, state: dict[str, Any], dt: float) -> dict[str, Any]:
        raise NotImplementedError("Metabolism.step not yet implemented")
