"""CLI entry point."""

import typer

from biolab.cli.genes import app as genes_app

app = typer.Typer(
    name="biolab",
    help="BioLab — Unified Bioinformatics Platform",
    no_args_is_help=True,
)

app.add_typer(genes_app, name="genes", help="Gene operations")


def _register_lazy():
    """Register subcommands that have heavier imports."""
    from biolab.cli.analyze import app as analyze_app
    from biolab.cli.export import app as export_app
    from biolab.cli.db import init_cmd
    from biolab.cli.evidence import app as evidence_app
    from biolab.cli.synthesize import app as synthesize_app
    from biolab.cli.pipeline_cmd import app as pipeline_app
    from biolab.cli.validate import app as validate_app

    app.add_typer(analyze_app, name="analyze", help="Deep gene analysis & LLM synthesis")
    app.add_typer(export_app, name="export", help="Export data for cross-project integration")
    app.add_typer(evidence_app, name="evidence", help="Evidence source management")
    app.add_typer(synthesize_app, name="synthesize", help="LLM function synthesis")
    app.add_typer(pipeline_app, name="pipeline", help="Multi-phase evidence pipeline")
    app.add_typer(validate_app, name="validate", help="Validation and quality checks")
    app.command(name="init")(init_cmd)

    from biolab.cellforge.cli.main import app as cellforge_app

    app.add_typer(cellforge_app, name="cellforge", help="CellForge whole-cell simulation engine")


_register_lazy()


if __name__ == "__main__":
    app()
