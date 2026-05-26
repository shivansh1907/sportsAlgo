/**
 * ClipsFeed.jsx — Your Highlights screen
 *
 * Filter tabs at top, vertical scrollable feed of ClipCards below.
 * 
 * ONLY NEW CONCEPT: useState for the active filter.
 * When filter changes, we .filter() the clips array.
 * Everything else is components you already built.
 *
 * KNOW THIS: The filter doesn't call an API — it just filters
 * the local array. In production you'd add pagination + API calls.
 */

import { useState } from 'react';
import { useMode } from '../hooks/useMode';
import ClipCard from '../components/cards/ClipCard';
import data from '../data/mockdata.json';

export default function ClipsFeed() {
  const { isPro } = useMode();

  // ── Filter state ──
  const [activeFilter, setActiveFilter] = useState('all');

  // ── Sort state (Pro mode only) ──
  const [sortBy, setSortBy] = useState('date');  // 'date' | 'xg'

  // ── Filter tabs config ──
  const filters = [
    { key: 'all',     label: 'All' },
    { key: 'goal',    label: 'Goals' },
    { key: 'assist',  label: 'Assists' },
    { key: 'save',    label: 'Key Moments' },
  ];

  // ── Apply filter ──
  let filteredClips = data.clips;

  if (activeFilter !== 'all') {
    filteredClips = filteredClips.filter((clip) => clip.type === activeFilter);
  }

  // ── Apply sort (Pro mode) ──
  if (isPro && sortBy === 'xg') {
    filteredClips = [...filteredClips].sort((a, b) => (b.xG || 0) - (a.xG || 0));
  }

  return (
    <div className="px-4 pt-4 space-y-4">

      {/* ═══ Header ═══ */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-bold text-[#CCF930] tracking-wide">
            SPORTSALGO
          </span>
        </div>
        <div className="flex items-center gap-1 bg-[#CCF930] rounded-lg px-2.5 py-1">
          <span className="text-[10px] font-medium text-[#0A0A0A] uppercase">OVR</span>
          <span className="text-sm font-black text-[#0A0A0A] font-mono">
            {data.player.overallRating}
          </span>
        </div>
      </div>

      {/* ═══ Title ═══ */}
      <h1 className="text-2xl font-black text-[var(--text-primary)]">
        Your Highlights
      </h1>

      {/* ═══ Filter tabs ═══ */}
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`
              px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all
              ${activeFilter === filter.key
                ? 'bg-[#CCF930] text-[#0A0A0A]'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)]'
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* ═══ Sort control (Pro mode only) ═══ */}
      {isPro && (
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">
            {filteredClips.length} clips
          </span>
          <div className="flex items-center gap-1 bg-[var(--surface)] rounded-lg p-0.5 border border-[var(--border)]">
            <button
              onClick={() => setSortBy('date')}
              className={`
                px-2.5 py-1 rounded-md text-[10px] font-medium transition-all
                ${sortBy === 'date'
                  ? 'bg-[var(--bg)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)]'
                }
              `}
            >
              Latest
            </button>
            <button
              onClick={() => setSortBy('xg')}
              className={`
                px-2.5 py-1 rounded-md text-[10px] font-medium transition-all
                ${sortBy === 'xg'
                  ? 'bg-[var(--bg)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)]'
                }
              `}
            >
              Highest xG
            </button>
          </div>
        </div>
      )}

      {/* ═══ Clips feed ═══ */}
      <div className="flex flex-col gap-4">
        {filteredClips.map((clip) => (
          <ClipCard
            key={clip.id}
            clip={clip}
            showXG={isPro}
            onPlay={() => console.log('Play clip:', clip.id)}
            onShare={() => console.log('Share clip:', clip.id)}
          />
        ))}

        {/* Empty state */}
        {filteredClips.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="text-3xl mb-3">🎬</span>
            <p className="text-sm text-[var(--text-secondary)]">
              No {activeFilter} clips yet
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="text-xs text-[#CCF930] mt-2 hover:underline"
            >
              Show all clips
            </button>
          </div>
        )}
      </div>

      {/* Bottom padding for NavBar */}
      <div className="h-4" />
    </div>
  );
}