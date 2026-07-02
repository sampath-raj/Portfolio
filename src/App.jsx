import { useState, useCallback, useEffect } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import ChatBot from "./components/ChatBot";
import CommandPalette from "./components/CommandPalette";
import MusicToggle from "./components/shared/MusicToggle";

export default function App() {
  const [loaded, setLoaded]       = useState(false);
  const [darkMode, setDarkMode]   = useState(true);
  const [paletteOpen, setPalette] = useState(false);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((d) => !d);
    document.documentElement.classList.toggle("light-mode");
  }, []);

  const openPalette  = useCallback(() => setPalette(true),  []);
  const closePalette = useCallback(() => setPalette(false), []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className={darkMode ? "" : "light-mode"}>
      {/* Loading screen */}
      {!loaded && <Loader onComplete={handleLoaded} />}

      {/* Main content */}
      {loaded && (
        <>
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onOpenPalette={openPalette}
          />

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Achievements />
            <Contact />
          </main>

          {/* Floating widgets */}
          <ChatBot />
          <MusicToggle />

          {/* Command Palette */}
          <CommandPalette
            open={paletteOpen}
            onClose={closePalette}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
        </>
      )}
    </div>
  );
}
