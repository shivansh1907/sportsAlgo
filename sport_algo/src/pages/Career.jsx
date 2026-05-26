/**
 * Career.jsx — Career Journey / Progression screen
 *
 * Shows: rating trend, personal bests, season stats, scouting insight.
 *
 * NEW CONCEPT: Recharts LineChart for the rating sparkline.
 * Everything else is your existing components + Tailwind layout.
 *
 * KNOW THIS: Recharts needs <ResponsiveContainer> to auto-size.
 * Without it, the chart renders at 0 width and you see nothing.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMode } from '../hooks/useMode';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Area, AreaChart,
} from 'recharts';
// import StatChip from '../components/cards/StatChip';
import data from '../data/mockdata.json';

export default function Career() {
  const { isPro } = useMode();
  const navigate = useNavigate();

  const { careerProgression, player } = data;
  const { seasons, personalBests, ratingHistory } = careerProgression;

  // ── Time range filter ──
  const [range, setRange] = useState('all'); // 'recent' | 'season' | 'all'

  // Filter rating history based on range
  const filteredRatings = (() => {
    switch (range) {
      case 'recent': return ratingHistory.slice(-5);
      case 'season': return ratingHistory.slice(-10);
      default: return ratingHistory;
    }
  })();

  // ── Calculate trend (compare last 5 to previous 5) ──
  const recentAvg = ratingHistory.slice(-5).reduce((s, r) => s + r.rating, 0) / 5;
  const prevAvg = ratingHistory.slice(-10, -5).reduce((s, r) => s + r.rating, 0) / 5;
  const trendPct = (((recentAvg - prevAvg) / prevAvg) * 100).toFixed(1);
  const trendUp = trendPct > 0;

  // ── Custom tooltip for the chart ──
  function ChartTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-1.5 shadow-lg">
        <span className="text-xs font-mono font-bold text-[#CCF930]">
          {payload[0].value.toFixed(1)}
        </span>
        <span className="text-[10px] text-[var(--text-secondary)] ml-1">rating</span>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 space-y-4">

      {/* ═══ Header ═══ */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#CCF930] tracking-wide">SPORTSALGO</span>
        <div className="flex items-center gap-1 bg-[#CCF930] rounded-lg px-2.5 py-1">
          <span className="text-[10px] font-medium text-[#0A0A0A] uppercase">OVR</span>
          <span className="text-sm font-black text-[#0A0A0A] font-mono">
            {player.overallRating}
          </span>
        </div>
      </div>

      {/* ═══ Title ═══ */}
      <div>
        <h1 className="text-2xl font-black text-[var(--text-primary)] uppercase">
          Career Journey
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mt-0.5">
          Season 2025/26 Performance Analytics
        </p>
      </div>

      {/* ═══ Average rating card with sparkline ═══ */}
      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-medium">
              Average Rating
            </h3>
            <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
              Last 10 matches trend •{' '}
              <span className={trendUp ? 'text-[#CCF930]' : 'text-red-400'}>
                {trendUp ? '+' : ''}{trendPct}% growth
              </span>
            </p>
          </div>
          <span className="text-3xl font-black text-[#CCF930] font-mono leading-none">
            {player.seasonStats.avgRating.toFixed(1)}
          </span>
        </div>

        {/* Sparkline chart */}
        <ResponsiveContainer width="100%" height={80}>
          <AreaChart data={filteredRatings}>
            <defs>
              <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CCF930" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#CCF930" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="rating"
              stroke="#CCF930"
              strokeWidth={2}
              fill="url(#ratingGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#CCF930', stroke: '#0A0A0A', strokeWidth: 2 }}
            />
            <XAxis dataKey="match" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip content={<ChartTooltip />} />
          </AreaChart>
        </ResponsiveContainer>

        {/* Range filter tabs */}
        <div className="flex gap-1.5 mt-3">
          {[
            { key: 'recent', label: 'Last 5' },
            { key: 'season', label: 'Last 10' },
            { key: 'all', label: 'All Matches' },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setRange(opt.key)}
              className={`
                px-2.5 py-1 rounded-md text-[10px] font-medium transition-all
                ${range === opt.key
                  ? 'bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ Personal best card ═══ */}
      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#CCF930] text-[#0A0A0A] uppercase">
            Milestone Unlocked
          </span>
        </div>
        <h3 className="text-base font-bold text-[var(--text-primary)]">
          New Personal Best: Top Speed
        </h3>
        <span className="text-2xl font-black text-[#CCF930] font-mono">
          {personalBests.topSpeed.value} <span className="text-sm">km/h</span>
        </span>
        <p className="text-[10px] text-[var(--text-secondary)] mt-1 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCF930]" />
          Elite Velocity Zone • {personalBests.topSpeed.match} • {personalBests.topSpeed.date}
        </p>
      </div>

      {/* ═══ Season stat cards ═══ */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4">
          <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-medium">
            Distance Covered
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-[var(--text-primary)] font-mono">
              {player.seasonStats.totalDistance}
            </span>
            <span className="text-xs text-[var(--text-secondary)]">km</span>
          </div>
          <p className="text-[10px] text-[#CCF930] mt-1">
            ↑ 12% vs last season
          </p>
        </div>

        <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4">
          <span className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-medium">
            Goals Scored
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-[var(--text-primary)] font-mono">
              {player.seasonStats.goals}
            </span>
          </div>
          <p className="text-[10px] text-[var(--text-secondary)] mt-1">
            Career high reached
          </p>
        </div>
      </div>

      {/* ═══ Season-over-season comparison (Pro mode) ═══ */}
      {isPro && (
        <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4">
          <h3 className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] font-medium mb-3">
            Season Comparison
          </h3>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={seasons}>
              <XAxis
                dataKey="season"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
              />
              <YAxis hide />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone"
                dataKey="goals"
                stroke="#CCF930"
                strokeWidth={2}
                dot={{ r: 4, fill: '#CCF930', stroke: '#0A0A0A', strokeWidth: 2 }}
                name="Goals"
              />
              <Line
                type="monotone"
                dataKey="assists"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4, fill: '#3B82F6', stroke: '#0A0A0A', strokeWidth: 2 }}
                name="Assists"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-[#CCF930] rounded" />
              <span className="text-[10px] text-[var(--text-secondary)]">Goals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-[#3B82F6] rounded" />
              <span className="text-[10px] text-[var(--text-secondary)]">Assists</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Live momentum bars ═══ */}
      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Live Momentum</h3>
            <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">
              Intra-match intensity
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        {/* Animated-looking bars */}
        <div className="flex items-end gap-1.5 h-16">
          {[40, 75, 90, 60, 85, 45, 70, 95, 55, 80].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-[#CCF930]"
              style={{
                height: `${h}%`,
                opacity: 0.4 + (h / 100) * 0.6,
              }}
            />
          ))}
        </div>
      </div>

      {/* ═══ Scouting report insight ═══ */}
      <div className="bg-[var(--surface)] rounded-xl border border-[var(--border)] p-4">
        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#CCF930]/10 text-[#CCF930] uppercase">
          Scouting Report
        </span>
        <h3 className="text-base font-bold text-[var(--text-primary)] mt-2">
          Scouting Report Insight
        </h3>
        <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
          Based on your recent progression from a rating of 72 to {player.overallRating}, your
          tactical awareness in the final third has improved by 34%. Professional scouts from
          tier-1 leagues are monitoring this trajectory.
        </p>
        <button
          onClick={() => navigate('/scout')}
          className="w-full mt-4 py-2.5 rounded-lg bg-[#CCF930] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
        >
          View Scouting Feed
        </button>
      </div>

      {/* Bottom padding for NavBar */}
      <div className="h-4" />
    </div>
  );
}