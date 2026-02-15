import { create } from 'zustand';

interface AuthStore {
  tokenBalance: number;
  isLoadingBalance: boolean;
  fetchBalance: (getToken: () => Promise<string | null>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  tokenBalance: 0,
  isLoadingBalance: false,

  fetchBalance: async (getToken) => {
    set({ isLoadingBalance: true });
    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch('/api/v1/tokens/balance', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        set({ tokenBalance: data.balance });
      }
    } finally {
      set({ isLoadingBalance: false });
    }
  },
}));
