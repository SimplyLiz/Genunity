import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useAuthStore } from "../../stores/authStore";
import { hasClerk } from "../../hooks/useClerk";

function ClerkTokenBalance() {
  const { getToken } = useAuth();
  const { tokenBalance, loading, fetchBalance } = useAuthStore();

  useEffect(() => {
    fetchBalance(getToken);
  }, [getToken, fetchBalance]);

  return (
    <span className="token-balance" title="Research tokens">
      {loading ? "..." : tokenBalance} tokens
    </span>
  );
}

export function TokenBalance() {
  if (!hasClerk) return null;
  return <ClerkTokenBalance />;
}
