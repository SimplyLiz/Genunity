"""Transcription process — stochastic mRNA synthesis (PRD §5)."""

from __future__ import annotations

from typing import Any

from cellforge.core.process import CellForgeProcess, ProcessPorts, Port


class Transcription(CellForgeProcess):
    """Gillespie SSA-based transcription process."""

    name = "transcription"
    algorithm = "gillespie"
    preferred_dt = 0.1

    def ports(self) -> ProcessPorts:
        return ProcessPorts(
            inputs=[
                Port(name="gene_states", dtype="int64"),
                Port(name="rnap_count", dtype="int64"),
                Port(name="ntp_concentrations", dtype="float64"),
            ],
            outputs=[
                Port(name="mrna_counts", dtype="int64"),
                Port(name="ntp_updates", dtype="float64"),
            ],
        )

    def step(self, state: dict[str, Any], dt: float) -> dict[str, Any]:
        raise NotImplementedError("Transcription.step not yet implemented")
