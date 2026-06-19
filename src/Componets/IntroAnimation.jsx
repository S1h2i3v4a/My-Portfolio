import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GREETINGS = [
  "नमस्ते", "Hello", "Bonjour", "Hola", "Ciao",
  "こんにちは", "안녕하세요", "مرحبا", "Привет", "Hallo",
];

export default function IntroAnimation({ onFinish }) {
  const greetings = useMemo(() => GREETINGS, []);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const id = setInterval(() => {
        setIndex((v) => v + 1);
      }, 180);
      return () => clearInterval(id);
    } else {
      // Last greeting — hold 300ms then exit
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [index, greetings.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99] flex items-center justify-center bg-black overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            key={index}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.12 }}
          >
            {greetings[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}