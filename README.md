# SportsAlgo Player App ⚽

A mobile-first football analytics dashboard that gives grassroots and semi-professional players a "Strava for Football" experience — real-time match stats, AI-clipped highlights, heatmaps, passing networks, and shareable FIFA-style player cards.

**Live Demo:** [https://sportsalgo-player-app.vercel.app](https://sportsalgo-player-app.vercel.app)

---

## 📱 Screens

| Home | Match Summary | Clips Feed |


| Career Journey | Leaderboard | Scout View |


---

## 🏗 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite** | Build tool + dev server |
| **Tailwind CSS** | Utility-first styling |
| **Recharts** | Line charts, area charts (Career page) |
| **React Router v6** | Client-side routing |
| **SVG** | Football pitch, radar chart, passing network, shot map |
| **Canvas API** | Heatmap visualization (radial gradients) |
| **Vercel** | Deployment |

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/sportsalgo-player-app.git
cd sportsalgo-player-app

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```
src/
├── data/
│   ├── mockdata.json            # All match data, player stats, events, clips
│   └── constants.js             # Color tokens, pitch dimensions, radar attributes
│
├── hooks/
│   ├── useMode.js               # Fun/Pro mode toggle (React Context)
│   └── useTheme.js              # Light/Dark theme toggle (React Context + localStorage)
│
├── components/
│   ├── pitch/
│   │   ├── PitchSVG.jsx         # ⭐ Reusable football pitch (FIFA dimensions in SVG)
│   │   ├── Heatmap.jsx          # Canvas-based heat overlay on pitch
│   │   ├── PassingNetwork.jsx   # SVG nodes + edges showing pass connections
│   │   └── ShotMap.jsx          # Half-pitch with shot circles sized by xG
│   │
│   ├── charts/
│   │   ├── RadarChart.jsx       # FIFA-style hexagon radar (6 attributes)
│   │   ├── MatchMomentum.jsx    # Bar chart showing team dominance per 15-min window
│   │   └── TimeLine.jsx         # Recharts AreaChart for match momentum
│   │
│   ├── cards/
│   │   ├── PlayerCard.jsx       # FIFA-style shareable card with photo + radar
│   │   ├── MatchCard.jsx        # Match score card (header + compact variants)
│   │   ├── ClipCard.jsx         # Video highlight card (full + compact variants)
│   │   └── StatChip.jsx         # Small stat pill (label + value)
│   │
│   └── layouts/
│       ├── NavBar.jsx           # Bottom navigation (5 tabs)
│       └── ModeToggle.jsx       # Fun/Pro segmented control
│
├── pages/
│   ├── Home.jsx                 # Player profile + stats + card + clips carousel
│   ├── MatchSummary.jsx         # Tabbed pitch visualizations + timeline
│   ├── ClipsFeed.jsx            # Filterable highlight clips feed
│   ├── Career.jsx               # Line charts + personal bests + scouting insight
│   ├── Leaderboard.jsx          # Ranked player list with scope/metric filters
│   └── ScoutView.jsx            # Free screen — shareable public portfolio
│
├── App.jsx                      # Router + Context providers
├── main.jsx                     # Entry point
└── index.css                    # Tailwind imports + CSS custom properties
```

---

## 🖥 Screens

### 1. Player Home
The first screen after login. Shows the player's identity at a glance — FIFA-style player card with radar chart, season stats, latest match result, and a carousel of highlight clips. The mode toggle switches between Fun (casual) and Pro (data-dense) views.

### 2. Match Summary
The data-richest screen. Contains all four pitch visualizations behind a tabbed interface:
- **Heatmap** — Canvas overlay showing player positioning frequency
- **Passing Network** — SVG nodes (players) and weighted edges (passes)
- **Shot Map** — Half-pitch with circles sized by xG and colored by outcome
- **Match Momentum** — Bar chart showing team dominance in 15-minute windows

### 3. Clips Feed
Vertically scrollable highlight clips with filter tabs (All / Goals / Assists / Key Moments). Pro mode adds sort-by-xG and xG badges on each card. Each clip card has share, save, and copy actions.

### 4. Career Journey
Season-over-season progression with Recharts area/line charts, personal best milestone cards, cumulative stats, and a scouting report insight card. Pro mode adds a multi-season comparison line chart.

### 5. Leaderboard
Ranked player list with two filter dimensions — scope (My Team / League / All Players) and metric (Goals / Assists / Distance). Top 3 get medal badges. Current user's row is highlighted with percentile ranking.

### 6. Scout View (Free Screen)
A shareable public portfolio page designed for coaches and scouts. Combines the player card, radar chart, top clips, career trajectory sparkline, and AI-generated scouting insight. Includes a "Share Profile" button for easy distribution.

---

## 🎯 Dual-Audience System (Fun vs Pro Mode)

The entire app serves two audiences through a single toggle:

| Aspect | Fun Mode (Recreational) | Pro Mode (Competitive) |
|--------|------------------------|----------------------|
| **Stats shown** | 4 basic (Goals, Assists, Distance, Matches) | 6+ with xG, xA, Pass %, Tackles |
| **Radar chart** | Player polygon only | + League average benchmark overlay (dashed) |
| **Clip cards** | Play button + match name | + xG badge, sortable by xG |
| **Heatmap** | Simple color overlay | + Zone labels, phase filters |
| **Passing network** | Lines between players | + Thickness = frequency, position labels |
| **Shot map** | Goals highlighted | + All shots with xG values |
| **Career page** | Sparkline + personal bests | + Season comparison multi-line chart |

**Implementation:** A React Context (`useMode`) provides `isFun` / `isPro` booleans. Components conditionally render extra data panels:

```jsx
const { isPro } = useMode();
{isPro && <BenchmarkOverlay data={leagueAvg} />}
```

---

## 🎨 Design System

### Color Palette

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| Primary | `#CCF930` | `#CCF930` | CTAs, active states, accent |
| Background | `#0A0A0A` | `#F9FAFB` | Page background |
| Surface | `#141414` | `#FFFFFF` | Card backgrounds |
| Border | `#2A2F2E` | `#E5E7EB` | Subtle borders |
| Text Primary | `#FFFFFF` | `#111827` | Headlines, body |
| Text Secondary | `#9CA3AF` | `#6B7280` | Labels, captions |
| Pitch Green | `#2D6A4F` | `#2D6A4F` | Football pitch surface |
| Heat Cold | `#3B82F6` | `#3B82F6` | Heatmap cold zones |
| Heat Hot | `#EF4444` | `#EF4444` | Heatmap hot zones |

### Typography

- **Display/Headings:** Inter (bold/black, uppercase, wide tracking)
- **Stat Numbers:** JetBrains Mono (monospace for numerical data)
- **Body:** Inter (regular weight)

### Theme Switching

CSS custom properties on `:root` swap via `data-theme` attribute:

```css
:root { --bg: #0A0A0A; --surface: #141414; --text-primary: #FFFFFF; }
[data-theme="light"] { --bg: #F9FAFB; --surface: #FFFFFF; --text-primary: #111827; }
```

---

## ⚽ Pitch Visualizations — Technical Details

All pitch visualizations are rendered programmatically using **SVG** and **Canvas** — no static images.

### PitchSVG (Foundation)
- Uses `viewBox="0 0 105 68"` matching FIFA standard pitch dimensions in meters
- All overlays share this coordinate system — position `x=88` means 88 meters on the pitch
- Accepts `children` prop so visualizations render inside the same `<svg>` element
- `half="right"` prop adjusts viewBox for the shot map (attacking half only)
- Drawn with `<rect>`, `<line>`, `<circle>`, and `<path>` (arc commands for penalty arcs)

### Heatmap (Canvas Overlay)
- Uses `<canvas>` positioned absolutely on top of PitchSVG
- Each data point renders as a `createRadialGradient` circle
- Color ramp: blue (cold/rare) → red (hot/frequent) based on intensity value (0-1)
- `globalCompositeOperation = 'lighter'` for additive blending of overlapping zones
- **Why Canvas over SVG?** Canvas excels at pixel-level operations like smooth gradient blurs. SVG would require hundreds of overlapping semi-transparent circles, which is less performant and harder to blend smoothly.

### Passing Network (SVG Children)
- Players rendered as `<circle>` nodes at their average position
- Pass connections rendered as `<line>` elements between nodes
- Node radius scales with player involvement (total passes)
- Line stroke-width scales with pass frequency between two players
- Player initials rendered as `<text>` inside each node

### Shot Map (SVG Children)
- Renders inside `<PitchSVG half="right">` — only the attacking half
- Each shot is a `<circle>` at the shot coordinates
- Circle radius = `1.5 + xG * 5` (bigger = higher expected goal probability)
- Color encoding: `#CCF930` (scored), `#F59E0B` (saved), `#6B7280` (missed)
- Goals get an additional glow ring effect

### Radar Chart (Standalone SVG)
- 6 vertices calculated using trigonometry: `cos(angle) × radius` for x, `sin(angle) × radius` for y
- Angles spaced 60° apart (360° ÷ 6), starting from top (-π/2 offset)
- Grid rings at 25%, 50%, 75%, 100% of max radius
- Player polygon fill at 15% opacity with solid stroke
- Optional benchmark polygon (league average) with dashed stroke for Pro mode

---

## 🔄 Data Flow

```
mockData.json
    ↓
App.jsx (provides Context: ThemeProvider → ModeProvider)
    ↓
Pages import data directly + read mode/theme from Context
    ↓
Pages pass relevant data slices as props to components
    ↓
Components render based on props + isPro/isFun conditionals
```

**Routing:** React Router v6 with `useNavigate()` for programmatic navigation and `useParams()` for reading URL parameters (e.g., `/matches/:matchId`).

**State Management:** React Context for global state (theme + mode). Local `useState` for screen-specific state (active tab, active filter, sort order). No Redux — unnecessary for this scope.

---

## 📱 Responsive Strategy

Instead of building a separate React Native app, the web app is designed **mobile-first at 430px max-width**:

```jsx
<div className="max-w-[430px] mx-auto">
  {/* Entire app renders inside this container */}
</div>
```

- On mobile browsers: fills the screen naturally
- On desktop: centers with appropriate margins
- Same approach used by Instagram Web, Twitter Mobile Web

---

## 🚢 Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod

# Or connect GitHub repo to Vercel for auto-deploys on push
```

---

## 📋 What I'd Build Next

1. **Real video playback** — integrate with a video player for actual clip playback with frame-by-frame seeking
2. **Social features** — share cards to WhatsApp/Instagram Stories, comment on clips, team chat
3. **Live match mode** — real-time stat dashboard that updates during a match via WebSocket
4. **Coach dashboard** — team-level analytics with formation editor, team heatmap, partnership analysis
5. **Backend integration** — Replace mock data with a REST API, add authentication, real-time data sync

---

## 🎨 Design Decisions

**Why dark theme + neon green?**
Sports apps thrive in dark mode — it reduces eye strain during evening use (when most players check post-match stats), creates premium feel aligned with gaming aesthetics (FIFA, EA Sports), and makes the neon green data visualizations pop with maximum contrast.

**Why SVG/Canvas instead of chart libraries for pitch visualizations?**
The brief specifically requires programmatic rendering. SVG gives us precise control over every line, arc, and coordinate on the pitch. Shapes are interactive (hoverable, clickable) and scale perfectly to any screen size via viewBox. Canvas is used only for the heatmap where pixel-level gradient blending outperforms SVG.

**Why one app with a mode toggle instead of two separate apps?**
Recreational and competitive players share the same data — they just want different levels of detail. A single codebase with conditional rendering (`isPro && <ExtraPanel />`) is maintainable, consistent, and lets users grow from casual to analytical without switching apps.

---

## 👤 Author

**Shivansh Khandelwal**
- GitHub: https://github.com/shivansh1907
- Email: 2023ume1733@mnit.ac.in
