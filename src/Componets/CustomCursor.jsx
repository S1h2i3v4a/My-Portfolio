import { useState, useEffect, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const dotRef = useRef(null);

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const clickDownHandler = () => setIsClicking(true);
    const clickUpHandler = () => setIsClicking(false);

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mousedown", clickDownHandler);
    window.addEventListener("mouseup", clickUpHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mousedown", clickDownHandler);
      window.removeEventListener("mouseup", clickUpHandler);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[99]">
      {/* Outer glow - soft and slow */}
      <div
        className="absolute rounded-full bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-cyan-400 blur-3xl opacity-60 transition-transform duration-300 ease-out"
        style={{
          width: "90px",
          height: "90px",
          transform: `translate(${position.x - 45}px, ${position.y - 45}px) scale(${
            isClicking ? 0.8 : 1
          })`,
        }}
      />

      {/* Inner core - sharper and tighter */}
      <div
        ref={dotRef}
        className="absolute rounded-full bg-gradient-to-br from-pink-400 to-cyan-300 blur-md opacity-90 transition-transform duration-150 ease-out"
        style={{
          width: "16px",
          height: "16px",
          transform: `translate(${position.x - 8}px, ${position.y - 8}px) scale(${
            isClicking ? 1.6 : 1
          })`,
        }}
      />
    </div>
  );
}