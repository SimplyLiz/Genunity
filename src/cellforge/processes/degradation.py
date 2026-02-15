"""Macromolecule degradation process (PRD §5)."""

from __future__ import annotations

from typing import Any

from cellforge.core.process import CellForgeProcess, ProcessPorts, Port


class Degradation(CellForgeProcess):
    """mRNA and protein degradation process."""

    name = "degradation"
    algorithm = "gillespie"
    preferred_dt = 0.1

    def ports(self) -> ProcessPorts:
        return ProcessPorts(
            inputs=[
                Port(name="mrna_counts", dtype="int64"),
                Port(name="protein_counts", dtype="int64"),
            ],
            outputs=[
                Port(name="mrna_updates", dtype="int64"),
                Port(name="protein_updates", dtype="int64"),
            ],
        )

    def step(self, state: dict[str, Any], dt: float) -> dict[str, Any]:
        raise NotImplementedError("Degradation.step not yet implemented")
