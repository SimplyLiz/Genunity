"""Annotation API routes."""

from __future__ import annotations

from fastapi import APIRouter

from cellforge.api.schemas import AnnotationRequest, AnnotationStatusResponse

router = APIRouter(prefix="/annotation", tags=["annotation"])


@router.post("/", response_model=AnnotationStatusResponse)
async def start_annotation(request: AnnotationRequest) -> AnnotationStatusResponse:
    """Start a genome annotation job."""
    raise NotImplementedError("start_annotation not yet implemented")


@router.get("/{job_id}", response_model=AnnotationStatusResponse)
async def get_annotation_status(job_id: str) -> AnnotationStatusResponse:
    """Get annotation job status."""
    raise NotImplementedError("get_annotation_status not yet implemented")
