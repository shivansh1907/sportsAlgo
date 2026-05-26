/**
 * ClipCard — Video highlight card with thumbnail, play button, xG badge
 *
 * Used in:
 *   - Clips Feed (vertical scroll, full width)
 *   - Home screen (horizontal carousel, smaller)
 *   - ScoutView (top 3 highlights row)
 *
 * Usage:
 *   <ClipCard clip={clip} />
 *   <ClipCard clip={clip} showXG />           ← Pro mode
 *   <ClipCard clip={clip} variant="compact" /> ← for carousel/row
 */

export default function ClipCard({
  clip = {},
  showXG = false,
  variant = 'full',    // 'full' = clips feed | 'compact' = carousel/row
  onPlay = () => {},
  onShare = () => {},
}) {
  const {
    title = 'Highlight',
    match = '',
    date = '',
    league = '',
    type = 'goal',       // goal | assist | save | key_pass
    minute = 0,
    xG = null,
    duration = 0,
    thumbnail = null,
  } = clip;

  // Event type config (color + label)
  const typeConfig = {
    goal:     { label: 'GOAL',     bg: 'bg-[#CCF930]', text: 'text-[#0A0A0A]' },
    assist:   { label: 'ASSIST',   bg: 'bg-[#3B82F6]', text: 'text-white' },
    save:     { label: 'SAVE',     bg: 'bg-[#10B981]', text: 'text-white' },
    key_pass: { label: 'KEY PASS', bg: 'bg-[#F59E0B]', text: 'text-[#0A0A0A]' },
  };

  const badge = typeConfig[type] || typeConfig.goal;

  // ── Compact variant (for Home screen carousel) ──
  if (variant === 'compact') {
    return (
      <button
        onClick={onPlay}
        className="flex-shrink-0 w-36 rounded-xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] group"
      >
        {/* Thumbnail */}
        <div className="relative h-24 bg-gradient-to-br from-[#1a2e1a] to-[#0A0A0A]">
          {thumbnail && (
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          )}

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-[#CCF930] flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#0A0A0A">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </div>
          </div>

          {/* Type badge */}
          <span className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold ${badge.bg} ${badge.text}`}>
            {badge.label}
          </span>
        </div>

        {/* Title */}
        <div className="p-2">
          <p className="text-[11px] text-[var(--text-primary)] font-medium truncate">{title}</p>
          <p className="text-[9px] text-[var(--text-secondary)] mt-0.5 truncate">{match}</p>
        </div>
      </button>
    );
  }

  // ── Full variant (for Clips Feed screen) ──
  return (
    <div className="rounded-xl overflow-hidden bg-[var(--surface)] border border-[var(--border)]">

      {/* ── Thumbnail area ── */}
      <button
        onClick={onPlay}
        className="relative w-full aspect-video bg-gradient-to-br from-[#1a2e1a] to-[#0A0A0A] group"
      >
        {/* Video thumbnail image */}
        {thumbnail && (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        )}

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

        {/* Play button (center) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#CCF930] flex items-center justify-center shadow-lg shadow-[#CCF930]/20 group-hover:scale-110 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A0A0A">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </div>
        </div>

        {/* xG badge — top left (Pro mode only) */}
        {showXG && xG !== null && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
            <span className="text-[10px] text-[var(--text-secondary)] font-medium">xG</span>
            <span className="text-xs text-[#CCF930] font-bold font-mono">{xG.toFixed(2)}</span>
          </div>
        )}

        {/* Duration badge — top right */}
        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm rounded-md px-2 py-1">
          <span className="text-[10px] text-white font-medium font-mono">{minute}'</span>
        </div>

        {/* Event type badge — bottom left */}
        <span className={`absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </button>

      {/* ── Info area ── */}
      <div className="p-3">
        {/* Title */}
        <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wide">
          {title}
        </h3>

        {/* Match info + date */}
        <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
          {league && <span>{league} • </span>}
          {date}
        </p>

        {/* Action buttons row */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[var(--border)]">

          {/* Share */}
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[#CCF930] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <span className="text-[11px] font-medium">Share</span>
          </button>

          {/* Save / Bookmark */}
          <button className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[#CCF930] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
            <span className="text-[11px] font-medium">Save</span>
          </button>

          {/* Copy link */}
          <button className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[#CCF930] transition-colors ml-auto">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            <span className="text-[11px] font-medium">Copy</span>
          </button>
        </div>
      </div>
    </div>
  );
}