"""Gene regulation process (PRD §5)."""

from __future__ import annotations

from typing import Any

from cellforge.core.process import CellForgeProcess, ProcessPorts, Port


class Regulation(CellForgeProcess):
    """Transcription factor-mediated gene regulation."""

    name = "regulation"
    algorithm = "event_driven"
    preferred_dt = 1.0

    def ports(self) -> ProcessPorts:
        return ProcessPorts(
            inputs=[
                Port(name="tf_concentrations", dtype="float64"),
                Port(name="metabolite_concentrations", dtype="float64"),
            ],
            outputs=[
                Port(name="gene_states", dtype="int64"),
                Port(name="promoter_activities", dtype="float64"),
            ],
        )

    def step(self, state: dict[str, Any], dt: float) -> dict[str, Any]:
        raise NotImplementedError("Regulation.step not yet implemented")
