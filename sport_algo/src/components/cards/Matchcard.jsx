/**
 * MatchCard — Score card showing match result
 *
 * Two variants:
 *   'header'  → big score display (Match Center top)
 *   'compact' → small card with stats (Home screen "Last Match")
 *
 * Usage:
 *   <MatchCard match={data.matches[0]} />
 *   <MatchCard match={data.matches[0]} variant="header" />
 */

export default function MatchCard({
  match = {},
  variant = 'compact',   // 'header' | 'compact'
  onClick = () => {},
}) {
  const {
    homeTeam = 'Home',
    awayTeam = 'Away',
    homeScore = 0,
    awayScore = 0,
    date = '',
    venue = '',
    league = '',
    duration = 90,
    isLive = false,
    playerStats = {},
  } = match;

  // Short team names (e.g., "Delhi FC" → "DFC")
  const shortName = (name) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase();

  const won = homeScore > awayScore;

  // ── Header variant (Match Center top) ──
  if (variant === 'header') {
    return (
      <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-4">

        {/* Live badge or league */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest font-medium">
            {league}
          </span>
          {isLive ? (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] text-red-400 font-bold uppercase">
                Live {duration}'
              </span>
            </span>
          ) : (
            <span className="text-[10px] text-[var(--text-secondary)]">{date}</span>
          )}
        </div>

        {/* Score row */}
        <div className="flex items-center justify-between">

          {/* Home team */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <span className="text-2xl font-black text-[#CCF930] font-mono">
              {shortName(homeTeam)}
            </span>
            <span className="text-[9px] text-[var(--text-secondary)] uppercase tracking-wider">
              {homeTeam}
            </span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-3 px-4">
            <span className="text-3xl font-black text-[var(--text-primary)] font-mono">
              {homeScore}
            </span>
            <span className="text-lg text-[var(--text-secondary)]">:</span>
            <span className="text-3xl font-black text-[var(--text-primary)] font-mono">
              {awayScore}
            </span>
          </div>

          {/* Away team */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <span className="text-2xl font-black text-[var(--text-secondary)] font-mono">
              {shortName(awayTeam)}
            </span>
            <span className="text-[9px] text-[var(--text-secondary)] uppercase tracking-wider">
              {awayTeam}
            </span>
          </div>
        </div>

        {/* Venue */}
        {venue && (
          <p className="text-[10px] text-[var(--text-secondary)] text-center mt-3 pt-3 border-t border-[var(--border)]">
            {venue}
          </p>
        )}
      </div>
    );
  }

  // ── Compact variant (Home screen "Last Match") ──
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] p-4 text-left hover:border-[#CCF930]/30 transition-colors group"
    >
      {/* Top label */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest font-medium">
          Last Match
        </span>
        {won && (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#CCF930] text-[#0A0A0A]">
            W
          </span>
        )}
      </div>

      {/* Match title + score */}
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
        {homeTeam} vs {awayTeam}
      </h3>
      <span className="text-2xl font-black text-[#CCF930] font-mono">
        {homeScore}-{awayScore}
      </span>

      {/* Player stats from this match */}
      {playerStats && (
        <div className="flex flex-col gap-1.5 mt-3 pt-3 border-t border-[var(--border)]">
          {playerStats.goals !== undefined && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCF930]" />
                Goals
              </span>
              <span className="text-xs font-bold font-mono text-[var(--text-primary)]">
                {playerStats.goals}
              </span>
            </div>
          )}

          {playerStats.distance !== undefined && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                Distance
              </span>
              <span className="text-xs font-bold font-mono text-[var(--text-primary)]">
                {playerStats.distance} <span className="text-[10px] font-normal text-[var(--text-secondary)]">km</span>
              </span>
            </div>
          )}

          {playerStats.avgSpeed !== undefined && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                Avg Speed
              </span>
              <span className="text-xs font-bold font-mono text-[var(--text-primary)]">
                {playerStats.avgSpeed} <span className="text-[10px] font-normal text-[var(--text-secondary)]">km/h</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Tap hint */}
      <div className="flex items-center justify-end mt-3 text-[var(--text-secondary)] group-hover:text-[#CCF930] transition-colors">
        <span className="text-[10px] mr-1">View details</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </button>
  );
}