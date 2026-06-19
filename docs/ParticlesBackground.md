[text](ParticlesBackground.md)## ✨ Particles Background Component

A lightweight, animated particle background built using the **HTML5 Canvas API** and **React Hooks** (`useRef`, `useEffect`). It creates a smooth, ambient floating-particle effect — commonly used on modern portfolio websites.

### Features

- 🎨 **Canvas-based rendering** — particles are drawn directly on an HTML5 `<canvas>` element for high performance, instead of using individual DOM nodes.
- 🌌 **50 randomly generated particles** — each with a random position, size (1–3px radius), and slow random movement speed.
- 🔄 **Wrap-around effect** — when a particle exits one edge of the screen, it reappears from the opposite edge, creating a seamless infinite-loop effect.
- 📐 **Responsive canvas** — automatically resizes and regenerates particles whenever the browser window is resized.
- 🧹 **Proper cleanup** — uses `cancelAnimationFrame` and removes the resize event listener on component unmount to prevent memory leaks.
- ✨ **Glow effect** — particles have a subtle shadow blur for a soft, glowing appearance.

### How It Works

1. A `<canvas>` element is rendered and given a `ref` to access its DOM node.
2. Inside `useEffect`, a 2D rendering context (`ctx`) is obtained from the canvas.
3. A `Particle` class defines each particle's properties:
   - `x`, `y` — random starting position
   - `radius` — random size between 1px and 3px
   - `color` — picked from a predefined color array
   - `speedX`, `speedY` — small random velocity values for slow drifting motion
4. The `draw()` method paints each particle as a circle with a glow effect.
5. The `update()` method moves the particle and checks screen boundaries to apply the wrap-around logic.
6. The `animate()` function uses `requestAnimationFrame` to continuously clear and redraw the canvas, creating smooth 60fps animation.
7. A `resize` event listener ensures the canvas always matches the window size, regenerating particles accordingly.
8. On component unmount, the animation loop is stopped and the event listener is removed to avoid memory leaks.

### Usage

```jsx
import ParticlesBackground from "./components/ParticlesBackground";

function App() {
  return (
    <>
      <ParticlesBackground />
      {/* Rest of your page content */}
    </>
  );
}
```

> **Note:** Make sure the parent container has `position: relative` so the `fixed` positioned canvas renders correctly as a background layer behind your content.

### Tech Used

- React (Hooks: `useRef`, `useEffect`)
- HTML5 Canvas API
- Tailwind CSS (for styling, optional — can be replaced with plain CSS)
