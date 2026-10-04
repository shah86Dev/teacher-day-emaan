"use client";

import { motion } from "motion/react";

export type ParticleSpec = readonly [emoji: string, top: string, left: string, delay: number];

const DEFAULT_PARTICLES: readonly ParticleSpec[] = [
  ["🌸", "8%", "12%", 0],
  ["✨", "18%", "78%", 1],
  ["💗", "31%", "8%", 2],
  ["⭐", "46%", "90%", 3],
  ["🌼", "63%", "7%", 4],
  ["💫", "77%", "82%", 5],
  ["💖", "88%", "18%", 6],
  ["🌷", "93%", "68%", 7],
];

export default function Particles({ items = DEFAULT_PARTICLES }: { items?: readonly ParticleSpec[] }) {
  return (
    <>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      {items.map(([emoji, top, left, delay]) => (
        <motion.span
          key={`${emoji}-${top}-${left}`}
          className="particle"
          style={{ top, left }}
          animate={{ y: [0, -18, 0], rotate: [-6, 8, -6], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 4.5, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {emoji}
        </motion.span>
      ))}
    </>
  );
}
