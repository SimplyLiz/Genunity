import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { TokenBalance } from "../Tokens/TokenBalance";
import { hasClerk } from "../../hooks/useClerk";

export function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Genunity
        </Link>
        <nav className="navbar-links">
          <Link to="/">Research</Link>
          {hasClerk ? (
            <SignedIn>
              <Link to="/genomes">Simulator</Link>
              <Link to="/tokens">Tokens</Link>
            </SignedIn>
          ) : (
            <Link to="/genomes">Simulator</Link>
          )}
        </nav>
      </div>

      <div className="navbar-right">
        {hasClerk && (
          <>
            <SignedIn>
              <TokenBalance />
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="navbar-signin-btn">Sign In</button>
              </SignInButton>
            </SignedOut>
          </>
        )}
      </div>
    </header>
  );
}
