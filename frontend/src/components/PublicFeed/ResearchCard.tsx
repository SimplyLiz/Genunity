import { Link } from "react-router-dom";

export interface PublicResearchItem {
  id: string;
  organism_name: string;
  config: Record<string, unknown> | null;
  result_summary: Record<string, unknown> | null;
  started_at: string | null;
  completed_at: string | null;
  researcher_name: string;
  researcher_avatar_url: string | null;
}

export function ResearchCard({ item }: { item: PublicResearchItem }) {
  const growthRate =
    item.result_summary && typeof item.result_summary === "object"
      ? (item.result_summary as Record<string, unknown>).growth_rate
      : null;

  return (
    <Link to={`/research/${item.id}`} className="research-card">
      <div className="research-card-header">
        <div className="research-card-organism">{item.organism_name}</div>
        {growthRate != null && (
          <div className="research-card-growth">
            {Number(growthRate).toFixed(3)} h<sup>-1</sup>
          </div>
        )}
      </div>
      <div className="research-card-meta">
        <div className="research-card-researcher">
          {item.researcher_avatar_url && (
            <img
              src={item.researcher_avatar_url}
              alt=""
              className="researcher-avatar"
            />
          )}
          <span>{item.researcher_name}</span>
        </div>
        {item.completed_at && (
          <time className="research-card-date">
            {new Date(item.completed_at).toLocaleDateString()}
          </time>
        )}
      </div>
    </Link>
  );
}
