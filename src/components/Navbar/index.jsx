import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Command } from "lucide-react";

const navLinks = [
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Experience",   href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar({ darkMode, toggleDarkMode, onOpenPalette }) {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.35 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,15,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <button
              onClick={() => scrollTo("#home")}
              className="font-display font-black text-lg tracking-tight transition-opacity hover:opacity-75"
              style={{ color: "var(--text-primary)" }}
            >
              SR<span style={{ color: "var(--accent)" }}>.</span>
            </button>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="relative px-3 py-1.5 text-sm transition-colors duration-200 rounded-md"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--text-secondary)",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-md"
                        style={{
                          background: "var(--accent-dim)",
                          border: "1px solid var(--accent-border)",
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* ⌘K hint — desktop only */}
              <button
                onClick={onOpenPalette}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
                title="Open command palette (Ctrl+K)"
              >
                <Command size={11} />
                <span>K</span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg transition-all duration-200"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
                aria-label="Toggle light/dark mode"
              >
                {darkMode ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* Hire me — desktop */}
              <button
                onClick={() => scrollTo("#contact")}
                className="hidden sm:block btn-primary text-sm"
              >
                Hire Me
              </button>

              {/* Burger — mobile */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
                aria-label="Toggle mobile menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-[99] md:hidden"
            style={{
              background: "var(--bg-secondary)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-2.5 text-base transition-colors"
                  style={{
                    color:
                      activeSection === link.href.slice(1)
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: activeSection === link.href.slice(1) ? 600 : 400,
                  }}
                >
                  {link.label}
                </button>
              ))}
              <div
                className="pt-3 mt-2 flex gap-2"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <button
                  onClick={() => { scrollTo("#contact"); }}
                  className="btn-primary flex-1 justify-center text-sm"
                >
                  Hire Me
                </button>
                <button
                  onClick={onOpenPalette}
                  className="btn-outline flex items-center gap-1.5 text-sm px-3"
                >
                  <Command size={13} /> K
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
