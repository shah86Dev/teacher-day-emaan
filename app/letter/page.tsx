"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import Particles, { type ParticleSpec } from "../components/Particles";
import { useSound } from "../components/SoundProvider";

const TEACHER_NAME = "Ma’am Rida";

const LETTER_PARTICLES: readonly ParticleSpec[] = [
  ["💌", "10%", "10%", 0],
  ["✨", "20%", "85%", 1],
  ["🌸", "70%", "6%", 2],
  ["💫", "80%", "90%", 3],
];

const MESSAGE_LINES = [
  "Thank you for your kindness, patience, and for making our classroom a happy place to learn.",
  "You inspire me to learn, grow, and always try my best. 🌸",
];

export default function LetterPage() {
  const [opened, setOpened] = useState(false);
  const { chime, sparkle, pop, ready, start } = useSound();

  const handleOpen = () => {
    if (!ready) start();
    setOpened(true);
  };

  useEffect(() => {
    if (!opened) return;
    const timer = window.setTimeout(() => chime(), 300);
    return () => window.clearTimeout(timer);
  }, [opened, chime]);

  return (
    <main className="page-shell letter-shell">
      <Particles items={LETTER_PARTICLES} />

      <div className="centered-stage">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="envelope"
              type="button"
              className="envelope-button"
              onClick={handleOpen}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              exit={{ opacity: 0, scale: 0.6, rotate: -8 }}
              transition={{
                y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                default: { duration: 0.6 }
              }}
            >
              <span className="envelope-flap" />
              <span className="envelope-icon">💌</span>
              <span className="envelope-hint">Tap to open your letter</span>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              className="letter-card"
              initial={{ opacity: 0, y: 60, scale: 0.85, rotate: -2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
            >
              <p className="modal-eyebrow">Dear</p>
              <h2>{TEACHER_NAME}</h2>
              <div className="message-paper">
                {MESSAGE_LINES.map((line, i) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.25 }}
                  >
                    {line}
                  </motion.p>
                ))}
                <motion.div
                  className="message-sign"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  With lots of love,
                  <br />
                  <strong>Imaan Fatima</strong>
                  <br />
                  <span>Class 1-B · Allied School Surjani Campus</span>
                </motion.div>
              </div>
              <motion.div
                className="modal-hearts"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                ♥ &nbsp; ✦ &nbsp; ♥
              </motion.div>
              <Link
                href="/memories"
                className="open-button"
                onClick={() => {
                  pop();
                  sparkle();
                }}
              >
                See Our Memories <span className="arrow">→</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
