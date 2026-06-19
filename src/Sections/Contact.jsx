import { useState } from "react";
import { motion } from "framer-motion";
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import emailjs from "@emailjs/browser";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

// apni astronaut / hero image yahan import karo
import astro from "../assets/astro.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // budget field — sirf numbers allow karna
    if (name === "budget" && value && !/^\d+$/.test(value)) {
      return;
    }

    setFormData((p) => ({ ...p, [name]: value }));

    if (errors[name]) {
      setErrors((p) => {
        const copy = { ...p };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};

    required.forEach((f) => {
      if (!formData[f]?.trim()) {
        newErrors[f] = "This field is required";
      }
    });

    if (formData.service !== "other" && !formData.budget?.trim()) {
      newErrors.budget = "This field is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          service: formData.service,
          budget: formData.budget || "Not specified",
          idea: formData.idea,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", service: "", budget: "", idea: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const inputClasses = (field) =>
    `w-full rounded-lg bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-colors border ${
      errors[field]
        ? "border-red-500/60"
        : "border-white/10 focus:border-violet-400/60"
    }`;

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] px-6 py-20 text-white md:px-10"
    >
      <Particles
        id="contact-particles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 50, density: { enable: true, area: 900 } },
            color: { value: "#a78bfa" },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 2.5 } },
            links: {
              enable: true,
              color: "#a78bfa",
              opacity: 0.15,
              distance: 130,
            },
            move: { enable: true, speed: 0.4, outModes: "out" },
          },
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Left — floating illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <motion.img
            // src={astro}
            src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=600&q=80"
            alt="Contact illustration"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-3/4 max-w-md rounded-2xl border-2 border-white/10 object-cover shadow-2xl md:w-full"
          />
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-xl backdrop-blur-sm"
        >
          <h2 className="mb-6 text-3xl font-bold">
            Let's work <span className="text-violet-400">together</span>
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">
                Your name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className={inputClasses("name")}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">
                Your email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Service */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">
                Service needed <span className="text-red-400">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`${inputClasses("service")} text-white`}
              >
                <option value="" disabled className="bg-[#0a0a0f]">
                  Something in mind?
                </option>
                <option value="web" className="bg-[#0a0a0f]">
                  Web development
                </option>
                <option value="mobile" className="bg-[#0a0a0f]">
                  Mobile application
                </option>
                <option value="other" className="bg-[#0a0a0f]">
                  Other
                </option>
              </select>
              {errors.service && (
                <p className="mt-1 text-xs text-red-400">{errors.service}</p>
              )}
            </div>

            {/* Budget — conditional */}
            {formData.service && formData.service !== "other" && (
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium">
                  Budget <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="budget"
                  placeholder="Your budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={inputClasses("budget")}
                />
                {errors.budget && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.budget}
                  </p>
                )}
              </div>
            )}

            {/* Idea */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-medium">
                Tell me about your idea <span className="text-red-400">*</span>
              </label>
              <textarea
                name="idea"
                rows={5}
                placeholder="Enter your idea"
                value={formData.idea}
                onChange={handleChange}
                className={inputClasses("idea")}
              />
              {errors.idea && (
                <p className="mt-1 text-xs text-red-400">{errors.idea}</p>
              )}
            </div>

            {/* Status message */}
            {status !== "idle" && (
              <p
                className={`flex items-center gap-2 text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {status === "sending" && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                )}
                {status === "success" && (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Message sent
                    successfully
                  </>
                )}
                {status === "error" && (
                  <>
                    <XCircle className="h-4 w-4" /> Something went wrong
                  </>
                )}
              </p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}