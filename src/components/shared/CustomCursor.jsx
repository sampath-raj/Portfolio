import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      requestAnimationFrame(animateRing);
    };

    const handleEnter = () => {
      ring.style.width = "50px";
      ring.style.height = "50px";
      ring.style.borderColor = "rgba(123,47,255,0.8)";
      ring.style.background = "rgba(123,47,255,0.1)";
    };

    const handleLeave = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(0,212,255,0.6)";
      ring.style.background = "transparent";
    };

    window.addEventListener("mousemove", moveCursor);
    animateRing();

    const clickables = document.querySelectorAll("a, button, [role='button'], input, textarea, select, .tilt-card");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: "var(--neon-cyan)",
          boxShadow: "0 0 10px var(--neon-cyan)",
          transition: "transform 0.05s linear",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 pointer-events-none z-[9998]"
        style={{
          borderColor: "rgba(0,212,255,0.6)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s, background 0.2s",
        }}
      />
    </>
  );
}
