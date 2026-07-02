import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "../../utils/data";

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="achievements"
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
          <p className="section-label">Achievements</p>
          <h2 className="section-title">Recognition</h2>
          <div className="section-divider" />
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="card p-5 flex items-start gap-4"
              style={{
                borderLeft: `2px solid ${item.color}`,
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{
                  background: `${item.color}14`,
                  border: `1px solid ${item.color}33`,
                }}
              >
                {item.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3
                    className="font-display font-semibold text-sm leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="font-mono text-xs flex-shrink-0"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.year}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
