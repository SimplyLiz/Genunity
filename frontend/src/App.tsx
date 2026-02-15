import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { Toolbar } from './components/Toolbar/Toolbar';
import { PetriDish } from './components/PetriDish/PetriDish';
import { Dashboard } from './components/Dashboard/Dashboard';
import { GenomeBrowser } from './components/GenomeBrowser/GenomeBrowser';
import { NavBar } from './components/NavBar/NavBar';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { PublicFeed } from './components/PublicFeed/PublicFeed';
import { ResearchDetail } from './components/PublicFeed/ResearchDetail';
import { TokensPage } from './components/Tokens/TokensPage';
import './App.css';

function SimulatorView() {
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 56px)', background: '#111', color: '#eee' }}>
      {/* Left panel: controls */}
      <div style={{ width: 280, borderRight: '1px solid #333', overflow: 'auto' }}>
        <Toolbar />
      </div>

      {/* Center: 3D viewport */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <PetriDish />
        </div>
        {/* Footer: genome browser */}
        <div style={{ height: 180, borderTop: '1px solid #333', overflow: 'auto' }}>
          <GenomeBrowser />
        </div>
      </div>

      {/* Right panel: dashboard */}
      <div style={{ width: 360, borderLeft: '1px solid #333', overflow: 'auto' }}>
        <Dashboard />
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#111', color: '#eee' }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<PublicFeed />} />
        <Route path="/research/:id" element={<ResearchDetail />} />
        <Route
          path="/sign-in/*"
          element={
            <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
              <SignIn routing="path" path="/sign-in" />
            </div>
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
              <SignUp routing="path" path="/sign-up" />
            </div>
          }
        />
        <Route
          path="/simulator"
          element={
            <ProtectedRoute>
              <SimulatorView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tokens"
          element={
            <ProtectedRoute>
              <TokensPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
