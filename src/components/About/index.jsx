import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, stats, education } from "../../utils/data";
import { MapPin, GraduationCap, Cpu, Code2, Brain } from "lucide-react";

const highlights = [
  { icon: <Brain size={16} />, label: "AI & Machine Learning" },
  { icon: <Code2 size={16} />, label: "Full Stack Development" },
  { icon: <Cpu size={16} />, label: "Embedded Systems" },
  { icon: <GraduationCap size={16} />, label: "B.E CSE — AI & ML" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          {...fadeUp(0)}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14"
        >
          <p className="section-label">About</p>
          <h2 className="section-title">
            Who I am
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio + highlights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              {personalInfo.bio} I thrive at the intersection of{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                artificial intelligence
              </span>{" "}
              and{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                practical engineering
              </span>
              , turning complex problems into things that actually work.
            </p>

            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "var(--text-secondary)" }}
            >
              I started with embedded systems — wiring Raspberry Pi sensors, building IoT gadgets — and evolved into full-stack and ML. That hands-on background is what makes me different: I understand the hardware underneath the software.
            </p>

            {/* Focus tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>{h.icon}</span>
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {h.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats row — clean numbers, no glow */}
            <div
              className="grid grid-cols-4 gap-4 py-6"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p
                    className="stat-num font-display font-black text-2xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s.value}
                    <span style={{ color: "var(--accent)" }}>{s.suffix}</span>
                  </p>
                  <p
                    className="font-mono text-xs mt-1 leading-tight"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — profile card + education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-6"
          >
            {/* Profile card */}
            <div
              className="card p-6 flex items-center gap-5 mb-6"
              style={{
                borderColor: "var(--accent-border)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Avatar — static, no spinning */}
              <div
                className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center text-4xl"
                style={{
                  background: "var(--accent-dim)",
                  border: "1px solid var(--accent-border)",
                }}
              >
                👨‍💻
              </div>
              <div>
                <h3
                  className="font-display font-bold text-lg"
                  style={{ color: "var(--text-primary)" }}
                >
                  {personalInfo.name}
                </h3>
                <p
                  className="font-mono text-xs mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  AI & ML Engineer
                </p>
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} style={{ color: "var(--text-muted)" }} />
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {personalInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <p
                className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Education
              </p>
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="card p-5"
                  style={{ borderLeft: "2px solid var(--accent)" }}
                >
                  <h4
                    className="font-display font-semibold text-sm mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {edu.degree}
                  </h4>
                  <p
                    className="font-mono text-xs mb-1"
                    style={{ color: "var(--accent)" }}
                  >
                    {edu.institution}
                  </p>
                  <p
                    className="font-mono text-xs mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {edu.year}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
