import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose, links }) {
  return (
    <AnimatePresence onExitComplete={onClose}>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99] flex items-center justify-center overflow-hidden"
          initial={{ clipPath: "circle(0% at 95% 5%)" }}
          animate={{ clipPath: "circle(150% at 95% 5%)" }}
          exit={{ clipPath: "circle(0% at 95% 5%)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: "rgba(0,0,0,0.95)" }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
          >
            <FiX />
          </button>

          {/* Nav list */}
          <ul className="space-y-6 text-center">
            {links.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.12,
                }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-4xl text-white semibold hover:text-pink-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
