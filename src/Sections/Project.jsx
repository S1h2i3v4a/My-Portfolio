import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import {
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  motion,
} from "framer-motion";

// Replace these imports with your actual project screenshots
import img1 from "../assets/img1.svg";
import img2 from "../assets/img2.svg";
import img3 from "../assets/img3.svg";
import photo1 from "../assets/photo1.svg";
import photo2 from "../assets/photo2.svg";
import photo3 from "../assets/photo3.svg";

// ─── Custom hook: detect mobile ──────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── Project data ─────────────────────────────────────────────────────────────
const projects = [
  {
    title: "NK Studio",
    link: "https://www.nk.studio",
    bgColor: "#0d4d3d",
    image: (isMobile) => (isMobile ? photo1 : img1),
  },
  {
    title: "Gamely",
    link: "https://gamely.app",
    bgColor: "#1a1340",
    image: (isMobile) => (isMobile ? photo2 : img2),
  },
  {
    title: "Hungry Tiger",
    link: "https://hungrytiger.io",
    bgColor: "#3d1a00",
    image: (isMobile) => (isMobile ? photo3 : img3),
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Thresholds: 0→⅓→⅔→1
  const thresholds = useMemo(
    () => projects.map((_, i) => (i + 1) / projects.length),
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        minHeight: `${120 * projects.length}px`,
      }}
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center transition-colors duration-[400ms] overflow-hidden"
        style={{ backgroundColor: activeProject.bgColor }}
      >
        {/* Heading */}
        <h2 className="z-10 text-3xl font-semibold mb-8 tracking-tight text-white/90">
          My Work
        </h2>

        {/* Display area */}
        <div
          className="relative w-[85%] max-w-[1200px]"
          style={{ position: "relative" }}
        >
          {/* Dark overlay gradient (bottom) */}
          <div
            className="absolute inset-0 z-[11] pointer-events-none rounded-xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.4) 40%)",
            }}
          />

          {projects.map((p, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={p.title}
                className="absolute top-1/2 left-1/2 transition-all duration-500"
                style={{
                  transform: "translate(-50%, -50%)",
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 10 : 0,
                }}
              >
                <img
                  src={p.image(isMobile)}
                  alt={p.title}
                  className="rounded-xl shadow-2xl object-cover"
                  style={{
                    height: isMobile ? "62vh" : "66vh",
                    width: "auto",
                    maxWidth: "90vw",
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    loading: "lazy",
                  }}
                />
              </div>
            );
          })}

          {/* Static size placeholder */}
          <div
            style={{ height: isMobile ? "62vh" : "66vh", visibility: "hidden" }}
          >
            <img
              src={projects[0].image(isMobile)}
              alt=""
              className="h-full w-auto"
            />
          </div>
        </div>

        {/* Animated title */}
        <div className="relative z-20 mt-6 h-10 overflow-hidden w-full flex justify-center">
          {projects.map((p, idx) => (
            <span
              key={p.title}
              className="absolute text-lg sm:text-xl font-semibold text-white transition-all duration-500"
              style={{
                opacity: idx === activeIndex ? 1 : 0,
                transform:
                  idx === activeIndex ? "translateY(0)" : "translateY(30px)",
              }}
            >
              {p.title}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href={activeProject.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${activeProject.title}`}
          className="mt-6 z-20 inline-flex items-center justify-center px-5 py-3 rounded-lg
                     bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          View Project
        </a>

        {/* Dot indicators */}
        <div className="absolute bottom-8 flex gap-3 z-20">
          {projects.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background:
                  i === activeIndex ? "#fff" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
