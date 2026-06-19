import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// Yahan apni testimonial images daalo (m1, m2, w1, w2 ki jagah)
import m1 from "../assets/m1.png";
import m2 from "../assets/m2.png";
import w1 from "../assets/w1.png";
import w2 from "../assets/w2.png";

const testimonials = [
  {
    image: "https://i.pravatar.cc/150?img=12", // replace with m1
    review:
      "Working with this team turned our scattered ideas into a product people actually enjoy using. The attention to detail was something else.",
    name: "Rohan Mehta",
    role: "Founder, Nimbus Labs",
  },
  {
    image: "https://i.pravatar.cc/150?img=32", // replace with w1
    review:
      "Communication was clear from day one. Deadlines were respected and the final build felt far more polished than what we'd asked for.",
    name: "Ananya Iyer",
    role: "Product Manager, Veltrix",
  },
  {
    image: "https://i.pravatar.cc/150?img=51", // replace with m2
    review:
      "I've worked with a lot of freelancers — this was the first time the handoff documentation was actually usable by my own dev team.",
    name: "Karan Sehgal",
    role: "CTO, Orbitly",
  },
  {
    image: "https://i.pravatar.cc/150?img=47", // replace with w2
    review:
      "Subtle animations, fast load times, zero bugs at launch. Exactly the kind of craftsmanship we were hoping to find.",
    name: "Priya Nair",
    role: "Marketing Lead, Fernlight",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] px-6 py-20 text-white md:px-10"
    >
      {/* ambient background glow — signature element */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[100px]" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto mb-16 max-w-2xl text-center"
      >
        <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-violet-300">
          Client voices
        </span>
        <h2 className="text-4xl font-bold leading-tight md:text-5xl">
          What people <span className="text-violet-400">say</span>
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-violet-400/40 hover:bg-white/[0.06]"
          >
            <Quote className="mb-3 h-6 w-6 text-violet-400/60" />

            <p className="mb-6 flex-1 text-sm italic leading-relaxed text-gray-300">
              "{t.review}"
            </p>

            <div className="flex items-center gap-3">
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                className="h-11 w-11 rounded-full border-2 border-violet-400/50 object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {t.name}
                </h3>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}