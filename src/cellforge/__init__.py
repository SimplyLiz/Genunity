"""CellForge: Genome-agnostic whole-cell simulation engine."""

from cellforge.core.config import SimulationConfig
from cellforge.core.knowledge_base import KnowledgeBase
from cellforge.core.process import CellForgeProcess
from cellforge.core.simulation import Simulation

__all__ = [
    "CellForgeProcess",
    "KnowledgeBase",
    "Simulation",
    "SimulationConfig",
]

try:
    from cellforge._engine import __version__ as _engine_version
except ImportError:
    _engine_version = None
