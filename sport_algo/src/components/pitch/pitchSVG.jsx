/**
 * PitchSVG — Reusable football pitch component
 * 
 * Uses FIFA standard proportions (105m × 68m)
 * ViewBox coordinates = meters, so overlays use real pitch coords
 * 
 * Usage:
 *   <PitchSVG>                              ← full pitch
 *     <PassingNetwork data={...} />
 *   </PitchSVG>
 * 
 *   <PitchSVG half="right">                 ← attacking half only
 *     <ShotMap data={...} />
 *   </PitchSVG>
 */

export default function PitchSVG({ children, half = null, className = '' }) {
  // FIFA standard dimensions (meters)
  const L = 105;        // pitch length
  const W = 68;         // pitch width
  const PA_L = 16.5;    // penalty area length
  const PA_W = 40.3;    // penalty area width
  const GA_L = 5.5;     // goal area length
  const GA_W = 18.32;   // goal area width
  const CR = 9.15;      // center circle radius
  const PS = 11;        // penalty spot from goal line
  const GW = 7.32;      // goal width

  // Center everything vertically
  const paY = (W - PA_W) / 2;
  const gaY = (W - GA_W) / 2;
  const goalY = (W - GW) / 2;

  // If half pitch, shift the viewBox
  const vbX = half === 'right' ? L / 2 : 0;
  const vbW = half ? L / 2 : L;

  // Line styling
  const line = {
    stroke: 'rgba(255,255,255,0.55)',
    strokeWidth: 0.4,
    fill: 'none',
  };

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        viewBox={`${vbX} 0 ${vbW} ${W}`}
        className="block w-full h-auto rounded-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Pitch surface ── */}
        <rect x={0} y={0} width={L} height={W} className="fill-[#2D6A4F]" />

        {/* ── Grass stripes (subtle alternating bands) ── */}
        {Array.from({ length: 10 }, (_, i) => (
          <rect
            key={`stripe-${i}`}
            x={i * (L / 10)}
            y={0}
            width={L / 10}
            height={W}
            fill={i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent'}
          />
        ))}

        {/* ── Outer boundary ── */}
        <rect x={0} y={0} width={L} height={W} {...line} />

        {/* ── Halfway line ── */}
        <line x1={L / 2} y1={0} x2={L / 2} y2={W} {...line} />

        {/* ── Center circle + spot ── */}
        <circle cx={L / 2} cy={W / 2} r={CR} {...line} />
        <circle cx={L / 2} cy={W / 2} r={0.6} fill="rgba(255,255,255,0.7)" />

        {/* ════════ LEFT SIDE ════════ */}

        {/* Left penalty area */}
        <rect x={0} y={paY} width={PA_L} height={PA_W} {...line} />

        {/* Left goal area */}
        <rect x={0} y={gaY} width={GA_L} height={GA_W} {...line} />

        {/* Left penalty spot */}
        <circle cx={PS} cy={W / 2} r={0.6} fill="rgba(255,255,255,0.7)" />

        {/* Left penalty arc (curve outside penalty area) */}
        <path
          d={`M ${PA_L} ${W / 2 - 10} A ${CR} ${CR} 0 0 1 ${PA_L} ${W / 2 + 10}`}
          {...line}
        />

        {/* Left goal frame (behind goal line) */}
        <rect
          x={-2} y={goalY} width={2} height={GW}
          stroke="rgba(255,255,255,0.35)" strokeWidth={0.6} fill="none"
        />

        {/* ════════ RIGHT SIDE ════════ */}

        {/* Right penalty area */}
        <rect x={L - PA_L} y={paY} width={PA_L} height={PA_W} {...line} />

        {/* Right goal area */}
        <rect x={L - GA_L} y={gaY} width={GA_L} height={GA_W} {...line} />

        {/* Right penalty spot */}
        <circle cx={L - PS} cy={W / 2} r={0.6} fill="rgba(255,255,255,0.7)" />

        {/* Right penalty arc */}
        <path
          d={`M ${L - PA_L} ${W / 2 - 10} A ${CR} ${CR} 0 0 0 ${L - PA_L} ${W / 2 + 10}`}
          {...line}
        />

        {/* Right goal frame */}
        <rect
          x={L} y={goalY} width={2} height={GW}
          stroke="rgba(255,255,255,0.35)" strokeWidth={0.6} fill="none"
        />

        {/* ════════ CORNER ARCS ════════ */}
        <path d={`M 0 1 A 1 1 0 0 0 1 0`} {...line} />
        <path d={`M ${L - 1} 0 A 1 1 0 0 0 ${L} 1`} {...line} />
        <path d={`M 0 ${W - 1} A 1 1 0 0 1 1 ${W}`} {...line} />
        <path d={`M ${L - 1} ${W} A 1 1 0 0 1 ${L} ${W - 1}`} {...line} />

        {/* ── Children render ON TOP (heatmap, pass network, shots) ── */}
        {children}
      </svg>
    </div>
  );
}