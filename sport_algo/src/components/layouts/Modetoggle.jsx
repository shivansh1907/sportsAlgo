/**
 * NavBar — Bottom navigation bar (5 tabs)
 * Fixed at the bottom of every screen
 *
 * Usage:
 *   <NavBar active="home" onNavigate={(tab) => setActiveScreen(tab)} />
 */

const TABS = [
  {
    key: 'home',
    label: 'Home',
    // SVG paths for each icon — keeps it dependency-free
    icon: 'M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z',
  },
  {
    key: 'matches',
    label: 'Matches',
    icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a1 1 0 110 2 1 1 0 010-2zm-3 8a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z',
  },
  {
    key: 'clips',
    label: 'Clips',
    icon: 'M5 3l14 9-14 9V3z',
  },
  {
    key: 'progress',
    label: 'Progress',
    icon: 'M3 3v18h18M7 16l4-4 4 4 5-5',
  },
  {
    key: 'leaderboard',
    label: 'Leaderboard',
    icon: 'M6 9H2v12h4V9zm8-4h-4v16h4V5zm8 8h-4v8h4v-8z',
  },
];

export default function NavBar({ active = 'home', onNavigate = () => {} }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-[430px] mx-auto flex items-center justify-around py-2">
        {TABS.map((tab) => {
          const isActive = active === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.key)}
              className={`
                flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors
                ${isActive
                  ? 'text-[#CCF930]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isActive ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={tab.icon} />
              </svg>

              <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                {tab.label}
              </span>

              {/* Active dot indicator */}
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#CCF930]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}