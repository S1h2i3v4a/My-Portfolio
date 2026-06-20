import { motion } from "framer-motion";
import S from "../assets/S.mp4"

// All social icons as inline SVGs — zero dependency on any icon
// package, so there's no risk of import-name mismatches ever again.
const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.05a4.28 4.28 0 0 0-7.29 3.9 12.14 12.14 0 0 1-8.82-4.47 4.28 4.28 0 0 0 1.32 5.71 4.25 4.25 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.98A8.59 8.59 0 0 1 2 18.57a12.1 12.1 0 0 0 6.56 1.92c7.87 0 12.18-6.52 12.18-12.18 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.13-2.22-.77.34-1.6.57-2.4.67z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V10.1H5.67v8.24h2.67zM7 8.94a1.54 1.54 0 1 0 0-3.08 1.54 1.54 0 0 0 0 3.08zM18.34 18.34v-4.45c0-2.38-1.27-3.49-2.97-3.49a2.56 2.56 0 0 0-2.32 1.28h-.04V10.1H10.4c.04.75 0 8.24 0 8.24h2.67v-4.6c0-.25.02-.49.09-.67.2-.49.65-1 1.4-1 .99 0 1.38.75 1.38 1.86v4.41h2.4z" />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
);

const socials = [
  { icon: TwitterIcon, label: "Twitter", href: "https://twitter.com" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: GithubIcon, label: "GitHub", href: "https://github.com" },
];

const glowVariants = {
  initial: { scale: 1, y: 0 },
  hover: { scale: 1.15, y: -3 },
  tap: { scale: 0.95 },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0f] text-white">
      {/* ambient glow blobs — decorative, matches rest of site */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 25% 30%, rgba(138, 92, 246, 0.12), transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 75% 70%, rgba(16, 185, 129, 0.10), transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-6 px-4 py-16 text-center sm:px-8 md:px-10 lg:py-20"
      >
        {/* Name */}
        <h1
          className="select-none font-semibold leading-none text-white"
          style={{
            fontSize: "clamp(3rem, 5vw, 14rem)",
            letterSpacing: "0.02em",
            lineHeight: 0.9,
            padding: "0 3vw",
            whiteSpace: "nowrap",
            textShadow: "0 2px 18px rgba(255,255,255,0.45)",
          }}
        >
          Shivam Keshari
        </h1>

        {/* Gradient divider line */}
        <div
          className="h-[3px] w-24 rounded-full md:w-32"
          style={{
            background:
              "linear-gradient(to right, #0d58c8, #67e8f9, #34d399)",
          }}
        />

        {/* Social icons */}
        <div className="flex gap-6">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.2 }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition-colors duration-200 hover:text-violet-400"
            >
              <s.icon className="h-6 w-6" />
            </motion.a>
          ))}
        </div>

        {/* Tagline */}
        <p className="max-w-xl text-sm italic text-gray-300">
          Code with purpose, design with intention — building things that
          quietly do their job well.
        </p>

        {/* Credits */}
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Shivam Keshari. All rights
          reserved.
        </p>
      </motion.div>
    </footer>
  );
}