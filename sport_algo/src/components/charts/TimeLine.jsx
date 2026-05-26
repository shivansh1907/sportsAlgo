/**
 * MatchMomentum — Bar chart showing team dominance per 15-min window
 *
 * Usage:
 *   <MatchMomentum data={matchTimeline.momentum} />
 *
 * Data shape (from your mockData):
 *   momentum = [
 *     { minute: 0,  value: 0 },
 *     { minute: 5,  value: 15 },    ← positive = your team in control
 *     { minute: 38, value: -20 },   ← negative = opponent in control
 *     ...
 *   ]
 */

export default function MatchMomentum({ data = [] }) {
  // ── Step 1: Group raw data into 15-min windows ──
  // Your mockData has per-minute values. We need to average them
  // into 15-minute buckets: [0-15], [15-30], [30-45], [45-60], [60-75], [75-90]

  const windows = [0, 15, 30, 45, 60, 75].map((start) => {
    const end = start + 15;
    const windowData = data.filter((d) => d.minute >= start && d.minute < end);

    // Average the momentum values in this window
    const avg =
      windowData.length > 0
        ? windowData.reduce((sum, d) => sum + d.value, 0) / windowData.length
        : 0;

    return {
      label: `${start}'`,
      value: avg,
    };
  });

  // ── Step 2: Calculate overall dominance % ──
  const positiveCount = data.filter((d) => d.value > 0).length;
  const dominance = data.length > 0
    ? Math.round((positiveCount / data.length) * 100)
    : 50;

  // ── Step 3: Find max absolute value for scaling bar heights ──
  const maxVal = Math.max(...windows.map((w) => Math.abs(w.value)), 1);

  return (
    <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--border)]">

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] uppercase tracking-widest text-[var(--text-secondary)] font-medium">
          Match Momentum
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-bold text-[#CCF930] font-mono">
            {dominance}%
          </span>
          <span className="text-[10px] text-[var(--text-secondary)] uppercase">
            DFC Dom.
          </span>
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-2 h-28">
        {windows.map((window, i) => {
          const isPositive = window.value >= 0;
          const heightPct = (Math.abs(window.value) / maxVal) * 100;

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              {/* The bar */}
              <div className="w-full relative" style={{ height: '100px' }}>
                <div
                  className={`
                    absolute bottom-0 w-full rounded-sm transition-all duration-500
                    ${isPositive
                      ? 'bg-[#CCF930]'      /* green = your team */
                      : 'bg-[#6B7280]'      /* gray = opponent */
                    }
                  `}
                  style={{
                    height: `${Math.max(heightPct, 8)}%`,  // min 8% so empty bars are visible
                    opacity: isPositive
                      ? 0.5 + (heightPct / 100) * 0.5    // higher bar = more opaque
                      : 0.35,
                  }}
                />
              </div>

              {/* Time label */}
              <span className="text-[10px] text-[var(--text-secondary)]">
                {window.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}