import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAuthStore } from "../../stores/authStore";
import { BuyTokensButton } from "./BuyTokensButton";

export function TokensPage() {
  const { getToken } = useAuth();
  const { tokenBalance, fetchBalance } = useAuthStore();
  const params = new URLSearchParams(window.location.search);
  const checkoutStatus = params.get("checkout");

  useEffect(() => {
    fetchBalance(getToken);
  }, [getToken, fetchBalance]);

  return (
    <div className="tokens-page">
      <h1>Research Tokens</h1>

      {checkoutStatus === "success" && (
        <div className="checkout-success">
          Tokens purchased successfully! Your balance has been updated.
        </div>
      )}
      {checkoutStatus === "cancel" && (
        <div className="checkout-cancel">
          Checkout was cancelled. No tokens were purchased.
        </div>
      )}

      <div className="token-card">
        <div className="token-card-balance">
          <span className="token-count">{tokenBalance}</span>
          <span className="token-label">tokens available</span>
        </div>
        <p className="token-info">
          Each simulation run costs 1 token. Purchase packs of 10 tokens to fund
          your research.
        </p>
        <BuyTokensButton />
      </div>
    </div>
  );
}
