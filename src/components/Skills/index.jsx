import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skills } from "../../utils/data";

const CATEGORIES = Object.keys(skills);

function SkillRow({ skill, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-4 py-2.5"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <span
        className="text-sm w-36 flex-shrink-0"
        style={{ color: "var(--text-primary)" }}
      >
        {skill.name}
      </span>
      <div
        className="flex-1 h-1 rounded-full overflow-hidden"
        style={{ background: "var(--border)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: delay + 0.15, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: skill.color }}
        />
      </div>
      <span
        className="font-mono text-xs w-8 text-right flex-shrink-0"
        style={{ color: "var(--text-muted)" }}
      >
        {skill.level}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("Languages");

  const categorySkills = skills[active] || [];

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14"
        >
          <p className="section-label">Skills</p>
          <h2 className="section-title">What I work with</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left — category sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Category
            </p>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    background:
                      active === cat ? "var(--accent-dim)" : "transparent",
                    color:
                      active === cat ? "var(--accent)" : "var(--text-secondary)",
                    border:
                      active === cat
                        ? "1px solid var(--accent-border)"
                        : "1px solid transparent",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* All tech tags — quick scan */}
            <div className="mt-10">
              <p
                className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                All Tech
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Object.values(skills)
                  .flat()
                  .map((s) => (
                    <span
                      key={s.name}
                      className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {s.name}
                    </span>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* Right — skill bars */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-1" style={{ borderBottom: "1px solid var(--border)" }}>
                  <span className="font-mono text-xs pb-2" style={{ color: "var(--text-muted)" }}>Skill</span>
                  <span className="font-mono text-xs pb-2" style={{ color: "var(--text-muted)" }}>%</span>
                </div>
                {categorySkills.map((skill, i) => (
                  <SkillRow
                    key={skill.name}
                    skill={skill}
                    inView={inView}
                    delay={0.1 + i * 0.07}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
