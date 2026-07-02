import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personalInfo } from "../../utils/data";
import { Mail, Phone, ExternalLink, GitFork, MapPin, Send, CheckCircle } from "lucide-react";

const contactItems = [
  {
    icon: <Mail size={16} />,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: <Phone size={16} />,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
  },
  {
    icon: <ExternalLink size={16} />,
    label: "LinkedIn",
    value: "linkedin.com/in/sampathraj",
    href: personalInfo.linkedin,
  },
  {
    icon: <GitFork size={16} />,
    label: "GitHub",
    value: "github.com/sampathraj",
    href: personalInfo.github,
  },
  {
    icon: <MapPin size={16} />,
    label: "Location",
    value: personalInfo.location,
    href: null,
  },
];

function Field({ label, error, children }) {
  return (
    <div>
      <label
        className="block font-mono text-xs mb-1.5"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs mt-1 font-mono">{error}</p>
      )}
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!formData.subject.trim()) e.subject = "Subject is required";
    if (formData.message.length < 10) e.message = "Message is too short";
    return e;
  };

  const handleChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) { setErrors(v); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1400);
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontFamily: "'Inter', sans-serif",
    background: "var(--bg-primary)",
    border: `1px solid ${errors[field] ? "rgba(248,113,113,0.5)" : "var(--border)"}`,
    color: "var(--text-primary)",
    outline: "none",
    transition: "border-color 0.2s ease",
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-14"
        >
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's talk</h2>
          <div className="section-divider mb-4" />
          <p className="text-base" style={{ color: "var(--text-secondary)" }}>
            Open to opportunities, collaborations, and good conversations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left — contact details */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className="flex flex-col gap-2 mb-8">
              {contactItems.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3.5 rounded-lg transition-all duration-200 group"
                    style={{
                      border: "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--bg-card)";
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <span style={{ color: "var(--accent)" }}>{item.icon}</span>
                    <div>
                      <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {item.label}
                      </p>
                      <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                        {item.value}
                      </p>
                    </div>
                    <span
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      ↗
                    </span>
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-3.5"
                  >
                    <span style={{ color: "var(--text-muted)" }}>{item.icon}</span>
                    <div>
                      <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {item.label}
                      </p>
                      <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Status */}
            <div
              className="flex items-center gap-3 p-4 rounded-lg"
              style={{
                background: "rgba(74,222,128,0.06)",
                border: "1px solid rgba(74,222,128,0.2)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
                style={{ boxShadow: "0 0 6px #4ade80" }}
              />
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Currently{" "}
                <span style={{ color: "#4ade80", fontWeight: 500 }}>
                  open to work
                </span>{" "}
                — Response within 24h
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" error={errors.name}>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    style={inputStyle("name")}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent-border)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.name
                        ? "rgba(248,113,113,0.5)"
                        : "var(--border)")
                    }
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    style={inputStyle("email")}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent-border)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.email
                        ? "rgba(248,113,113,0.5)"
                        : "var(--border)")
                    }
                  />
                </Field>
              </div>

              <Field label="Subject" error={errors.subject}>
                <input
                  type="text"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  style={inputStyle("subject")}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent-border)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.subject
                      ? "rgba(248,113,113,0.5)"
                      : "var(--border)")
                  }
                />
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  placeholder="Your message..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  style={{ ...inputStyle("message"), resize: "vertical" }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--accent-border)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.message
                      ? "rgba(248,113,113,0.5)"
                      : "var(--border)")
                  }
                />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary justify-center py-3 mt-1"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2.5 p-3.5 rounded-lg"
                    style={{
                      background: "rgba(74,222,128,0.08)",
                      border: "1px solid rgba(74,222,128,0.3)",
                    }}
                  >
                    <CheckCircle size={16} style={{ color: "#4ade80" }} />
                    <span className="text-sm" style={{ color: "#4ade80" }}>
                      Message sent! I'll get back to you within 24 hours.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-20 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            © 2025 Sampath Raj · Built with React, Three.js & Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
