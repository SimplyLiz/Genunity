import { create } from 'zustand';
import type { SimulationConfig, SimulationState, SimulationStatus } from '../types/simulation';

interface SimulationStore {
  config: SimulationConfig | null;
  status: SimulationStatus | null;
  state: SimulationState | null;
  isConnected: boolean;

  setConfig: (config: SimulationConfig) => void;
  setStatus: (status: SimulationStatus) => void;
  setState: (state: SimulationState) => void;
  setConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  config: null,
  status: null,
  state: null,
  isConnected: false,

  setConfig: (config) => set({ config }),
  setStatus: (status) => set({ status }),
  setState: (state) => set({ state }),
  setConnected: (connected) => set({ isConnected: connected }),
  reset: () => set({ config: null, status: null, state: null, isConnected: false }),
}));
