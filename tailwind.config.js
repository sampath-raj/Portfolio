/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "neon-cyan": "#00d4ff",
        "neon-purple": "#7b2fff",
        "neon-pink": "#ff00c8",
        "neon-green": "#00ff88",
        "space-black": "#020010",
        "space-dark": "#06001a",
        "space-mid": "#0d0025",
        "glass-white": "rgba(255,255,255,0.05)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Outfit", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "orbit": "orbit 10s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "fadeInUp": "fadeInUp 0.8s ease forwards",
        "slideInLeft": "slideInLeft 0.8s ease forwards",
        "typewriter": "typewriter 3s steps(30) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,212,255,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(0,212,255,0.8), 0 0 80px rgba(0,212,255,0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(40px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: 0, transform: "translateX(-60px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "neon-cyan": "0 0 30px rgba(0,212,255,0.5)",
        "neon-purple": "0 0 30px rgba(123,47,255,0.5)",
        "neon-pink": "0 0 30px rgba(255,0,200,0.5)",
        "glass": "0 8px 32px 0 rgba(0,0,0,0.37)",
      },
    },
  },
  plugins: [],
};
