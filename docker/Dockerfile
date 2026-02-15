# Stage 1: Build Rust extension
FROM rust:1.93-slim AS rust-builder

RUN apt-get update && apt-get install -y python3-dev python3-pip && rm -rf /var/lib/apt/lists/*
RUN pip3 install --break-system-packages maturin

WORKDIR /build
COPY Cargo.toml rust-toolchain.toml ./
COPY crates/ crates/
COPY pyproject.toml ./
COPY src/ src/

RUN maturin build --release --out /wheels

# Stage 2: Build frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /build
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Stage 3: Python runtime
FROM python:3.12-slim AS runtime

WORKDIR /app

COPY pyproject.toml ./
COPY src/ src/

# Install the wheel built in stage 1
COPY --from=rust-builder /wheels/*.whl /tmp/
RUN pip install /tmp/*.whl && rm /tmp/*.whl

# Copy frontend build
COPY --from=frontend-builder /build/dist /app/static

EXPOSE 8420 5173

CMD ["python", "-m", "uvicorn", "cellforge.api.app:create_app", "--factory", "--host", "0.0.0.0", "--port", "8420"]
