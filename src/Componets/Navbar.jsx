import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import OverlayMenu from "./OverlayMenu";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Testimonial",
    "Contact",
  ];

  return (
    <>
      {/* Overlay Menu */}
      <OverlayMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />

      {/* NavBar - Hamesha top par fixed rahega */}
      <nav
        className="fixed top-0 left-0 w-full z-50"
        style={{
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo + Name */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm select-none">
              G
            </div>
            <span className="hidden sm:block text-white font-bold text-lg tracking-tight">
              Gaurav
            </span>
          </div>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-white/70 hover:text-pink-400 text-sm font-medium transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: Reach Out + Hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <a
                href="#contact"
                className="px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-blue-500 shadow-lg hover:opacity-90 transition-opacity duration-300"
              >
                Reach Out
              </a>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="text-white text-3xl focus:outline-none lg:absolute lg:left-1/2 lg:-translate-x-1/2"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}