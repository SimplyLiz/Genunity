import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export function BuyTokensButton() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch("/api/v1/tokens/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: 1 }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.checkout_url) {
          window.location.href = data.checkout_url;
        }
      }
    } catch {
      // checkout failed silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="buy-tokens-btn" onClick={handleBuy} disabled={loading}>
      {loading ? "Redirecting..." : "Buy 10 Tokens"}
    </button>
  );
}
