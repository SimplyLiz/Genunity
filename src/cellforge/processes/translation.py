"""Translation process — stochastic protein synthesis (PRD §5)."""

from __future__ import annotations

from typing import Any

from cellforge.core.process import CellForgeProcess, ProcessPorts, Port


class Translation(CellForgeProcess):
    """Gillespie SSA-based translation process."""

    name = "translation"
    algorithm = "gillespie"
    preferred_dt = 0.1

    def ports(self) -> ProcessPorts:
        return ProcessPorts(
            inputs=[
                Port(name="mrna_counts", dtype="int64"),
                Port(name="ribosome_count", dtype="int64"),
                Port(name="aa_concentrations", dtype="float64"),
            ],
            outputs=[
                Port(name="protein_counts", dtype="int64"),
                Port(name="aa_updates", dtype="float64"),
            ],
        )

    def step(self, state: dict[str, Any], dt: float) -> dict[str, Any]:
        raise NotImplementedError("Translation.step not yet implemented")
