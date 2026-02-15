import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useAuthStore } from '../../stores/authStore';

export function TokenBalance() {
  const { getToken } = useAuth();
  const { tokenBalance, isLoadingBalance, fetchBalance } = useAuthStore();

  useEffect(() => {
    fetchBalance(getToken);
  }, [fetchBalance, getToken]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: '#2a2a3e',
        padding: '4px 12px',
        borderRadius: 20,
        fontSize: 13,
        color: '#c4b5fd',
      }}
    >
      <span>🧪</span>
      <span>{isLoadingBalance ? '...' : tokenBalance}</span>
    </div>
  );
}
