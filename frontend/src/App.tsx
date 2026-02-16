import { Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { CommandPalette } from "./components/CommandPalette";
import { PipelineStatus } from "./components/PipelineStatus";
import { NavBar } from "./components/NavBar/NavBar";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { PublicFeed } from "./components/PublicFeed/PublicFeed";
import { ResearchDetail } from "./components/PublicFeed/ResearchDetail";
import { TokensPage } from "./components/Tokens/TokensPage";
import { GenomeSelectorPage } from "./pages/GenomeSelectorPage";
import { DashboardPage } from "./pages/DashboardPage";
import { PetriDishPage } from "./pages/PetriDishPage";
import { GenomeMapPage } from "./pages/GenomeMapPage";
import { ResearchPage } from "./pages/ResearchPage";
import { SimulationPage } from "./pages/SimulationPage";
import { GeneAnalysisPage } from "./pages/GeneAnalysisPage";
import { CellForgePage } from "./pages/CellForgePage";
import { hasClerk } from "./hooks/useClerk";

function RedirectToLastGenome() {
  const lastId = localStorage.getItem("biolab_last_genome");
  if (lastId) {
    return <Navigate to={`/g/${lastId}`} replace />;
  }
  return <Navigate to="/genomes" replace />;
}

function SignInPage() {
  if (!hasClerk) return <Navigate to="/" replace />;
  const { SignIn } = require("@clerk/clerk-react");
  return (
    <div className="auth-page">
      <SignIn routing="path" path="/sign-in" />
    </div>
  );
}

function SignUpPage() {
  if (!hasClerk) return <Navigate to="/" replace />;
  const { SignUp } = require("@clerk/clerk-react");
  return (
    <div className="auth-page">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}

export function App() {
  return (
    <>
      <CommandPalette />
      <PipelineStatus />
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicFeed />} />
        <Route path="/research/:id" element={<ResearchDetail />} />

        {/* Auth routes */}
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />

        {/* Protected: tokens */}
        <Route
          path="/tokens"
          element={
            <ProtectedRoute>
              <TokensPage />
            </ProtectedRoute>
          }
        />

        {/* Protected: simulator (genome-based routes) */}
        <Route
          path="/genomes"
          element={
            <ProtectedRoute>
              <GenomeSelectorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/simulator"
          element={
            <ProtectedRoute>
              <RedirectToLastGenome />
            </ProtectedRoute>
          }
        />
        <Route element={<AppShell />}>
          <Route path="/g/:genomeId" element={<DashboardPage />} />
          <Route path="/g/:genomeId/petri" element={<PetriDishPage />} />
          <Route path="/g/:genomeId/map" element={<GenomeMapPage />} />
          <Route path="/g/:genomeId/research" element={<ResearchPage />} />
          <Route path="/g/:genomeId/simulation" element={<SimulationPage />} />
          <Route path="/g/:genomeId/cellforge" element={<CellForgePage />} />
        </Route>
        <Route path="/gene/:symbol" element={<GeneAnalysisPage />} />
      </Routes>
    </>
  );
}
