/**
 * StatChip — Small stat pill showing label + value
 *
 * Used everywhere:
 *   - Player Home: PAC 92, SHO 85, etc.
 *   - Match Center: Possession 56%, xG 2.14
 *   - Career: Distance 142km, Goals 12
 *
 * Usage:
 *   <StatChip label="Goals" value={12} />
 *   <StatChip label="Distance" value="9.2" unit="km" />
 *   <StatChip label="xG" value="2.14" secondary="0.85" highlight />
 *   <StatChip label="Possession" value="56" unit="%" size="lg" />
 */

export default function StatChip({
  label,
  value,
  unit = '',
  secondary = null,   // smaller sub-value (like the "44%" next to Possession)
  highlight = false,   // green accent border
  size = 'md',         // 'sm' | 'md' | 'lg'
  icon = null,         // optional Lucide icon component
}) {
  const sizes = {
    sm: { wrapper: 'px-2 py-1.5', value: 'text-sm', label: 'text-[9px]' },
    md: { wrapper: 'px-3 py-2', value: 'text-lg', label: 'text-[10px]' },
    lg: { wrapper: 'px-4 py-3', value: 'text-2xl', label: 'text-[11px]' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div
      className={`
        flex flex-col items-center rounded-lg
        bg-[var(--surface)] border
        ${highlight
          ? 'border-[#CCF930]/30 bg-[#CCF930]/5'
          : 'border-[var(--border)]'
        }
        ${s.wrapper}
      `}
    >
      {/* Icon (optional) */}
      {icon && (
        <span className="text-[var(--text-secondary)] mb-1">{icon}</span>
      )}

      {/* Value row */}
      <div className="flex items-baseline gap-1">
        <span
          className={`
            font-bold font-mono leading-none
            ${highlight ? 'text-[#CCF930]' : 'text-[var(--text-primary)]'}
            ${s.value}
          `}
        >
          {value}
        </span>

        {/* Unit */}
        {unit && (
          <span className="text-[10px] text-[var(--text-secondary)] font-medium">
            {unit}
          </span>
        )}

        {/* Secondary value */}
        {secondary && (
          <span className="text-[10px] text-[var(--text-secondary)] ml-0.5">
            {secondary}
          </span>
        )}
      </div>

      {/* Label */}
      <span
        className={`
          uppercase tracking-wider font-medium
          text-[var(--text-secondary)] mt-0.5
          ${s.label}
        `}
      >
        {label}
      </span>
    </div>
  );
}