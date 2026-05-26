/**
 * ShotMap — Half-pitch view showing shot locations
 * 
 * Renders INSIDE <PitchSVG half="right"> as children
 * Circle size = xG (shot quality)
 * Circle color = outcome (scored / saved / missed)
 * 
 * Usage:
 *   <PitchSVG half="right">
 *     <ShotMap shots={events.filter(e => e.type === 'shot' || e.type === 'goal')} />
 *   </PitchSVG>
 * 
 * Data shape:
 *   shots = [{ x, y, xG, outcome: 'scored'|'saved'|'missed' }, ...]
 *   x/y in pitch meters (0-105 / 0-68)
 */

export default function ShotMap({
  shots = [],
  showXG = false,     // Pro mode shows xG values
  accentColor = '#CCF930',
}) {
  const colors = {
    scored: accentColor,
    saved: '#F59E0B',
    missed: '#6B7280',
  };

  const opacities = {
    scored: 0.9,
    saved: 0.6,
    missed: 0.45,
  };

  return (
    <g>
      {shots.map((shot, i) => {
        const radius = 1.5 + (shot.xG || 0.2) * 5; // min 1.5m, max ~4m radius
        const color = colors[shot.outcome] || colors.missed;
        const opacity = opacities[shot.outcome] || 0.5;

        return (
          <g key={`shot-${i}`}>
            {/* Shot circle */}
            <circle
              cx={shot.x}
              cy={shot.y}
              r={radius}
              fill={color}
              opacity={opacity}
              stroke={shot.outcome === 'scored' ? color : 'none'}
              strokeWidth={shot.outcome === 'scored' ? 0.3 : 0}
            />

            {/* Glow effect for goals */}
            {shot.outcome === 'scored' && (
              <circle
                cx={shot.x}
                cy={shot.y}
                r={radius + 1.5}
                fill="none"
                stroke={accentColor}
                strokeWidth={0.2}
                opacity={0.3}
              />
            )}

            {/* xG label (Pro mode only) */}
            {showXG && shot.xG && (
              <text
                x={shot.x}
                y={shot.y + radius + 2.5}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize={2}
                fontWeight="500"
              >
                xG {shot.xG.toFixed(2)}
              </text>
            )}
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(90, 3)">
        <circle cx={0} cy={0} r={1} fill={accentColor} opacity={0.9} />
        <text x={2} y={0.5} fill="rgba(255,255,255,0.6)" fontSize={2}>Goal</text>

        <circle cx={0} cy={4} r={1} fill="#F59E0B" opacity={0.6} />
        <text x={2} y={4.5} fill="rgba(255,255,255,0.6)" fontSize={2}>Saved</text>

        <circle cx={0} cy={8} r={1} fill="#6B7280" opacity={0.45} />
        <text x={2} y={8.5} fill="rgba(255,255,255,0.6)" fontSize={2}>Missed</text>

        <text x={0} y={12.5} fill="rgba(255,255,255,0.4)" fontSize={1.8}>Size = xG</text>
      </g>
    </g>
  );
}
