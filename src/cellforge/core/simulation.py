"""Simulation orchestrator (PRD §4.2)."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from cellforge.core.config import SimulationConfig
from cellforge.core.knowledge_base import KnowledgeBase
from cellforge.core.process import CellForgeProcess


class Simulation:
    """Top-level simulation interface (PRD §4.2).

    Manages the knowledge base, registered processes, state, and
    time-stepping loop.
    """

    def __init__(
        self,
        config: SimulationConfig,
        knowledge_base: KnowledgeBase | None = None,
    ) -> None:
        self.config = config
        self.knowledge_base = knowledge_base
        self._processes: dict[str, CellForgeProcess] = {}
        self._state: dict[str, Any] = {}
        self._time: float = 0.0
        self._initialized: bool = False

    @classmethod
    def from_fasta(cls, fasta_path: str | Path, config: SimulationConfig | None = None) -> Simulation:
        """Create a simulation from a genome FASTA file.

        Runs the annotation pipeline to build the knowledge base,
        then initializes the simulation.

        Args:
            fasta_path: Path to genome FASTA file.
            config: Optional simulation configuration.

        Returns:
            Configured Simulation instance.
        """
        raise NotImplementedError("from_fasta not yet implemented")

    @classmethod
    def from_knowledge_base(
        cls,
        kb: KnowledgeBase,
        config: SimulationConfig | None = None,
    ) -> Simulation:
        """Create a simulation from an existing knowledge base.

        Args:
            kb: Pre-built KnowledgeBase instance.
            config: Optional simulation configuration.

        Returns:
            Configured Simulation instance.
        """
        if config is None:
            config = SimulationConfig(organism_name=kb.organism)
        return cls(config=config, knowledge_base=kb)

    def register_process(self, process: CellForgeProcess) -> None:
        """Register a biological process with the simulation.

        Args:
            process: A CellForgeProcess subclass instance.
        """
        self._processes[process.name] = process

    def initialize(self) -> None:
        """Initialize all processes and set up the initial state."""
        raise NotImplementedError("initialize not yet implemented")

    def step(self, dt: float | None = None) -> dict[str, Any]:
        """Advance the simulation by one time step.

        Args:
            dt: Override time step (uses config.dt if None).

        Returns:
            Updated state dictionary.
        """
        raise NotImplementedError("step not yet implemented")

    def run(self) -> dict[str, Any]:
        """Run the simulation for the configured total_time.

        Returns:
            Final state dictionary.
        """
        raise NotImplementedError("run not yet implemented")

    def inject_perturbation(
        self,
        perturbation_type: str,
        target: str,
        value: Any,
    ) -> None:
        """Inject a perturbation into the running simulation.

        Args:
            perturbation_type: Type of perturbation (e.g., "knockout", "media_shift").
            target: Target entity (gene ID, metabolite ID, etc.).
            value: Perturbation value.
        """
        raise NotImplementedError("inject_perturbation not yet implemented")

    def get_state(self) -> dict[str, Any]:
        """Return the current simulation state.

        Returns:
            Copy of the current state dictionary.
        """
        return dict(self._state)

    def save_checkpoint(self, path: str | Path) -> None:
        """Save a simulation checkpoint to disk.

        Args:
            path: Output file path.
        """
        raise NotImplementedError("save_checkpoint not yet implemented")

    @classmethod
    def from_checkpoint(cls, path: str | Path) -> Simulation:
        """Restore a simulation from a checkpoint.

        Args:
            path: Path to checkpoint file.

        Returns:
            Restored Simulation instance.
        """
        raise NotImplementedError("from_checkpoint not yet implemented")
