import { useState } from "react";
import Navbar from "./Componets/Navbar";
import Home from "./Sections/Home";
import About from "./Sections/About";
import Skills from "./Sections/Skills";
import Project from "./Sections/Project";
import Experience from "./Sections/Experience";
import Testmonals from "./Sections/Testmonals";
import Contact from "./Sections/Contact";
import Footer from "./Sections/Footer";
import ParticlesBackground from "./Componets/ParticleBackground";

function App() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <div
      onMouseMove={(e) =>
        setPos({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        })
      }
      className="relative text-white min-h-screen transition-all duration-300 ease-out"
      style={{
        backgroundColor: "#0a0a0f",
        backgroundImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,138,0,0.35), rgba(229,46,113,0.25) 25%, rgba(59,130,246,0.15) 45%, transparent 65%)`,
      }}
    >
      <ParticlesBackground />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Project />
      <Experience />
      <Testmonals />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;