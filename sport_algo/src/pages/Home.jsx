/**
 * Home.jsx — Player Profile & Home screen
 *
 * This is the first screen the user sees.
 * Think of it as "your football identity at a glance."
 * Everything here is a preview that links deeper.
 *
 * Components used: ModeToggle, PlayerCard, StatChip, MatchCard, ClipCard, RadarChart
 *
 * KNOW THIS: This screen is mostly layout — flex and grid with Tailwind.
 * The useMode() hook controls what shows in Fun vs Pro mode.
 * No new logic here — just importing and arranging building blocks.
 */

import { useMode } from '../hooks/useMode';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

import PlayerCard from '../components/cards/PlayerCard.jsx';
import StatChip from '../components/charts/StatChip.jsx';
import MatchCard from '../components/cards/Matchcard.jsx';
import ClipCard from '../components/cards/ClipCard.jsx';
import ModeToggle from '../components/layouts/Modetoggle.jsx';
import data from '../data/mockdata.json';

export default function Home({ onMatchClick = () => {}, onClipsClick = () => {} }) {
  const { isPro } = useMode();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const { player, matches, clips } = data;
  const latestMatch = matches[0];

  // Fun mode: show 4 simple stats. Pro mode: show 6 with advanced metrics.
  const funStats = [
    { label: 'Matches', value: player.seasonStats.matchesPlayed },
    { label: 'Goals', value: player.seasonStats.goals },
    { label: 'Assists', value: player.seasonStats.assists },
    { label: 'Distance', value: player.seasonStats.distancePerMatch, unit: 'km' },
  ];

  const proStats = [
    ...funStats,
    { label: 'Pass %', value: player.seasonStats.passAccuracy, unit: '%' },
    { label: 'xG', value: player.seasonStats.xG, highlight: true },
  ];

  const statsToShow = isPro ? proStats : funStats;

  return (
    <div className="px-4 pt-4 space-y-4">

      {/* ═══ Header bar ═══ */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-medium">
            Athlete
          </span>
          <span className="text-sm font-bold text-[#CCF930] tracking-wide">
            SPORTSALGO
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-[var(--text-secondary)] hover:text-[#CCF930] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {theme === 'dark' ? (
                <><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>
              ) : (
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              )}
            </svg>
          </button>

          {/* Rating badge */}
          <div className="flex items-center gap-1 bg-[#CCF930] rounded-lg px-2.5 py-1">
            <span className="text-[10px] font-medium text-[#0A0A0A] uppercase">OVR</span>
            <span className="text-sm font-black text-[#0A0A0A] font-mono">
              {player.overallRating}
            </span>
          </div>
        </div>
      </div>

      {/* ═══ Mode toggle ═══ */}
      <ModeToggle />

      {/* ═══ Player info ═══ */}
      <div>
        <h1 className="text-2xl font-black uppercase tracking-wide text-[var(--text-primary)]">
          {player.name}
        </h1>
        <p className="text-xs uppercase tracking-widest text-[var(--text-secondary)] mt-0.5">
          {player.position} • {player.team}
        </p>
      </div>

      {/* ═══ Player card (image + rating + radar) ═══ */}
      <PlayerCard
        player={player}
        showBenchmark={isPro}
      />

      {/* ═══ Season stats grid ═══ */}
      <div>
        <h3 className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-medium mb-2">
          Season Stats
        </h3>
        <div className={`grid gap-2 ${isPro ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {statsToShow.map((stat) => (
            <StatChip
              key={stat.label}
              label={stat.label}
              value={stat.value}
              unit={stat.unit}
              highlight={stat.highlight}
            />
          ))}
        </div>
      </div>

      {/* ═══ Last match card ═══ */}
      <MatchCard
        match={latestMatch}
        variant="compact"
        onClick={() => onMatchClick(latestMatch.id)}
        onClick={()=>navigate('/matchsummary')}
      />

      {/* ═══ Action buttons ═══ */}
      <div className="grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#CCF930] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
          </svg>
          View Replay
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#CCF930] text-[#CCF930] text-xs font-bold uppercase tracking-wider hover:bg-[#CCF930]/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          Export Stats
        </button>
      </div>

      {/* ═══ Highlights carousel ═══ */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-medium">
            Your Highlights
          </h3>
          <button
            onClick={onClipsClick}
            className="text-[10px] text-[#CCF930] font-medium hover:underline"
          >
            See all
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {clips.slice(0, 4).map((clip) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              variant="compact"
              showXG={isPro}
              onPlay={() => navigate('/clips')}
            />
          ))}
        </div>
      </div>

      {/* ═══ Quick links ═══ */}
      <div className="grid grid-cols-2 gap-2 pb-4">
        <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider hover:border-[#CCF930]/30 hover:text-[#CCF930] transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          Timeline
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] text-xs font-medium uppercase tracking-wider hover:border-[#CCF930]/30 hover:text-[#CCF930] transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
          </svg>
          Training
        </button>
      </div>

      

    </div>
  );
}