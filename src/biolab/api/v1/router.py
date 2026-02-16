"""Aggregate v1 routers."""

from fastapi import APIRouter

from biolab.api.v1.genes import router as genes_router
from biolab.api.v1.genomes import router as genomes_router
from biolab.api.v1.evidence import router as evidence_router
from biolab.api.v1.hypotheses import router as hypotheses_router
from biolab.api.v1.usage import router as usage_router
from biolab.api.v1.validation import router as validation_router
from biolab.api.v1.simulation import router as simulation_router
from biolab.api.v1.population import router as population_router

router = APIRouter(prefix="/api/v1")
router.include_router(genes_router)
router.include_router(genomes_router)
router.include_router(evidence_router)
router.include_router(hypotheses_router)
router.include_router(usage_router)
router.include_router(validation_router)
router.include_router(simulation_router)
router.include_router(population_router)

# CellForge whole-cell simulation routes
from biolab.cellforge.api.routes.simulation import router as cf_sim_router
from biolab.cellforge.api.routes.annotation import router as cf_ann_router
from biolab.cellforge.api.routes.health import router as cf_health_router

cellforge_router = APIRouter(prefix="/cellforge")
cellforge_router.include_router(cf_sim_router)
cellforge_router.include_router(cf_ann_router)
cellforge_router.include_router(cf_health_router)
router.include_router(cellforge_router)

# Platform routes (auth, tokens, payments, public research feed)
from biolab.api.v1.auth import router as auth_router
from biolab.api.v1.tokens import router as tokens_router
from biolab.api.v1.payments import router as payments_router
from biolab.api.v1.public import router as public_router

router.include_router(auth_router)
router.include_router(tokens_router)
router.include_router(payments_router)
router.include_router(public_router)
