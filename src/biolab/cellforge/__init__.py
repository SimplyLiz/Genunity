"""CellForge: Genome-agnostic whole-cell simulation engine."""

from biolab.cellforge.core.config import SimulationConfig
from biolab.cellforge.core.knowledge_base import KnowledgeBase
from biolab.cellforge.core.process import CellForgeProcess
from biolab.cellforge.core.simulation import Simulation

__all__ = [
    "CellForgeProcess",
    "KnowledgeBase",
    "Simulation",
    "SimulationConfig",
]

try:
    from biolab.cellforge._engine import __version__ as _engine_version
except ImportError:
    _engine_version = None
