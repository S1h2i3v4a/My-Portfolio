import { useRef, useState, useEffect, useMemo } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
const experiences = [
  {
    role: "Full Stack Developer",
    company: "BenrMents",
    duration: "2022 – Present",
    description:
      "Built and maintained scalable web applications using React, Node.js, and PostgreSQL. Collaborated closely with design and product teams to ship high-quality features on tight timelines.",
  },
  {
    role: "Frontend Engineer",
    company: "StudioX Labs",
    duration: "2021 – 2022",
    description:
      "Led the migration of a legacy jQuery codebase to modern React. Improved page performance by 40% through code splitting, lazy loading, and asset optimization.",
  },
  {
    role: "Junior Developer",
    company: "CodeCraft Agency",
    duration: "2020 – 2021",
    description:
      "Developed responsive landing pages and e-commerce storefronts. Worked directly with clients to translate design mockups into pixel-perfect implementations.",
  },
];

// ─── Mobile detection hook ────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── Sub-component: one experience card ──────────────────────────────────────
function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [30, 0]);
  const x = useTransform(scrollYProgress, [start, end], [-2, 0]);

  const isDesktop = layout === "desktop";
  const isEven = idx % 2 === 0;

  return (
    <motion.article
      style={
        isDesktop
          ? { opacity, y, position: "absolute", bottom: isEven ? 12 : undefined, top: isEven ? undefined : 12 }
          : { opacity, x }
      }
      className={
        isDesktop
          ? `w-[320px] rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-sm p-7 shadow-lg transition-all duration-[400ms]`
          : `w-[90vw] max-w-sm rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-sm p-5 shadow-lg ml-6 transition-all duration-[400ms]`
      }
    >
      <h3 className="text-lg font-semibold break-words">{exp.role}</h3>
      <p className="text-sm text-gray-400 mt-1 mb-3">
        {exp.company} · {exp.duration}
      </p>
      <p className="text-sm text-gray-300 leading-relaxed break-words">{exp.description}</p>
    </motion.article>
  );
}

// ─── Desktop layout ───────────────────────────────────────────────────────────
function DesktopTimeline({ scrollYProgress, thresholds, lineSize }) {
  return (
    <div className="relative flex justify-between items-center min-w-0 w-full max-w-7xl">
      {/* Faint guide line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-white/10" />

      {/* Animated progress line */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-white origin-left"
        style={{ width: lineSize }}
      />

      {/* Items */}
      {experiences.map((exp, i) => (
        <div key={i} className="relative flex flex-col items-center">
          {/* Dot */}
          <motion.div
            className="relative z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.07)]"
            style={{ scale: useTransform(scrollYProgress, [thresholds[i] - 0.15, thresholds[i]], [0.6, 1]), opacity: useTransform(scrollYProgress, [thresholds[i] - 0.15, thresholds[i]], [0.3, 1]) }}
          />
          {/* Card above / below alternating */}
          <ExperienceItem
            exp={exp}
            idx={i}
            start={i === 0 ? 0 : thresholds[i - 1]}
            end={thresholds[i]}
            scrollYProgress={scrollYProgress}
            layout="desktop"
          />
        </div>
      ))}
    </div>
  );
}

// ─── Mobile layout ────────────────────────────────────────────────────────────
function MobileTimeline({ scrollYProgress, thresholds, lineSize }) {
  return (
    <div className="relative flex flex-col gap-10 w-full max-w-md ml-10">
      {/* Faint guide line (vertical) */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-white/10" />
      {/* Animated progress line */}
      <motion.div
        className="absolute left-0 top-0 w-[3px] rounded-full bg-white origin-top"
        style={{ height: lineSize }}
      />

      {experiences.map((exp, i) => (
        <div key={i} className="relative flex items-start">
          {/* Dot */}
          <div className="absolute -left-[22px] top-3 z-10 w-6 h-6 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.07)]" />
          <ExperienceItem
            exp={exp}
            idx={i}
            start={i === 0 ? 0 : thresholds[i - 1]}
            end={thresholds[i]}
            scrollYProgress={scrollYProgress}
            layout="mobile"
          />
        </div>
      ))}
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Experience() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    []
  );

  // Convert 0–1 progress to a CSS percentage width/height
  const sceneHeight = isMobile ? 160 * experiences.length : 120 * experiences.length;

  const lineSize = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ height: `${sceneHeight}vh`, minHeight: `${120 * experiences.length}px` }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Ambient blobs */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: "10%", left: "-5%",
            width: 340, height: 340,
            background: "linear-gradient(135deg, #1cd8d2, #302b63)",
            opacity: 0.14,
            filter: "blur(130px)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: "5%", right: "-5%",
            width: 300, height: 300,
            background: "linear-gradient(135deg, #302b63, #0bf8)",
            opacity: 0.12,
            filter: "blur(110px)",
          }}
        />

        <motion.h2
          className="relative z-10 text-4xl sm:text-5xl font-bold mt-5 mb-16 text-center bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(135deg, #1cd8d2, #0bf8, #302b63)" }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <div className="relative z-10 w-full flex justify-center px-4">
          {isMobile ? (
            <MobileTimeline
              scrollYProgress={scrollYProgress}
              thresholds={thresholds}
              lineSize={lineSize}
            />
          ) : (
            <DesktopTimeline
              scrollYProgress={scrollYProgress}
              thresholds={thresholds}
              lineSize={lineSize}
            />
          )}
        </div>
      </div>
    </section>
  );
}