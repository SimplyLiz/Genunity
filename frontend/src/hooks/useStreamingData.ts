import { useEffect, useRef } from 'react';
import { useSimulationStore } from '../stores/simulationStore';

export function useStreamingData(simulationId: string | null) {
  const wsRef = useRef<WebSocket | null>(null);
  const { setConnected } = useSimulationStore();

  useEffect(() => {
    if (!simulationId) return;

    const ws = new WebSocket(`ws://localhost:8420/ws/simulations/${simulationId}`);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);
    ws.onmessage = (_event) => {
      // TODO: parse and dispatch state updates
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [simulationId, setConnected]);

  return { ws: wsRef.current };
}
