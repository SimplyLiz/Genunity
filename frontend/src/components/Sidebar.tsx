import { NavLink, useParams } from "react-router-dom";
import { useGeneStore } from "../store";

const NAV_ITEMS = [
  {
    path: "",
    label: "Dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="7" height="7" rx="1" />
        <rect x="11" y="2" width="7" height="7" rx="1" />
        <rect x="2" y="11" width="7" height="7" rx="1" />
        <rect x="11" y="11" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    path: "/petri",
    label: "Petri Dish",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="8" />
        <circle cx="7" cy="8" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="12" cy="11" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="10" cy="7" r="0.8" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    path: "/map",
    label: "Genome Map",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="7" />
        <circle cx="10" cy="10" r="3" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    path: "/research",
    label: "Research",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 2v6l-2 4h8l-2-4V2" />
        <path d="M5 12h10v2a4 4 0 01-4 4H9a4 4 0 01-4-4v-2z" />
        <line x1="6" y1="2" x2="14" y2="2" />
      </svg>
    ),
  },
  {
    path: "/simulation",
    label: "Simulation",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="2,16 6,10 10,13 14,5 18,8" />
        <line x1="2" y1="18" x2="18" y2="18" />
      </svg>
    ),
  },
  {
    path: "/cellforge",
    label: "CellForge 3D",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="10" cy="10" rx="8" ry="5" />
        <ellipse cx="10" cy="10" rx="8" ry="5" transform="rotate(60 10 10)" />
        <ellipse cx="10" cy="10" rx="8" ry="5" transform="rotate(120 10 10)" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

export function Sidebar() {
  const { genomeId } = useParams();
  const genomes = useGeneStore((s) => s.genomes);
  const activeGenomeId = useGeneStore((s) => s.activeGenomeId);

  const basePath = genomeId ? `/g/${genomeId}` : activeGenomeId ? `/g/${activeGenomeId}` : "";

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <NavLink to="/" className="sidebar-logo-link">
          <span className="logo-gene">G</span>
          <span className="logo-life">L</span>
        </NavLink>
      </div>

      <div className="sidebar-nav">
        {basePath &&
          NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={`${basePath}${item.path}`}
              end={item.path === ""}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "sidebar-item-active" : ""}`
              }
              title={item.label}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ))}
      </div>

      <div className="sidebar-footer">
        {genomes.length > 0 && (
          <NavLink to="/genomes" className="sidebar-item sidebar-genome-picker" title="Switch Genome">
            <span className="sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 7l7-5 7 5-7 5z" />
                <path d="M3 13l7 5 7-5" />
                <path d="M3 10l7 5 7-5" />
              </svg>
            </span>
            <span className="sidebar-label">Genomes</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
