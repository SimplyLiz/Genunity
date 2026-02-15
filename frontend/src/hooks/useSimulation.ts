import { useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useSimulationStore } from '../stores/simulationStore';
import type { SimulationConfig, Perturbation } from '../types/simulation';

async function authFetch(url: string, getToken: () => Promise<string | null>, options: RequestInit = {}) {
  const token = await getToken();
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

export function useSimulation() {
  const { config, status, state, setConfig, setStatus } = useSimulationStore();
  const { getToken } = useAuth();

  const createSimulation = useCallback(async (_config: SimulationConfig) => {
    setConfig(_config);
    const res = await authFetch('/api/v1/simulations/', getToken, {
      method: 'POST',
      body: JSON.stringify({
        organism_name: _config.organismName,
        genome_fasta: _config.genomeFasta,
        config: _config,
      }),
    });
    if (!res.ok) throw new Error('Failed to create simulation');
    return res.json();
  }, [setConfig, getToken]);

  const startSimulation = useCallback(async (id: string) => {
    const res = await authFetch(`/api/v1/simulations/${id}/start`, getToken, {
      method: 'POST',
    });
    if (res.status === 402) throw new Error('Insufficient tokens');
    if (!res.ok) throw new Error('Failed to start simulation');
    return res.json();
  }, [getToken]);

  const stopSimulation = useCallback(async (id: string) => {
    const res = await authFetch(`/api/v1/simulations/${id}/stop`, getToken, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to stop simulation');
    return res.json();
  }, [getToken]);

  const injectPerturbation = useCallback(async (id: string, perturbation: Perturbation) => {
    const res = await authFetch(`/api/v1/simulations/${id}/perturbation`, getToken, {
      method: 'POST',
      body: JSON.stringify(perturbation),
    });
    if (!res.ok) throw new Error('Failed to inject perturbation');
    return res.json();
  }, [getToken]);

  void setStatus;

  return {
    config,
    status,
    state,
    createSimulation,
    startSimulation,
    stopSimulation,
    injectPerturbation,
  };
}
