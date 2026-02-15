import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { TokenBalance } from '../Tokens/TokenBalance';

export function NavBar() {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: 56,
        background: '#1a1a2e',
        borderBottom: '1px solid #333',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link to="/" style={{ fontSize: 18, fontWeight: 700, color: '#7c3aed' }}>
          CellForge
        </Link>
        <Link to="/" style={{ color: '#aaa', fontSize: 14 }}>
          Research
        </Link>
        <SignedIn>
          <Link to="/simulator" style={{ color: '#aaa', fontSize: 14 }}>
            Simulator
          </Link>
          <Link to="/tokens" style={{ color: '#aaa', fontSize: 14 }}>
            Tokens
          </Link>
        </SignedIn>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <SignedIn>
          <TokenBalance />
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button
              style={{
                background: '#7c3aed',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
