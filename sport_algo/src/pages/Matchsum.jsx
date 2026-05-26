/**
 * MatchSummary.jsx — The data-richest screen
 *
 * Contains: score header, key stats, match momentum,
 * and the tabbed pitch visualizations (heatmap / passing / shots).
 *
 * Only NEW concept here: useState for the active tab.
 * Everything else is just importing and arranging your components.
 *
 * KNOW THIS: The tab switcher is just 3 buttons controlling a string state.
 * When state changes, React re-renders and swaps which child
 * appears inside PitchSVG. That's it.
 */

import { useState } from 'react';
import { useMode } from '../hooks/useMode';
import MatchCard from '../components/cards/Matchcard';
import StatChip from '../components/charts/StatChip';
import ClipCard from '../components/cards/ClipCard';
import PitchSVG from '../components/pitch/pitchSVG';
import Heatmap from '../components/pitch/Heatmap';
import PassingNetwork from '../components/pitch/Passingnetwork';
import ShotMap from '../components/pitch/ShotMap';
import MatchMomentum from '../components/charts/TimeLine';
import data from '../data/mockdata.json';

export default function MatchSummary({ matchId = 'm001' }) {
  const { isPro } = useMode();

  // ── Tab state: which pitch visualization is showing ──
  const [activeViz, setActiveViz] = useState('heatmap');

  // ── Half filter for heatmap ──
  const [halfFilter, setHalfFilter] = useState('full');  // 'full' | '1st' | '2nd'

  // ── Get match data ──
  const match = data.matches.find((m) => m.id === matchId) || data.matches[0];
  const { playerStats } = match;

  // ── Filter shots and goals from events ──
  const shots = data.events.filter(
    (e) => e.type === 'shot' || e.type === 'goal'
  );

  // ── Filter clips for this match ──
  const matchClips = data.clips.filter((c) => c.matchId === matchId);

  // ── Tab config ──
  const vizTabs = [
    { key: 'heatmap', label: 'Heatmap' },
    { key: 'passing', label: 'Passing Network' },
    { key: 'shots', label: 'Shot Map' },
  ];

  return (
    <div className="px-4 pt-4 space-y-4">

      {/* ═══ Header ═══ */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#CCF930] tracking-wide">
          SPORTSALGO
        </span>
        <div className="flex items-center gap-1 bg-[#CCF930] rounded-lg px-2.5 py-1">
          <span className="text-[10px] font-medium text-[#0A0A0A] uppercase">OVR</span>
          <span className="text-sm font-black text-[#0A0A0A] font-mono">
            {data.player.overallRating}
          </span>
        </div>
      </div>

      {/* ═══ Score card (header variant) ═══ */}
      <MatchCard match={match} variant="header" />

      {/* ═══ Key stats row ═══ */}
      <div className="flex gap-2">
        <StatChip label="Distance" value={playerStats.distance} unit="km" size="sm" />
        <StatChip label="Passes" value={playerStats.passes} size="sm" />
        <StatChip label="Shots" value={playerStats.shots} size="sm" />
        <StatChip label="Tackles" value={playerStats.tackles} size="sm" />
        {isPro && (
          <StatChip label="Pass %" value={playerStats.passAccuracy} unit="%" size="sm" highlight />
        )}
      </div>

      {/* ═══ Pitch visualization tabs ═══ */}
      <div>
        {/* Tab switcher */}
        <div className="flex gap-1.5 mb-3">
          {vizTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveViz(tab.key)}
              className={`
                px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all
                ${activeViz === tab.key
                  ? 'bg-[#CCF930] text-[#0A0A0A]'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Pitch + active visualization ── */}

        {activeViz === 'heatmap' && (
          <div className="relative rounded-xl overflow-hidden">
            <PitchSVG />
            <Heatmap zones={data.heatmap.zones} />
          </div>
        )}

        {activeViz === 'passing' && (
          <div className="rounded-xl overflow-hidden">
            <PitchSVG>
              <PassingNetwork
                players={data.passingNetwork.players}
                links={data.passingNetwork.links}
                isPro={isPro}
              />
            </PitchSVG>
          </div>
        )}

        {activeViz === 'shots' && (
          <div className="rounded-xl overflow-hidden">
            <PitchSVG half="right">
              <ShotMap
                shots={shots}
                showXG={isPro}
              />
            </PitchSVG>
          </div>
        )}

        {/* Half filter (below pitch, heatmap only) */}
        {activeViz === 'heatmap' && (
          <div className="flex gap-1.5 mt-2">
            {['1st Half', '2nd Half', 'Full Match'].map((label) => {
              const key = label === '1st Half' ? '1st' : label === '2nd Half' ? '2nd' : 'full';
              return (
                <button
                  key={key}
                  onClick={() => setHalfFilter(key)}
                  className={`
                    px-3 py-1 rounded-md text-[10px] font-medium transition-all
                    ${halfFilter === key
                      ? 'bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Pitch label */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-2 h-2 rounded-sm bg-[#CCF930]" />
          <span className="text-[10px] text-[var(--text-secondary)]">
            Delhi FC Intensity
          </span>
        </div>
      </div>

      {/* ═══ Match momentum ═══ */}
      <MatchMomentum data={data.matchTimeline.momentum} />

      {/* ═══ Extra stats (Pro mode) ═══ */}
      {isPro && (
        <div className="flex gap-2">
          <StatChip label="Possession" value="56" unit="%" secondary="44%" size="lg" />
          <StatChip label="xG (Expected Goals)" value="2.14" secondary="0.85" size="lg" highlight />
        </div>
      )}

      {/* ═══ Clips from this match ═══ */}
      {matchClips.length > 0 && (
        <div>
          <h3 className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-medium mb-2">
            Clips from this match
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {matchClips.map((clip) => (
              <ClipCard
                key={clip.id}
                clip={clip}
                variant="compact"
                showXG={isPro}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bottom padding for NavBar */}
      <div className="h-4" />
    </div>
  );
}