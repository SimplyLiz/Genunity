# CellForge

Genome-agnostic whole-cell simulation engine.

CellForge takes a genome FASTA file, automatically annotates it, builds a structured knowledge base, and runs a modular whole-cell simulation coupling metabolism (FBA), transcription, translation, replication, and more.

## Dev Setup

### Prerequisites

- Rust (stable) — `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
- Python 3.12+
- Node 20+
- Docker + Docker Compose

### Quick Start

```bash
# Build the Rust extension + install Python package
maturin develop

# Run tests
python -m pytest tests/ -v

# Start the API server
cellforge serve

# Start the frontend
cd frontend && npm install && npm run dev

# Start Redis (for state streaming)
docker compose up -d redis
```

## Architecture

- `crates/cellforge-engine/` — Rust core (SSA, ODE solvers, state store, FBA)
- `src/cellforge/` — Python package (processes, annotation, AI, API)
- `frontend/` — React + Three.js visualization
- `docker/` — Container definitions

## License

Apache-2.0
