import { motion } from "framer-motion";
import profileImg from "../assets/astro.png";
import S from "../assets/S.mp4";

const STATS = [
  { label: "Status", value: "B.Tech CSE" },
  { label: "Core", value: "DSA in Java" },
  { label: "Exploring", value: "AI / ML" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, amount: 0.4 },
};

const slideLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, amount: 0.4 },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden py-20 px-6 md:px-10"
    >
      <video
        aria-hidden="true"
        src={S}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none filter blur-sm z-0"
      />
      {/* Floating blobs */}
      {[
        {
          top: "10%",
          left: "0",
          size: 360,
          delay: "0s",
          colors: "from-[#302663] via-[#0bf8] to-[#1cd8d2]",
        },
        {
          bottom: "0",
          right: "10%",
          size: 420,
          delay: "300ms",
          colors: "from-[#302663] via-[#0bf8] to-[#1cd8d2]",
        },
        {
          top: "50%",
          left: "50%",
          size: 220,
          delay: "0s",
          colors: "from-[#302663] via-[#0bf8] to-[#1cd8d2]",
        },
      ].map((b, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full animate-pulse"
          style={{
            top: b.top,
            left: b.left,
            bottom: b.bottom,
            right: b.right,
            width: b.size,
            height: b.size,
            opacity: i === 2 ? 0.1 : 0.2,
            filter: "blur(120px)",
            animationDelay: b.delay,
            background: `linear-gradient(to right, #302663, #0bf8, #1cd8d2)`,
          }}
        />
      ))}

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-10">
        {/* ── LEFT — Card ──────────────────────────────────────── */}
        <motion.div
          {...slideLeft}
          className="flex flex-col items-center md:items-start gap-6 md:w-1/2"
        >
          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl w-40 h-40 md:w-52 md:h-52
              border border-[#1cd8d2]/25 bg-gradient-to-br from-[#1cd8d2]/20 to-[#302663]/20"
          >
            <img
              src={profileImg}
              alt="Shivam Keshari"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              loading="lazy"
            />
          </motion.div>

          {/* Name + role */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Shivam Keshari
            </h2>
            <p className="mt-2 text-lg text-white/90 font-semibold">
              CSE Student &middot; Aspiring SDE
            </p>
            <p className="mt-3 text-sm text-gray-400 max-w-xs leading-relaxed">
              Strengthening my fundamentals through DSA, building with React,
              and applying ML to real problems — one project at a time.
            </p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xs">
            {STATS.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
              >
                <p className="text-xs text-gray-400">{label}</p>
                <p className="font-semibold text-white mt-0.5">{value}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-white
                bg-gradient-to-r from-pink-500 to-blue-500 shadow-lg hover:scale-105 transition-all duration-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-white/80
                border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>

        {/* ── RIGHT — About Me text ─────────────────────────────── */}
        <motion.div
          {...fadeUp}
          className="md:w-1/2 flex flex-col justify-center text-center md:text-left"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
            About Me
          </h3>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-4">
            I'm a B.Tech CSE student who started with frontend and backend
            basics — building projects like a LinkedIn Clone, Blog
            Management app, Expense Management system, and a few React/MERN
            apps (To-Do apps, Calculator, reusable React components) to get
            comfortable with the full stack.
          </p>
          <p className="text-gray-400 leading-relaxed text-base mt-2">
            From there I moved into AI/ML, building a Loan Approval
            prediction model and a CNN-based skin disease detection system.
            I don't have professional experience yet — what I have is
            consistent practice, a growing GitHub, and a strong focus on DSA
            in Java as I prepare for placements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}