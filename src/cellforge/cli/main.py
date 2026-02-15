"""CellForge CLI (PRD §7.3) — built with Typer."""

from __future__ import annotations

from pathlib import Path

import typer

app = typer.Typer(
    name="cellforge",
    help="CellForge: Genome-agnostic whole-cell simulation engine.",
    add_completion=False,
)


@app.command()
def annotate(
    fasta: Path = typer.Argument(..., help="Path to genome FASTA file"),
    output: Path = typer.Option("annotation_output", "--output", "-o", help="Output directory"),
) -> None:
    """Run the genome annotation pipeline."""
    typer.echo(f"Annotating {fasta} → {output}")
    raise NotImplementedError("annotate command not yet implemented")


@app.command()
def run(
    config: Path = typer.Argument(..., help="Path to simulation config YAML/JSON"),
    output: Path = typer.Option("output", "--output", "-o", help="Output directory"),
    seed: int = typer.Option(42, "--seed", "-s", help="Random seed"),
) -> None:
    """Run a whole-cell simulation."""
    typer.echo(f"Running simulation from {config}")
    raise NotImplementedError("run command not yet implemented")


@app.command()
def serve(
    host: str = typer.Option("0.0.0.0", "--host", "-h", help="Bind host"),
    port: int = typer.Option(8420, "--port", "-p", help="Bind port"),
    reload: bool = typer.Option(False, "--reload", help="Enable auto-reload"),
) -> None:
    """Start the CellForge API server."""
    typer.echo(f"Starting server on {host}:{port}")
    raise NotImplementedError("serve command not yet implemented")


@app.command()
def info() -> None:
    """Show CellForge version and system info."""
    typer.echo("CellForge v0.1.0")
    try:
        from cellforge._engine import __version__ as engine_version

        typer.echo(f"Engine version: {engine_version}")
    except ImportError:
        typer.echo("Engine: not available (native extension not built)")


@app.command()
def references(
    download: bool = typer.Option(False, "--download", help="Download reference data"),
) -> None:
    """Manage reference genome data."""
    if download:
        typer.echo("Downloading reference data...")
        raise NotImplementedError("references download not yet implemented")
    else:
        typer.echo("Reference data management")
        raise NotImplementedError("references list not yet implemented")


@app.command()
def benchmark(
    organism: str = typer.Option("m_genitalium", "--organism", help="Organism to benchmark"),
    duration: float = typer.Option(100.0, "--duration", "-d", help="Simulation duration (s)"),
) -> None:
    """Run performance benchmarks."""
    typer.echo(f"Benchmarking {organism} for {duration}s")
    raise NotImplementedError("benchmark command not yet implemented")


if __name__ == "__main__":
    app()
