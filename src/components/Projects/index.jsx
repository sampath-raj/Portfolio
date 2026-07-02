import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "../../utils/data";
import { GitFork, ExternalLink } from "lucide-react";

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card flex flex-col overflow-hidden"
      style={{
        borderColor: hovered ? `${project.color}55` : "var(--border)",
        transition: "border-color 0.25s ease, transform 0.2s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5"
        style={{
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.25s",
        }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="text-2xl"
            role="img"
            aria-label={project.title}
          >
            {project.icon}
          </span>
          <span
            className="px-2 py-0.5 rounded font-mono text-xs"
            style={{
              background: `${project.color}14`,
              border: `1px solid ${project.color}40`,
              color: project.color,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-semibold text-base mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-5 flex-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded font-mono text-xs"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          className="flex gap-4 pt-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = project.color)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <GitFork size={13} />
            Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = project.color)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <ExternalLink size={13} />
            Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    "AI / Computer Vision",
    "AI / IoT",
    "Full Stack",
    "AI / Full Stack",
  ];
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-10"
        >
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I've built</h2>
          <div className="section-divider" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200"
              style={{
                background:
                  filter === cat ? "var(--accent-dim)" : "transparent",
                border: `1px solid ${
                  filter === cat ? "var(--accent-border)" : "var(--border)"
                }`,
                color:
                  filter === cat ? "var(--accent)" : "var(--text-muted)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
