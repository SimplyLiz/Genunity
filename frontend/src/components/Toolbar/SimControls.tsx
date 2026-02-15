export function SimControls() {
  // TODO: play/pause/step/reset buttons, speed slider, time display
  return (
    <div style={{ border: '1px solid #333', padding: 8, borderRadius: 4 }}>
      <h4>Simulation</h4>
      <div style={{ display: 'flex', gap: 4 }}>
        <button>Play</button>
        <button>Pause</button>
        <button>Step</button>
        <button>Reset</button>
      </div>
    </div>
  );
}
