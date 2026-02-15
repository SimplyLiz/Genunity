import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

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

export function ResearchDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ResearchItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/v1/public/research/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => setItem(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 60, color: '#aaa' }}>Loading...</div>
    );
  }

  if (error || !item) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <p style={{ color: '#f87171' }}>{error || 'Research not found'}</p>
        <Link to="/" style={{ color: '#7c3aed' }}>Back to feed</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
      <Link to="/" style={{ color: '#7c3aed', fontSize: 14, marginBottom: 20, display: 'block' }}>
        &larr; Back to feed
      </Link>

      <h1 style={{ fontSize: 28, marginBottom: 8 }}>{item.organism_name}</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
        {item.researcher_avatar_url && (
          <img
            src={item.researcher_avatar_url}
            alt=""
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          />
        )}
        <span style={{ color: '#aaa' }}>by {item.researcher_name}</span>
        {item.completed_at && (
          <span style={{ color: '#666', marginLeft: 'auto' }}>
            Completed {new Date(item.completed_at).toLocaleString()}
          </span>
        )}
      </div>

      {item.config && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, marginBottom: 12, color: '#c4b5fd' }}>Configuration</h2>
          <pre
            style={{
              background: '#1a1a2e',
              padding: 16,
              borderRadius: 8,
              overflow: 'auto',
              fontSize: 13,
            }}
          >
            {JSON.stringify(item.config, null, 2)}
          </pre>
        </section>
      )}

      {item.result_summary && (
        <section>
          <h2 style={{ fontSize: 18, marginBottom: 12, color: '#6ee7b7' }}>Results</h2>
          <pre
            style={{
              background: '#1a1a2e',
              padding: 16,
              borderRadius: 8,
              overflow: 'auto',
              fontSize: 13,
            }}
          >
            {JSON.stringify(item.result_summary, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}
