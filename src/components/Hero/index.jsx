import { motion } from "framer-motion";
import { Download, Mail, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import HeroCanvas from "./HeroCanvas";
import { personalInfo } from "../../utils/data";

const TITLES = personalInfo.title;

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 70);
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 35);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, titleIndex]);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Three.js Background */}
      <HeroCanvas />

      {/* Subtle radial tint — single color only */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 65% 45%, rgba(79,158,255,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-24">

          {/* Left — text */}
          <div>
            {/* Small label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-mono text-xs mb-5 tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Portfolio · 2025
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="font-display font-black leading-none mb-5"
              style={{
                fontSize: "clamp(3rem, 8vw, 5.5rem)",
                color: "var(--text-primary)",
              }}
            >
              Sampath<br />
              <span style={{ color: "var(--accent)" }}>Raj.</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mb-6 h-7"
            >
              <span
                className="font-mono text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {displayText}
              </span>
              <span
                className="inline-block w-0.5 h-4 animate-pulse rounded"
                style={{ background: "var(--accent)" }}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base leading-relaxed mb-10 max-w-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary"
              >
                <Mail size={15} />
                Hire Me
              </button>
              <a
                href={personalInfo.resume}
                download
                className="btn-outline"
              >
                <Download size={15} />
                Resume
              </a>
            </motion.div>

            {/* Social links — clean text, no boxes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex gap-6"
            >
              {[
                { label: "GitHub", href: personalInfo.github },
                { label: "LinkedIn", href: personalInfo.linkedin },
                { label: "Email", href: `mailto:${personalInfo.email}` },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  {s.label} ↗
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — clean info card instead of orbiting badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="hidden lg:block"
          >
            <div
              className="card p-8"
              style={{ borderColor: "var(--accent-border)" }}
            >
              {/* Quick stats row */}
              <div className="grid grid-cols-2 gap-px mb-6" style={{ background: "var(--border)" }}>
                {[
                  { label: "Projects", value: "6+" },
                  { label: "Technologies", value: "15+" },
                  { label: "Certifications", value: "8+" },
                  { label: "Hackathons", value: "5+" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center py-5 px-3"
                    style={{ background: "var(--bg-primary)" }}
                  >
                    <p
                      className="font-display font-black text-3xl mb-1"
                      style={{ color: "var(--accent)" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="font-mono text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Focus areas */}
              <p
                className="font-mono text-xs mb-3 uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                Focus Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Machine Learning",
                  "Computer Vision",
                  "Full Stack",
                  "Embedded Systems",
                  "AWS Cloud",
                  "IoT",
                ].map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Location + status */}
              <div
                className="mt-6 pt-5 flex items-center justify-between"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    style={{ boxShadow: "0 0 6px #4ade80" }}
                  />
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Open to work
                  </span>
                </div>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  Tamil Nadu, India
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-40 hover:opacity-80 transition-opacity"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <ArrowDown size={16} style={{ color: "var(--text-secondary)" }} />
      </motion.button>
    </section>
  );
}
