import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { PublicResearchItem } from "./ResearchCard";

export function ResearchDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<PublicResearchItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/v1/public/research/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setItem(data))
      .catch(() => setError("Research not found"));
  }, [id]);

  if (error) {
    return (
      <div className="research-detail-error">
        <p>{error}</p>
        <Link to="/">Back to feed</Link>
      </div>
    );
  }

  if (!item) {
    return <div className="research-detail-loading">Loading...</div>;
  }

  return (
    <div className="research-detail">
      <Link to="/" className="research-detail-back">
        Back to feed
      </Link>

      <h1>{item.organism_name}</h1>

      <div className="research-detail-meta">
        <div className="research-detail-researcher">
          {item.researcher_avatar_url && (
            <img src={item.researcher_avatar_url} alt="" className="researcher-avatar" />
          )}
          <span>{item.researcher_name}</span>
        </div>
        {item.completed_at && (
          <time>{new Date(item.completed_at).toLocaleString()}</time>
        )}
      </div>

      {item.config && (
        <section className="research-detail-section">
          <h2>Configuration</h2>
          <pre className="research-detail-json">
            {JSON.stringify(item.config, null, 2)}
          </pre>
        </section>
      )}

      {item.result_summary && (
        <section className="research-detail-section">
          <h2>Results</h2>
          <pre className="research-detail-json">
            {JSON.stringify(item.result_summary, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}
