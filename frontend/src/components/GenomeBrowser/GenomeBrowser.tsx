import { GeneDetail } from './GeneDetail';

export function GenomeBrowser() {
  // TODO: linear genome browser with gene tracks
  return (
    <div style={{ border: '1px solid #333', padding: 8, borderRadius: 4 }}>
      <h4>Genome Browser</h4>
      <p style={{ color: '#888' }}>Genome visualization placeholder</p>
      <GeneDetail />
    </div>
  );
}
