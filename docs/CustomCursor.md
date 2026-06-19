## 🖱️ Custom Cursor Component

A custom animated cursor — a glowing, dual-layer gradient orb that follows the mouse pointer smoothly across the screen, replacing the default browser cursor. It also reacts to clicks, giving the cursor a more interactive and polished feel.

### Features

- 🎯 **Real-time mouse tracking** using `useState` and `useEffect`.
- 🌈 **Dual-layer glow effect**:
  - A large, soft **outer glow** (`90px`, heavy blur) with a 3-color gradient (`fuchsia → purple → cyan`) for an ambient light effect.
  - A smaller, sharper **inner core** (`16px`, light blur) with a `pink → cyan` gradient for a crisp focal point.
- 🖱️ **Click reactivity** — the outer glow shrinks slightly and the inner core enlarges on mouse-down, creating a subtle "press" animation.
- 🎬 **Smooth transitions** — uses CSS `transition-transform` with `ease-out` timing so the cursor's scale changes feel fluid rather than instant.
- 🚫 **Non-blocking** — `pointer-events: none` ensures the cursor never interferes with clicks or links.
- 📌 **Always on top** — high `z-index` (`99`) keeps it rendered above all other content.
- 🧹 **Proper cleanup** — all event listeners (`mousemove`, `mousedown`, `mouseup`) are removed on unmount to prevent memory leaks.

### How It Works

1. `useState` stores the current mouse position (`x`, `y`) and a boolean `isClicking` state.
2. Inside `useEffect`, three event listeners are attached to the `window`:
   - `mousemove` → updates position via `e.clientX` / `e.clientY`
   - `mousedown` → sets `isClicking` to `true`
   - `mouseup` → sets `isClicking` back to `false`
3. Two `div` layers are rendered:
   - **Outer glow** — positioned using `translate()` based on mouse position, offset by half its width/height (`-45px`) so it's centered on the cursor. Scales down slightly (`scale(0.8)`) when clicking.
   - **Inner core** — same positioning logic, offset by `-8px` (half of `16px`), but scales **up** (`scale(1.6)`) when clicking — creating a nice contrast between the two layers.
4. On unmount, all three event listeners are removed via the `useEffect` cleanup function.

### Usage

```jsx
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <>
      <CustomCursor />
      {/* Rest of your page content */}
    </>
  );
}
```

> **Note:** Since the cursor uses `position: fixed` with `pointer-events: none`, it sits on top of your page without blocking any interactions.

### Tech Used

- React (Hooks: `useState`, `useEffect`, `useRef`)
- Tailwind CSS (gradients, blur, transition utilities)
