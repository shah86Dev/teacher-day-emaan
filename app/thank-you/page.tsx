"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Particles from "../components/Particles";
import { useSound } from "../components/SoundProvider";

const CONFETTI_EMOJI = ["🎉", "🌸", "✨", "💮", "⭐", "💗", "🎊"];

type ConfettiPiece = {
  id: number;
  emoji: string;
  left: string;
  delay: number;
  duration: number;
};

export default function ThankYouPage() {
  const { confettiBurst, pop } = useSound();
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const pieces: ConfettiPiece[] = Array.from({ length: 26 }, (_, i) => ({
      id: i,
      emoji: CONFETTI_EMOJI[i % CONFETTI_EMOJI.length],
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 1.2,
      duration: 3 + Math.random() * 2
    }));
    setConfetti(pieces);
    const timer = window.setTimeout(() => confettiBurst(), 200);
    return () => window.clearTimeout(timer);
  }, [confettiBurst]);

  return (
    <main className="page-shell thankyou-shell">
      <Particles />

      <div className="confetti-layer" aria-hidden>
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            className="confetti-piece"
            style={{ left: c.left }}
            initial={{ y: -40, opacity: 0, rotate: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "linear" }}
          >
            {c.emoji}
          </motion.span>
        ))}
      </div>

      <div className="centered-stage">
        <motion.div
          className="thankyou-card"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.35, duration: 0.8 }}
        >
          <motion.div
            className="thankyou-icon"
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            🎓
          </motion.div>
          <h1 className="thankyou-title">Happy Teacher&apos;s Day!</h1>
          <p className="thankyou-text">
            Ma’am Mahnoor Shakeel, thank you for being the kind of teacher students remember forever.
          </p>
          <div className="message-sign">
            With all my heart,
            <br />
            <strong>Imaan Fatima</strong>
            <br />
            <span>Class 1-B · Allied School Surjani Campus</span>
          </div>
          <Link href="/" className="open-button" onClick={() => pop()}>
            Replay the Greeting <span className="arrow">↺</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
