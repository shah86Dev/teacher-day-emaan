"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const STEPS = [
  { href: "/", label: "Home" },
  { href: "/letter", label: "Letter" },
  { href: "/memories", label: "Memories" },
  { href: "/thank-you", label: "Thank You" },
];

export default function ProgressNav() {
  const pathname = usePathname();

  return (
    <nav className="progress-nav">
      {STEPS.map((step) => {
        const active = pathname === step.href;
        return (
          <Link key={step.href} href={step.href} className={`progress-step${active ? " active" : ""}`}>
            {active && (
              <motion.span
                layoutId="progress-pill"
                className="progress-pill"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
            <span className="progress-label">{step.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
