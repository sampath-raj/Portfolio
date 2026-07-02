import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "../../utils/data";

const TYPE_LABELS = {
  Internship:   "Internship",
  Certification: "Cert",
  Workshop:     "Workshop",
  Hackathon:    "Hackathon",
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14"
        >
          <p className="section-label">Experience</p>
          <h2 className="section-title">Journey so far</h2>
          <div className="section-divider" />
        </motion.div>

        {/* Timeline — left-aligned, consistent */}
        <div className="relative pl-6">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{ background: "var(--border)" }}
          />

          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="relative mb-8 last:mb-0"
            >
              {/* Timeline node */}
              <div
                className="absolute -left-6 top-5 w-2.5 h-2.5 rounded-full border-2"
                style={{
                  borderColor: item.color,
                  background: "var(--bg-secondary)",
                  transform: "translateX(-4px)",
                }}
              />

              {/* Card */}
              <div
                className="card p-5 hover:border-[var(--border-hover)] transition-colors"
                style={{ borderLeft: `2px solid ${item.color}` }}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3
                      className="font-display font-semibold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-mono text-xs mt-0.5"
                      style={{ color: item.color }}
                    >
                      {item.organization}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className="px-2 py-0.5 rounded font-mono text-xs"
                      style={{
                        background: `${item.color}18`,
                        border: `1px solid ${item.color}44`,
                        color: item.color,
                      }}
                    >
                      {TYPE_LABELS[item.type] || item.type}
                    </span>
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.duration}
                    </span>
                  </div>
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
