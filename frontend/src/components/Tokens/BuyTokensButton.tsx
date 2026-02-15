import { useAuth } from '@clerk/clerk-react';
import { useState } from 'react';

export function BuyTokensButton() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch('/api/v1/tokens/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      if (res.ok) {
        const data = await res.json();
        window.location.href = data.checkout_url;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      style={{
        background: '#7c3aed',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '12px 24px',
        cursor: loading ? 'wait' : 'pointer',
        fontSize: 16,
        fontWeight: 600,
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? 'Redirecting...' : 'Buy 10 Research Tokens'}
    </button>
  );
}
