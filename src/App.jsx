import React, { useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import CustomCursor from './components/CustomCursor';
import TerminalMode from './components/TerminalMode';
import ScrollTrace from './components/ScrollTrace';
import ParticlesBackground from './components/ParticlesBackground';
import EasterEggs from './components/EasterEggs';
import GravityMode from './components/GravityMode';

// Routing
import { Routes, Route } from 'react-router-dom';

// Pages
import MainPortfolio from './pages/MainPortfolio';
import Docs from './pages/Docs';

function App() {
  useEffect(() => {
    console.log(
      "%c" +
      "  _  __     _ _           _     \n" +
      " | |/ /    (_) |         | |    \n" +
      " | ' / __ _ _| | __ _ ___| |__  \n" +
      " |  < / _` | | |/ _` / __| '_ \\ \n" +
      " | . \\ (_| | | | (_| \\__ \\ | | |\n" +
      " |_|\\_\\__,_|_|_|\\__,_|___/_| |_|\n" +
      "                                \n" +
      "%c[SYSTEM] Unauthorized access detected...\n" +
      "%cJust kidding! If you're looking at this, you're exactly the kind of person I want to work with.\nLet's talk! 😉",
      "color: #ff6b00; font-weight: bold; font-family: monospace; font-size: 14px;",
      "color: #ff0000; font-weight: bold; font-size: 16px; margin-top: 10px;",
      "color: #00ff00; font-size: 14px; margin-top: 5px;"
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-dark text-text-primary selection:bg-primary selection:text-white relative">
      <ParticlesBackground />
      <CustomCursor />
      <ScrollTrace />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>

      <div className="relative z-10">
        <Footer />
      </div>
      <TerminalMode />
      <EasterEggs />
      <GravityMode />
    </div>
  );
}

export default App;
