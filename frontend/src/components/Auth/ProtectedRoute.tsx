import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import { hasClerk } from "../../hooks/useClerk";

function ClerkGuard({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div className="auth-loading">Loading...</div>;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!hasClerk) {
    // No Clerk configured — allow access (dev mode)
    return <>{children}</>;
  }

  return <ClerkGuard>{children}</ClerkGuard>;
}
