import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useAuthStore } from '../../stores/authStore';
import { BuyTokensButton } from './BuyTokensButton';

export function TokensPage() {
  const [searchParams] = useSearchParams();
  const { getToken } = useAuth();
  const { tokenBalance, fetchBalance } = useAuthStore();
  const success = searchParams.get('success') === 'true';
  const canceled = searchParams.get('canceled') === 'true';

  useEffect(() => {
    fetchBalance(getToken);
  }, [fetchBalance, getToken]);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '60px auto',
        padding: 32,
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Research Tokens</h1>
      <p style={{ color: '#aaa', marginBottom: 32 }}>
        1 token = 1 simulation run. All results are published as open research.
      </p>

      {success && (
        <div
          style={{
            background: '#064e3b',
            color: '#6ee7b7',
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          Payment successful! Your tokens have been credited.
        </div>
      )}

      {canceled && (
        <div
          style={{
            background: '#7f1d1d',
            color: '#fca5a5',
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          Payment was canceled.
        </div>
      )}

      <div
        style={{
          background: '#1a1a2e',
          borderRadius: 12,
          padding: 32,
          marginBottom: 32,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 700, color: '#c4b5fd' }}>
          {tokenBalance}
        </div>
        <div style={{ color: '#aaa', marginTop: 4 }}>tokens available</div>
      </div>

      <BuyTokensButton />
    </div>
  );
}
