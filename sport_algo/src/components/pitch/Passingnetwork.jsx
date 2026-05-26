/**
 * PassingNetwork — SVG overlay showing player positions and pass connections
 * 
 * Renders INSIDE <PitchSVG> as children (same coordinate system: 105x68 meters)
 * Node size = player involvement (total passes)
 * Edge thickness = pass frequency between two players
 * 
 * Usage:
 *   <PitchSVG>
 *     <PassingNetwork players={data.players} links={data.links} />
 *   </PitchSVG>
 * 
 * Data shapes:
 *   players = [{ id, name, position, avgX, avgY, involvement }, ...]
 *   links = [{ source: "p001", target: "p009", passes: 18 }, ...]
 */

export default function PassingNetwork({
  players = [],
  links = [],
  accentColor = '#CCF930',
  showLabels = true,
  isPro = false,
}) {
  // Max values for scaling
  const maxPasses = Math.max(...links.map(l => l.passes), 1);
  const maxInvolvement = Math.max(...players.map(p => p.involvement), 1);

  // Build a lookup map for player positions
  const playerMap = {};
  players.forEach(p => { playerMap[p.id] = p; });

  return (
    <g>
      {/* Pass lines (render first so they appear behind nodes) */}
      {links.map((link, i) => {
        const source = playerMap[link.source];
        const target = playerMap[link.target];
        if (!source || !target) return null;

        const thickness = 0.3 + (link.passes / maxPasses) * 2;
        const opacity = 0.15 + (link.passes / maxPasses) * 0.5;

        return (
          <line
            key={`link-${i}`}
            x1={source.avgX}
            y1={source.avgY}
            x2={target.avgX}
            y2={target.avgY}
            stroke={accentColor}
            strokeWidth={thickness}
            opacity={opacity}
            strokeLinecap="round"
          />
        );
      })}

      {/* Player nodes */}
      {players.map(player => {
        const radius = 2 + (player.involvement / maxInvolvement) * 4;
        // Get initials from name (e.g. "R. Sharma" → "RS")
        const initials = player.name
          .replace(/\./g, '')
          .split(' ')
          .map(w => w[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);

        return (
          <g key={player.id}>
            {/* Node background */}
            <circle
              cx={player.avgX}
              cy={player.avgY}
              r={radius}
              fill="rgba(10, 10, 10, 0.85)"
              stroke={accentColor}
              strokeWidth={0.5}
            />

            {/* Initials inside node */}
            <text
              x={player.avgX}
              y={player.avgY}
              textAnchor="middle"
              dominantBaseline="central"
              fill={accentColor}
              fontSize={radius > 4 ? 3 : 2.5}
              fontWeight="600"
            >
              {initials}
            </text>

            {/* Position label below node (Pro mode or always if showLabels) */}
            {showLabels && isPro && (
              <text
                x={player.avgX}
                y={player.avgY + radius + 2.5}
                textAnchor="middle"
                fill="rgba(255,255,255,0.5)"
                fontSize={2}
              >
                {player.position}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
