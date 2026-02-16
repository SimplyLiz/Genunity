import { create } from "zustand";

interface AuthState {
  tokenBalance: number;
  loading: boolean;
  fetchBalance: (getToken: () => Promise<string | null>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  tokenBalance: 0,
  loading: false,

  fetchBalance: async (getToken) => {
    set({ loading: true });
    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch("/api/v1/tokens/balance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        set({ tokenBalance: data.balance });
      }
    } catch {
      // silently fail — balance stays at last known value
    } finally {
      set({ loading: false });
    }
  },
}));
