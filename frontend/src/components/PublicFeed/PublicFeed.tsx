import { useEffect, useState } from 'react';
import { ResearchCard } from './ResearchCard';

interface ResearchItem {
  id: string;
  organism_name: string;
  config: Record<string, unknown> | null;
  result_summary: Record<string, unknown> | null;
  started_at: string | null;
  completed_at: string | null;
  researcher_name: string;
  researcher_avatar_url: string | null;
}

export function PublicFeed() {
  const [items, setItems] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/public/research?limit=20&offset=0')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Open Research Feed</h1>
      <p style={{ color: '#aaa', marginBottom: 32 }}>
        Crowdfunded whole-cell simulation results, open to everyone.
      </p>

      {loading ? (
        <div style={{ color: '#aaa', textAlign: 'center', padding: 40 }}>
          Loading research...
        </div>
      ) : items.length === 0 ? (
        <div style={{ color: '#aaa', textAlign: 'center', padding: 40 }}>
          No research published yet. Be the first to run a simulation!
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {items.map((item) => (
            <ResearchCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
