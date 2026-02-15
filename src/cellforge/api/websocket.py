"""WebSocket handler for real-time simulation streaming."""

from __future__ import annotations

from fastapi import WebSocket


async def simulation_ws(websocket: WebSocket, simulation_id: str) -> None:
    """Stream simulation state updates over WebSocket.

    Args:
        websocket: FastAPI WebSocket connection.
        simulation_id: ID of the simulation to stream.
    """
    await websocket.accept()
    try:
        while True:
            await websocket.send_json({"status": "not_implemented", "simulation_id": simulation_id})
            break
    finally:
        await websocket.close()
