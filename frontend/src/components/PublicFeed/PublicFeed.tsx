import { useEffect, useState } from "react";
import { ResearchCard, type PublicResearchItem } from "./ResearchCard";

export function PublicFeed() {
  const [items, setItems] = useState<PublicResearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/public/research?limit=20")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="public-feed">
      <div className="public-feed-header">
        <h1>Open Research</h1>
        <p>Crowdfunded whole-cell simulations — all results are public.</p>
      </div>

      {loading ? (
        <div className="public-feed-loading">Loading research...</div>
      ) : items.length === 0 ? (
        <div className="public-feed-empty">
          No completed research yet. Be the first to run a simulation!
        </div>
      ) : (
        <div className="research-grid">
          {items.map((item) => (
            <ResearchCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
