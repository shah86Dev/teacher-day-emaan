"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Particles, { type ParticleSpec } from "../components/Particles";
import { useSound } from "../components/SoundProvider";

const MEMORY_PARTICLES: readonly ParticleSpec[] = [
  ["📖", "12%", "8%", 0],
  ["🎨", "22%", "88%", 1],
  ["🌟", "72%", "5%", 2],
  ["🎈", "82%", "90%", 3],
];

const MEMORIES = [
  { emoji: "📖", title: "Story Time", text: "The way you read stories made every word come alive." },
  { emoji: "🎨", title: "Art Class", text: "You always cheered for my wobbly drawings like they were masterpieces." },
  { emoji: "🧮", title: "Math Help", text: "You never gave up on me, even when numbers felt scary." },
  { emoji: "🏆", title: "Sports Day", text: "You cheered the loudest, win or lose." },
  { emoji: "🌱", title: "Science Fun", text: "You turned every question into an adventure." },
  { emoji: "🎉", title: "Celebrations", text: "Every small win felt like a big party with you." }
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, bounce: 0.35, duration: 0.6 } }
};

export default function MemoriesPage() {
  const { sparkle, pop } = useSound();

  return (
    <main className="page-shell memories-shell">
      <Particles items={MEMORY_PARTICLES} />

      <motion.div
        className="memories-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="eyebrow">A little trip down</p>
        <h1 className="memories-title">Memory Lane 🌸</h1>
      </motion.div>

      <motion.div className="memories-grid" variants={container} initial="hidden" animate="show">
        {MEMORIES.map((m) => (
          <motion.div
            key={m.title}
            className="memory-card"
            variants={item}
            whileHover={{ scale: 1.05, rotate: -1, y: -6 }}
            onHoverStart={() => sparkle()}
          >
            <div className="memory-emoji">{m.emoji}</div>
            <h3>{m.title}</h3>
            <p>{m.text}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="page-cta">
        <Link href="/thank-you" className="open-button" onClick={() => pop()}>
          One Last Thing <span className="arrow">→</span>
        </Link>
      </div>
    </main>
  );
}
