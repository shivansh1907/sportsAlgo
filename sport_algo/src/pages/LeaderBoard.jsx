/**
 * Leaderboard.jsx — Rankings screen
 *
 * Shows where you rank vs teammates/league on different metrics.
 * 
 * ONLY NEW CONCEPT: Multiple filter states (scope + metric).
 * Everything else is Tailwind layout + .map() over the data.
 *
 * KNOW THIS: The leaderboard data lives in mockData under
 * different keys (teamGoals, teamAssists, teamDistance).
 * When the metric changes, we swap which array we render.
 */

import { useState } from 'react';
import { useMode } from '../hooks/useMode';
import data from '../data/mockdata.json';

export default function Leaderboard() {
  const { isPro } = useMode();

  // ── Scope filter ──
  const [scope, setScope] = useState('team');  // 'team' | 'league' | 'all'

  // ── Metric filter ──
  const [metric, setMetric] = useState('goals');  // 'goals' | 'assists' | 'distance'

  // ── Get the right data based on metric ──
  const leaderboardData = {
    goals: data.leaderboard.teamGoals,
    assists: data.leaderboard.teamAssists,
    distance: data.leaderboard.teamDistance,
  };

  const rankings = leaderboardData[metric] || [];

  // ── Metric labels for display ──
  const metricLabels = {
    goals: 'Goals',
    assists: 'Assists',
    distance: 'km',
  };

  // ── Badge colors for top 3 ──
  const rankBadge = (rank) => {
    switch (rank) {
      case 1: return { bg: 'bg-[#FFD700]/20', border: 'border-[#FFD700]/50', text: 'text-[#FFD700]', emoji: '🥇' };
      case 2: return { bg: 'bg-[#C0C0C0]/20', border: 'border-[#C0C0C0]/50', text: 'text-[#C0C0C0]', emoji: '🥈' };
      case 3: return { bg: 'bg-[#CD7F32]/20', border: 'border-[#CD7F32]/50', text: 'text-[#CD7F32]', emoji: '🥉' };
      default: return null;
    }
  };

  return (
    <div className="px-4 pt-4 space-y-4">

      {/* ═══ Header ═══ */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#CCF930] tracking-wide">SPORTSALGO</span>
        <div className="flex items-center gap-1 bg-[#CCF930] rounded-lg px-2.5 py-1">
          <span className="text-[10px] font-medium text-[#0A0A0A] uppercase">OVR</span>
          <span className="text-sm font-black text-[#0A0A0A] font-mono">
            {data.player.overallRating}
          </span>
        </div>
      </div>

      {/* ═══ Title ═══ */}
      <h1 className="text-2xl font-black text-[var(--text-primary)] uppercase">
        Leaderboard
      </h1>

      {/* ═══ Scope selector (My Team / League / All) ═══ */}
      <div className="flex gap-2">
        {[
          { key: 'team', label: 'My Team' },
          { key: 'league', label: 'League' },
          { key: 'all', label: 'All Players' },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setScope(s.key)}
            className={`
              px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all
              ${scope === s.key
                ? 'bg-[#CCF930] text-[#0A0A0A]'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)]'
              }
            `}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ═══ Metric selector (Goals / Assists / Distance) ═══ */}
      <div className="flex gap-2">
        {[
          { key: 'goals', label: 'Goals' },
          { key: 'assists', label: 'Assists' },
          { key: 'distance', label: 'Distance' },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMetric(m.key)}
            className={`
              px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all
              ${metric === m.key
                ? 'bg-[var(--surface)] text-[#CCF930] border border-[#CCF930]/30'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }
            `}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* ═══ Rankings list ═══ */}
      <div className="flex flex-col gap-2">
        {rankings.map((player) => {
          const badge = rankBadge(player.rank);
          const isYou = player.isCurrentUser;

          return (
            <div
              key={player.rank}
              className={`
                flex items-center gap-3 p-3 rounded-xl transition-all
                ${isYou
                  ? 'bg-[#CCF930]/10 border border-[#CCF930]/30'
                  : 'bg-[var(--surface)] border border-[var(--border)]'
                }
              `}
            >
              {/* Rank number or badge */}
              <div className="w-8 flex-shrink-0 flex items-center justify-center">
                {badge ? (
                  <span className="text-lg">{badge.emoji}</span>
                ) : (
                  <span className="text-sm font-bold text-[var(--text-secondary)] font-mono">
                    {player.rank}
                  </span>
                )}
              </div>

              {/* Avatar circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
                  ${isYou
                    ? 'bg-[#CCF930] text-[#0A0A0A]'
                    : badge
                      ? `${badge.bg} ${badge.text} border ${badge.border}`
                      : 'bg-[var(--bg)] text-[var(--text-secondary)] border border-[var(--border)]'
                  }
                `}
              >
                {player.avatar || player.name.split(' ').map(w => w[0]).join('')}
              </div>

              {/* Name + position */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${isYou ? 'text-[#CCF930]' : 'text-[var(--text-primary)]'}`}>
                  {player.name}
                  {isYou && <span className="text-[10px] ml-1.5 opacity-70">(You)</span>}
                </p>
                {player.position && (
                  <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider truncate">
                    {player.position}
                  </p>
                )}
                {/* Percentile — only for current user */}
                {isYou && player.percentile && (
                  <p className="text-[10px] text-[#CCF930]/70 mt-0.5">
                    {player.percentile} in your league
                  </p>
                )}
              </div>

              {/* Value */}
              <div className="flex-shrink-0 text-right">
                <span className={`text-lg font-black font-mono ${isYou ? 'text-[#CCF930]' : badge ? badge.text : 'text-[var(--text-primary)]'}`}>
                  {player.value}
                </span>
                <p className="text-[9px] text-[var(--text-secondary)] uppercase">
                  {metricLabels[metric]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══ Pro mode: your percentile card ═══ */}
      {isPro && (
        <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4 text-center">
          <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mb-1">
            Your {metricLabels[metric]} rank
          </p>
          <p className="text-sm text-[var(--text-primary)]">
            You're in the <span className="text-[#CCF930] font-bold">top 22%</span> of
            players in your league for {metric}
          </p>
        </div>
      )}

      {/* Bottom padding for NavBar */}
      <div className="h-4" />
    </div>
  );
}