import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import ParticlesBackground from "../Componets/ParticleBackground";
import avatarImg from "../assets/avatar.png";

// Typewriter roles
const ROLES = ["Web Developer", "Software Developer"];

// Social links
const SOCIALS = [
  {
    icon: FaTwitter,
    label: "Twitter",
    href: "https://twitter.com/yourusername",
  },
  { icon: FaGithub, label: "GitHub", href: "https://github.com/yourusername" },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
  },
];

// Framer Motion hover/tap variants for social icons
const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0px 8px 16px rgba(13,88,204,0.9)) drop-shadow(0px 8px 16px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

export default function Home() {
  // Typewriter state
  const roles = useMemo(() => ROLES, []);
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];

    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) {
          setSubIndex((v) => v + 1);
        } else if (!deleting && subIndex === current.length) {
          setTimeout(() => setDeleting(true), 1200);
        } else if (deleting && subIndex > 0) {
          setSubIndex((v) => v - 1);
        } else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((v) => (v + 1) % roles.length);
        }
      },
      deleting ? 40 : 60,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      id="home"
      className="relative w-full h-screen bg-black overflow-hidden flex items-center"
    >
      <ParticlesBackground />

      {/* Gradient blobs */}
      <div className="pointer-events-none absolute top-[-10%] left-0 w-[360px] h-[360px] rounded-full opacity-20 sm:opacity-10 blur-[120px] bg-gradient-to-r from-[#302663] via-[#0bf8] to-[#1cd8d2] animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full opacity-15 sm:opacity-10 blur-[140px] bg-gradient-to-r from-[#302663] via-[#0bf8] to-[#1cd8d2] animate-pulse delay-500" />

      {/* Main grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* ── LEFT SIDE ─────────────────────────────────────── */}
        <div className="flex flex-col h-full justify-center text-center lg:text-left relative">
          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 text-xl sm:text-2xl md:text-3xl font-semibold text-white min-h-[1.6em]"
          >
            {roles[index].substring(0, subIndex)}
            <span className="inline-block w-[2px] h-[1.2em] bg-white align-middle ml-1 animate-pulse" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1cdad2] to-[#0bf8] drop-shadow-lg"
          >
            Hello, I'm <br />
            <span className="text-white whitespace-nowrap">Gaurav Gupta</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            I craft fast, beautiful, and accessible web experiences — from
            concept to production. Let's build something remarkable together.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-pink-500 to-blue-500 shadow-lg hover:scale-105 transition-all duration-300"
            >
              View My Work
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-medium text-lg text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all duration-300"
            >
              My Résumé
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 flex flex-wrap justify-center lg:justify-start gap-5 text-2xl md:text-3xl"
          >
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-300"
                variants={glowVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT SIDE — Avatar ────────────────────────────── */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative">
            {/* Glow orb behind avatar */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
              style={{
                width: "min(22vw, 410px)",
                height: "min(22vw, 410px)",
                background:
                  "conic-gradient(from 0deg, #302663, #0bf8, #1cd8d2)",
                filter: "blur(38px)",
                opacity: 0.32,
              }}
            />
            <motion.img
              src={avatarImg}
              alt="Gaurav Gupta"
              className="relative z-10 rounded-2xl object-contain select-none pointer-events-none"
              style={{
                right: "-30px",
                width: "min(45vw, 280px)",
                maxHeight: "90vh",
              }}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
