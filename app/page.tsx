"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Particles from "./components/Particles";
import { useSound } from "./components/SoundProvider";

export default function Home() {
  const { ready, start, pop } = useSound();

  const handleBegin = () => {
    if (!ready) start();
    pop();
  };

  return (
    <main className="page-shell">
      <Particles />

      <header className="topbar">
        <div className="brand-mark">
          <span>✦</span> Class 1-B
        </div>
        <div className="school-pill">Allied School · Surjani Campus</div>
      </header>

      <section className="hero">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">A little thank-you from the heart</p>
          <h1>
            Happy <span>Teacher&apos;s Day</span>
          </h1>
          <p className="intro">
            A special message for Ma’am Rida, the wonderful teacher who makes every school day brighter.
          </p>
          <Link href="/letter" className="open-button" onClick={handleBegin}>
            <motion.span
              className="button-icon"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              💌
            </motion.span>
            Open My Greeting
            <span className="arrow">→</span>
          </Link>
          <div className="signature-mini">
            <span>Made with love by</span>
            <strong>Imaan Fatima · Class 1-B</strong>
          </div>
        </motion.div>

        <motion.div
          className="hero-card-wrap"
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.15, type: "spring", bounce: 0.3 }}
        >
          <motion.div
            className="teacher-card"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="card-glow" />
            <div className="card-topline">
              <span>FOR MY</span>
              <b>AMAZING TEACHER</b>
            </div>
            <div className="illustration">
              <div className="sun">☀️</div>
              <div className="teacher-bubble">👩‍🏫</div>
              <div className="desk">📚 &nbsp; ✏️ &nbsp; 🖍️</div>
              <div className="mini-heart">♥</div>
            </div>
            <div className="card-message">
              You make
              <br />
              <em>learning magical.</em>
            </div>
            <div className="card-footer">With love, Imaan 💗</div>
          </motion.div>
        </motion.div>
      </section>

      <section className="bottom-note">
        <span className="line" />
        <span>Teachers plant the seeds of tomorrow.</span>
        <span className="line" />
      </section>
    </main>
  );
}
