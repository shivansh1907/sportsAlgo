import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ClipsFeed from './pages/clips';
import MatchSummary from './pages/Matchsum.jsx';
import Career from './pages/Career.jsx';
import NavBar from './components/layouts/Navbar';
import { ModeProvider } from './hooks/useMode';
import { ThemeProvider } from './hooks/useTheme';
import Leaderboard from './pages/LeaderBoard';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <ModeProvider>
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">

          {/* Screens — this part swaps */}
          <div className="max-w-[790px] mx-auto pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home onClipsClick={()=>navigate('/clips')} />} />
              <Route path="/matchsummary" element={<MatchSummary />} />
              <Route path="/clips" element={<ClipsFeed />} />
              <Route path="/progress" element={<Career />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>

          {/* NavBar — always visible, outside Routes */}
          <NavBar />

        </div>
      </ModeProvider>
    </ThemeProvider>
  );
}

export default App;
