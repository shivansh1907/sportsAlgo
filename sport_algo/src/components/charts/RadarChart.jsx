/**
 * RadarChart — FIFA-style hexagon radar for 6 player attributes
 *
 * Usage:
 *   <RadarChart attributes={player.attributes} />
 *   <RadarChart attributes={player.attributes} benchmark={leagueAvg} />  ← Pro mode
 *
 * Data shape:
 *   attributes = { pace: 92, shooting: 85, passing: 88, dribbling: 90, defending: 45, workRate: 78 }
 *   benchmark  = same shape (optional — league average overlay, dashed line)
 */

const LABELS = [
  { key: 'pace',      label: 'PAC' },
  { key: 'shooting',  label: 'SHO' },
  { key: 'passing',   label: 'PAS' },
  { key: 'dribbling', label: 'DRI' },
  { key: 'defending', label: 'DEF' },
  { key: 'workRate',  label: 'PHY' },
];

export default function RadarChart({
  attributes = {},
  benchmark = null,
  size = 200,
  accentColor = '#CCF930',
}) {
  const cx = size / 2;            // center x
  const cy = size / 2;            // center y
  const maxR = size * 0.35;       // max radius (leave room for labels outside)
  const sides = LABELS.length;    // 6

  // ── Helper: get x,y for a vertex at given index and value (0–100) ──
  function getPoint(index, value) {
    const angle = (Math.PI * 2 * index) / sides - Math.PI / 2; // start from top
    const r = (value / 100) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  }

  // ── Helper: build "x1,y1 x2,y2 ..." polygon string from attribute values ──
  function buildPolygon(attrs) {
    return LABELS.map((label, i) => {
      const p = getPoint(i, attrs[label.key] || 0);
      return `${p.x},${p.y}`;
    }).join(' ');
  }

  // ── Grid rings at 25%, 50%, 75%, 100% ──
  const rings = [25, 50, 75, 100];

  // ── Label positions (pushed slightly outside the outermost ring) ──
  const labelPositions = LABELS.map((label, i) => ({
    ...label,
    ...getPoint(i, 120),  // 120% = outside the chart
    value: attributes[label.key] || 0,
  }));

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>

        {/* ── Grid rings (hexagon outlines at 25/50/75/100%) ── */}
        {rings.map((pct) => (
          <polygon
            key={`ring-${pct}`}
            points={Array.from({ length: sides }, (_, i) => {
              const p = getPoint(i, pct);
              return `${p.x},${p.y}`;
            }).join(' ')}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={pct === 100 ? 0.8 : 0.4}
          />
        ))}

        {/* ── Grid lines from center to each vertex ── */}
        {Array.from({ length: sides }, (_, i) => {
          const p = getPoint(i, 100);
          return (
            <line
              key={`spoke-${i}`}
              x1={cx} y1={cy}
              x2={p.x} y2={p.y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={0.5}
            />
          );
        })}

        {/* ── Benchmark polygon (Pro mode — league average, dashed) ── */}
        {benchmark && (
          <polygon
            points={buildPolygon(benchmark)}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1}
            strokeDasharray="4 3"
          />
        )}

        {/* ── Player stats polygon (the filled green shape) ── */}
        <polygon
          points={buildPolygon(attributes)}
          fill={accentColor}
          fillOpacity={0.15}
          stroke={accentColor}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* ── Dots at each vertex of the player polygon ── */}
        {LABELS.map((label, i) => {
          const p = getPoint(i, attributes[label.key] || 0);
          return (
            <circle
              key={`dot-${i}`}
              cx={p.x} cy={p.y} r={2.5}
              fill={accentColor}
            />
          );
        })}

        {/* ── Labels + values outside the chart ── */}
        {labelPositions.map((label) => (
          <g key={label.key}>
            {/* Attribute abbreviation (PAC, SHO, etc.) */}
            <text
              x={label.x}
              y={label.y - 5}
              textAnchor="middle"
              dominantBaseline="central"
              fill="rgba(255,255,255,0.6)"
              fontSize={size * 0.055}
              fontWeight="600"
            >
              {label.label}
            </text>

            {/* Numeric value */}
            <text
              x={label.x}
              y={label.y + 7}
              textAnchor="middle"
              dominantBaseline="central"
              fill={accentColor}
              fontSize={size * 0.05}
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
            >
              {label.value}
            </text>
          </g>
        ))}

      </svg>
    </div>
  );
}