import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

// Import your icons from react-icons (or replace with SVG/img tags)
// Example: import { FaReact } from "react-icons/fa";
// For now we use emoji as placeholders — swap with real icons as needed.

const skillSet = [
  { name: "React",      icon: "⚛️" },
  { name: "Next.js",   icon: "▲" },
  { name: "TypeScript",icon: "📘" },
  { name: "Node.js",   icon: "🟩" },
  { name: "MongoDB",   icon: "🍃" },
  { name: "PostgreSQL",icon: "🐘" },
  { name: "TailwindCSS",icon: "🌊" },
  { name: "Docker",    icon: "🐳" },
  { name: "Python",    icon: "🐍" },
  { name: "Java",      icon: "☕" },
  { name: "Redis",     icon: "🔴" },
  { name: "GraphQL",   icon: "◈" },
];

// Duplicate for seamless loop
const repeated = [...skillSet, ...skillSet, ...skillSet];

function SkillMarquee({ dir = -1, speed = 80, delay = 0 }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const dirRef = useRef(dir);

  // Track scroll direction
  useEffect(() => {
    const handler = (e) => {
      dirRef.current = e.deltaY > 0 ? -1 : 1;
    };
    window.addEventListener("wheel", handler);
    window.addEventListener("touchmove", handler);
    return () => {
      window.removeEventListener("wheel", handler);
      window.removeEventListener("touchmove", handler);
    };
  }, []);

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el) return;
    const loopWidth = el.scrollWidth / 2;
    const next = x.get() + dirRef.current * speed * (delta / 1000);
    if (next <= -loopWidth) x.set(next + loopWidth);
    else if (next >= 0) x.set(next - loopWidth);
    else x.set(next);
  });

  return (
    <div className="relative w-full overflow-hidden" style={{ animationDelay: `${delay}ms` }}>
      <motion.div
        ref={trackRef}
        className="flex gap-10 will-change-transform"
        style={{ x, whiteSpace: "nowrap" }}
      >
        {repeated.map((s, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 min-w-[120px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center
                       hover:scale-125 transition-transform duration-300 cursor-default"
          >
            <span className="text-6xl leading-none select-none">{s.icon}</span>
            <p className="text-sm text-white/80">{s.name}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full h-[50vh] flex flex-col items-center justify-center bg-black text-white overflow-hidden pb-8"
    >
      {/* Ambient blobs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "25%", left: 0,
          width: 300, height: 300,
          background: "linear-gradient(135deg, #302b63, #0bf8)",
          opacity: 0.18,
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: "10%", right: 0,
          width: 420, height: 420,
          background: "linear-gradient(135deg, #1cd8d2, #302b63)",
          opacity: 0.13,
          filter: "blur(140px)",
          animationDelay: "500ms",
        }}
      />

      {/* Heading */}
      <motion.h2
        className="relative z-10 text-4xl sm:text-5xl font-bold mt-5 mb-8 text-center bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(135deg, #1cd8d2, #0bf8, #302b63)",
          zIndex: 10,
        }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        My Skills
      </motion.h2>

      <motion.p
        className="relative z-10 text-white/70 text-base sm:text-lg mb-10 text-center"
        initial={{ opacity: -10, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Modern Applications · Modern Technologies
      </motion.p>

      {/* Marquee rows */}
      <div className="relative w-full z-10 flex flex-col gap-6">
        <SkillMarquee dir={-1} speed={70} delay={0} />
      </div>
    </section>
  );
}