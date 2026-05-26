/**
 * PlayerCard — FIFA-style shareable card with photo, rating, stats, radar
 *
 * This is the centrepiece of the Home screen.
 * Tap to expand, long-press to share (you'll wire these up later).
 *
 * Usage:
 *   <PlayerCard player={data.player} />
 *   <PlayerCard player={data.player} showBenchmark />  ← Pro mode
 */

import RadarChart from '../charts/RadarChart';

export default function PlayerCard({
  player = {},
  showBenchmark = false,   // Pro mode: show league avg on radar
  compact = false,          // true = smaller version for ScoutView
}) {
  const {
    name = 'Player',
    position = 'Midfielder',
    team = 'Team',
    overallRating = 0,
    attributes = {},
    leagueAverageBenchmark = null,
  } = player;

  // Stat grid — the 6 FIFA attributes
  const stats = [
    { key: 'pace',      label: 'PAC' },
    { key: 'shooting',  label: 'SHO' },
    { key: 'passing',   label: 'PAS' },
    { key: 'dribbling', label: 'DRI' },
    { key: 'defending', label: 'DEF' },
    { key: 'workRate',  label: 'PHY' },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)]">

      {/* ── Background glow effect (the green ambient light) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#CCF930] rounded-full opacity-[0.06] blur-3xl" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 p-4">

        {/* ── Top section: Player image + Rating badge ── */}
        <div className="relative mb-3">

          {/* Player image area */}
          <div
            className={`
              relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#1a2e1a] to-[var(--surface)]
              flex items-center justify-center
              ${compact ? 'h-40' : 'h-56'}
            `}
          >
            {/* Placeholder — replace with actual <img> when you have photos */}
            <div className="text-6xl opacity-20">⚽</div>

            {/* If you have an image:
            <img
              src={player.avatar}
              alt={name}
              className="w-full h-full object-cover object-top"
            />
            */}

            {/* Rating badge — top left on the image */}
            <div className="absolute top-3 left-3 flex flex-col items-center">
              <span className="text-3xl font-black text-[#CCF930] leading-none font-mono drop-shadow-lg">
                {overallRating}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#CCF930]/70 font-semibold">
                OVR
              </span>
            </div>
          </div>
        </div>

        {/* ── Player info ── */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wide">
            {name}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest mt-0.5">
            {position} • {team}
          </p>
        </div>

        {/* ── 6-stat grid (PAC, SHO, PAS / DRI, DEF, PHY) ── */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {stats.map(({ key, label }) => (
            <div
              key={key}
              className="flex flex-col items-center py-2 rounded-lg bg-[var(--bg)]/50 border border-[var(--border)]"
            >
              <span className="text-lg font-bold font-mono text-[var(--text-primary)] leading-none">
                {attributes[key] || 0}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[var(--text-secondary)] mt-1 font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Radar chart section ── */}
        <div className="border-t border-[var(--border)] pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-medium">
              Radar Profile
            </span>

            {/* Share icon — wire up later */}
            <button className="text-[var(--text-secondary)] hover:text-[#CCF930] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
          </div>

          <RadarChart
            attributes={attributes}
            benchmark={showBenchmark ? leagueAverageBenchmark : null}
            size={compact ? 180 : 220}
          />

          {/* Benchmark legend (Pro mode only) */}
          {showBenchmark && leagueAverageBenchmark && (
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 bg-[#CCF930] rounded" />
                <span className="text-[10px] text-[var(--text-secondary)]">You</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0.5 border-t border-dashed border-white/25" />
                <span className="text-[10px] text-[var(--text-secondary)]">League Avg</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}