import { Link } from 'react-router-dom';

interface ResearchItem {
  id: string;
  organism_name: string;
  result_summary: Record<string, unknown> | null;
  completed_at: string | null;
  researcher_name: string;
  researcher_avatar_url: string | null;
}

export function ResearchCard({ item }: { item: ResearchItem }) {
  const growthRate =
    item.result_summary && typeof item.result_summary.growth_rate === 'number'
      ? item.result_summary.growth_rate.toFixed(4)
      : null;

  return (
    <Link
      to={`/research/${item.id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        background: '#1a1a2e',
        borderRadius: 12,
        padding: 20,
        display: 'block',
        border: '1px solid #333',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#7c3aed')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#333')}
    >
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        {item.organism_name}
      </div>

      {growthRate && (
        <div style={{ color: '#6ee7b7', fontSize: 14, marginBottom: 12 }}>
          Growth rate: {growthRate} h⁻¹
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
        {item.researcher_avatar_url && (
          <img
            src={item.researcher_avatar_url}
            alt=""
            style={{ width: 24, height: 24, borderRadius: '50%' }}
          />
        )}
        <span style={{ color: '#aaa', fontSize: 13 }}>{item.researcher_name}</span>
        {item.completed_at && (
          <span style={{ color: '#666', fontSize: 12, marginLeft: 'auto' }}>
            {new Date(item.completed_at).toLocaleDateString()}
          </span>
        )}
      </div>
    </Link>
  );
}
