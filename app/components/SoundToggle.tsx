"use client";

import { motion } from "motion/react";
import { useSound } from "./SoundProvider";

export default function SoundToggle() {
  const { ready, muted, start, toggleMute } = useSound();

  const handleClick = () => {
    if (!ready) start();
    else toggleMute();
  };

  const icon = !ready ? "🔈" : muted ? "🔇" : "🎵";

  return (
    <motion.button
      type="button"
      className="sound-toggle"
      onClick={handleClick}
      aria-label={!ready ? "Play music" : muted ? "Unmute music" : "Mute music"}
      animate={ready && !muted ? { scale: [1, 1.08, 1] } : { scale: 1 }}
      transition={{ duration: 1.6, repeat: ready && !muted ? Infinity : 0, ease: "easeInOut" }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.button>
  );
}
