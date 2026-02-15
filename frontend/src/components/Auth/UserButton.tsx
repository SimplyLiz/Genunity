import { UserButton as ClerkUserButton } from '@clerk/clerk-react';

export function UserButtonWrapper() {
  return <ClerkUserButton afterSignOutUrl="/" />;
}
