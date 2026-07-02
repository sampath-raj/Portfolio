import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, Zap, Briefcase, Trophy, Mail, Download,
  Sun, Moon, Terminal, List, X,
} from "lucide-react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function buildCommands({ toggleDarkMode, darkMode }) {
  return [
    {
      id: "goto-home",
      label: "Go to Home",
      hint: "navigate",
      icon: <Home size={14} />,
      group: "Navigate",
      keywords: ["home", "top", "hero", "goto"],
      action: () =>
        document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "goto-about",
      label: "Go to About",
      hint: "navigate",
      icon: <User size={14} />,
      group: "Navigate",
      keywords: ["about", "who", "bio", "goto"],
      action: () =>
        document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "goto-skills",
      label: "Go to Skills",
      hint: "navigate",
      icon: <Zap size={14} />,
      group: "Navigate",
      keywords: ["skills", "tech", "stack", "languages", "goto"],
      action: () =>
        document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "goto-projects",
      label: "Go to Projects",
      hint: "navigate",
      icon: <Terminal size={14} />,
      group: "Navigate",
      keywords: ["projects", "work", "portfolio", "built", "goto"],
      action: () =>
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "goto-experience",
      label: "Go to Experience",
      hint: "navigate",
      icon: <Briefcase size={14} />,
      group: "Navigate",
      keywords: ["experience", "journey", "career", "internship", "goto"],
      action: () =>
        document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "goto-achievements",
      label: "Go to Achievements",
      hint: "navigate",
      icon: <Trophy size={14} />,
      group: "Navigate",
      keywords: ["achievements", "awards", "hackathon", "goto"],
      action: () =>
        document.querySelector("#achievements")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "goto-contact",
      label: "Go to Contact",
      hint: "navigate",
      icon: <Mail size={14} />,
      group: "Navigate",
      keywords: ["contact", "email", "reach", "hire", "goto"],
      action: () =>
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "download-resume",
      label: "Download Resume",
      hint: "↓ PDF",
      icon: <Download size={14} />,
      group: "Actions",
      keywords: ["resume", "cv", "download", "pdf"],
      action: () => {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Sampath_Raj_Resume.pdf";
        a.click();
      },
    },
    {
      id: "toggle-theme",
      label: darkMode ? "Switch to Light Mode" : "Switch to Dark Mode",
      hint: "theme",
      icon: darkMode ? <Sun size={14} /> : <Moon size={14} />,
      group: "Actions",
      keywords: ["theme", "dark", "light", "mode", "toggle"],
      action: toggleDarkMode,
    },
    {
      id: "open-email",
      label: "Send Email",
      hint: "mailto",
      icon: <Mail size={14} />,
      group: "Actions",
      keywords: ["email", "mail", "send", "contact"],
      action: () => window.open("mailto:sampathraj@example.com"),
    },
    {
      id: "list-sections",
      label: "List all sections",
      hint: "ls",
      icon: <List size={14} />,
      group: "Actions",
      keywords: ["ls", "list", "sections", "all", "show"],
      action: null, // handled specially — shows inline result
    },
  ];
}

function score(cmd, query) {
  if (!query) return 1;
  const q = query.toLowerCase();
  const label = cmd.label.toLowerCase();
  const keywords = cmd.keywords || [];

  if (label.startsWith(q)) return 3;
  if (label.includes(q)) return 2;
  if (keywords.some((k) => k.startsWith(q))) return 2;
  if (keywords.some((k) => k.includes(q))) return 1;
  return 0;
}

export default function CommandPalette({ open, onClose, toggleDarkMode, darkMode }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lsResult, setLsResult] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = buildCommands({ toggleDarkMode, darkMode });

  const filtered = commands
    .map((cmd) => ({ ...cmd, score: score(cmd, query) }))
    .filter((cmd) => cmd.score > 0)
    .sort((a, b) => b.score - a.score);

  // Group by category
  const grouped = filtered.reduce((acc, cmd) => {
    acc[cmd.group] = acc[cmd.group] || [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  // Flat list for keyboard nav
  const flat = filtered;

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setLsResult(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
    setLsResult(false);
  }, [query]);

  const runCommand = useCallback(
    (cmd) => {
      if (!cmd) return;
      if (cmd.id === "list-sections") {
        setLsResult(true);
        return;
      }
      cmd.action?.();
      onClose();
    },
    [onClose]
  );

  const handleKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      runCommand(flat[activeIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelectorAll(".palette-item")?.[activeIndex];
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="palette-backdrop"
            onClick={onClose}
          >
            {/* Panel — stop propagation so clicks inside don't close */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="palette-panel"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4" style={{ borderBottom: "1px solid var(--border)" }}>
                <Terminal size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type a command or search..."
                  className="palette-input"
                  style={{ padding: "14px 0" }}
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-1 rounded transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  aria-label="Close palette"
                >
                  <X size={14} />
                </button>
              </div>

              {/* ls result — special inline output */}
              {lsResult && (
                <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                  <p className="font-mono text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                    $ ls ./sections
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SECTIONS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          document.querySelector(`#${s.id}`)?.scrollIntoView({ behavior: "smooth" });
                          onClose();
                        }}
                        className="font-mono text-xs px-2.5 py-1 rounded transition-colors"
                        style={{
                          background: "var(--accent-dim)",
                          border: "1px solid var(--accent-border)",
                          color: "var(--accent)",
                        }}
                      >
                        {s.id}/
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              <div
                ref={listRef}
                className="overflow-y-auto"
                style={{ maxHeight: "340px" }}
              >
                {flat.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <p className="font-mono text-sm" style={{ color: "var(--text-muted)" }}>
                      No commands found for "{query}"
                    </p>
                  </div>
                )}

                {Object.entries(grouped).map(([group, cmds]) => (
                  <div key={group}>
                    <p
                      className="px-5 pt-3 pb-1 font-mono text-xs uppercase tracking-widest"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {group}
                    </p>
                    {cmds.map((cmd) => {
                      const flatIndex = flat.findIndex((c) => c.id === cmd.id);
                      const isActive = flatIndex === activeIndex;
                      return (
                        <button
                          key={cmd.id}
                          className={`palette-item w-full${isActive ? " active" : ""}`}
                          onMouseEnter={() => setActiveIndex(flatIndex)}
                          onClick={() => runCommand(cmd)}
                        >
                          <span
                            className="palette-item-icon"
                            style={{
                              background: isActive ? "var(--accent-dim)" : "var(--border)",
                              color: isActive ? "var(--accent)" : "var(--text-muted)",
                            }}
                          >
                            {cmd.icon}
                          </span>
                          <span className="palette-item-label">{cmd.label}</span>
                          <span className="palette-item-hint">{cmd.hint}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="px-5 py-2.5 flex items-center gap-4"
                style={{
                  borderTop: "1px solid var(--border)",
                  background: "var(--bg-primary)",
                }}
              >
                {[
                  { key: "↑↓", label: "navigate" },
                  { key: "↵", label: "run" },
                  { key: "Esc", label: "close" },
                ].map((k) => (
                  <span
                    key={k.key}
                    className="flex items-center gap-1.5 font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <kbd
                      className="px-1.5 py-0.5 rounded text-xs"
                      style={{
                        background: "var(--border)",
                        color: "var(--text-secondary)",
                        fontFamily: "inherit",
                      }}
                    >
                      {k.key}
                    </kbd>
                    {k.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
