"""Master Dagster Definitions — all assets, resources, schedules, sensors."""

from dagster import Definitions, load_assets_from_modules

from biolab.pipelines import assets
from biolab.pipelines.assets import (
    homology,
    structure,
    context,
    localization,
    local_homology,
    synwiki_asset,
    synthesis,
)
from biolab.pipelines.resources import DatabaseResource, HttpClientResource
from biolab.pipelines.schedules import (
    weekly_full_pipeline,
    daily_literature_refresh,
    daily_synthesis_refresh,
)
from biolab.pipelines.sensors import new_genes_sensor, stale_evidence_sensor

all_assets = load_assets_from_modules(
    [homology, structure, context, localization, local_homology, synwiki_asset, synthesis]
)

defs = Definitions(
    assets=all_assets,
    resources={
        "database": DatabaseResource(),
        "http_client": HttpClientResource(),
    },
    schedules=[
        weekly_full_pipeline,
        daily_literature_refresh,
        daily_synthesis_refresh,
    ],
    sensors=[
        new_genes_sensor,
        stale_evidence_sensor,
    ],
)
