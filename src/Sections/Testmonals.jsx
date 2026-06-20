import { motion } from "framer-motion";
import { GitPullRequest } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const GITHUB_USERNAME = "S1h2i3v4a"; // your GitHub username
const LEETCODE_USERNAME = "Shivam990shiv"; // your actual LeetCode username

export default function GithubStats() {
  return (
    <section
      id="github"
      className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] px-6 py-20 text-white md:px-10"
    >
      {/* ambient background glow — matches site's signature element */}
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
          Live activity
        </span>
        <h2 className="text-4xl font-bold leading-tight md:text-5xl">
          GitHub <span className="text-violet-400">Stats</span>
        </h2>
        <p className="mt-4 text-sm text-gray-400">
          Consistency over claims — here's what I've actually been shipping.
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6">
        {/* Top row: overall stats + streak */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-violet-400/40"
          >
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=dark&bg_color=00000000&hide_border=true&title_color=a78bfa&icon_color=a78bfa&text_color=d1d5db`}
              alt="GitHub stats"
              loading="lazy"
              className="w-full max-w-md"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-violet-400/40"
          >
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=dark&background=00000000&border=00000000&ring=a78bfa&fire=a78bfa&currStreakLabel=a78bfa`}
              alt="GitHub streak stats"
              loading="lazy"
              className="w-full max-w-md"
            />
          </motion.div>
        </div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-violet-400/40"
        >
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=react-dark&bg_color=00000000&hide_border=true&color=a78bfa&line=a78bfa&point=ffffff`}
            alt="GitHub contribution graph"
            loading="lazy"
            className="w-full"
          />
        </motion.div>

        {/* Coding practice: LeetCode + GFG */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-violet-400/40"
          >
            <img
              src={`https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=dark&font=baloo2&ext=heatmap`}
              alt="LeetCode stats"
              loading="lazy"
              className="w-full max-w-md rounded-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm transition-colors duration-300 hover:border-violet-400/40"
          >
            <GitPullRequest className="h-7 w-7 text-violet-300" />
            <p className="text-3xl font-bold text-white">400+</p>
            <p className="text-sm text-gray-400">Problems solved on GeeksforGeeks</p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex justify-center"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-violet-400/40 hover:bg-white/10"
          >
            <FaGithub className="h-4 w-4" />
            View full profile on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}