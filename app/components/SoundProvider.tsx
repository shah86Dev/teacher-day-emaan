"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type SoundContextType = {
  ready: boolean;
  muted: boolean;
  start: () => void;
  toggleMute: () => void;
  chime: () => void;
  pop: () => void;
  whoosh: () => void;
  sparkle: () => void;
  confettiBurst: () => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}

const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
const MELODY = [0, 2, 4, 2, 5, 4, 2, 0];

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const loopTimer = useRef<number | null>(null);
  const stepRef = useRef(0);
  const mutedRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(false);

  const ensureCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = mutedRef.current ? 0 : 0.3;
      master.connect(ctx.destination);
      audioCtxRef.current = ctx;
      masterGainRef.current = master;
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = "sine", delay = 0, gainPeak = 0.22) => {
      const ctx = audioCtxRef.current;
      const master = masterGainRef.current;
      if (!ctx || !master) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      const now = ctx.currentTime + delay;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gainPeak, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain).connect(master);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    },
    []
  );

  const chime = useCallback(() => {
    playTone(523.25, 0.6, "sine", 0, 0.22);
    playTone(659.25, 0.6, "sine", 0.08, 0.2);
    playTone(783.99, 0.9, "sine", 0.16, 0.18);
  }, [playTone]);

  const pop = useCallback(() => {
    playTone(880, 0.12, "triangle", 0, 0.16);
  }, [playTone]);

  const whoosh = useCallback(() => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;
    const bufferSize = Math.floor(ctx.sampleRate * 0.4);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 0.35);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    noise.connect(filter).connect(gain).connect(master);
    noise.start();
  }, []);

  const sparkle = useCallback(() => {
    for (let i = 0; i < 4; i++) {
      const freq = SCALE[Math.floor(Math.random() * SCALE.length)] * 2;
      playTone(freq, 0.3, "sine", i * 0.06, 0.08);
    }
  }, [playTone]);

  const confettiBurst = useCallback(() => {
    for (let i = 0; i < 6; i++) {
      playTone(SCALE[i % SCALE.length], 0.5, "triangle", i * 0.05, 0.14);
    }
  }, [playTone]);

  const scheduleLoop = useCallback(() => {
    const step = () => {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const idx = MELODY[stepRef.current % MELODY.length];
      playTone(SCALE[idx], 1.2, "sine", 0, 0.05);
      playTone(SCALE[idx] / 2, 1.8, "triangle", 0, 0.035);
      stepRef.current += 1;
      loopTimer.current = window.setTimeout(step, 780);
    };
    step();
  }, [playTone]);

  const start = useCallback(() => {
    const ctx = ensureCtx();
    if (ctx.state === "suspended") ctx.resume();
    setReady((already) => {
      if (!already) scheduleLoop();
      return true;
    });
  }, [ensureCtx, scheduleLoop]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      mutedRef.current = next;
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.linearRampToValueAtTime(next ? 0 : 0.3, audioCtxRef.current.currentTime + 0.25);
      }
      return next;
    });
  }, []);

  useEffect(
    () => () => {
      if (loopTimer.current) window.clearTimeout(loopTimer.current);
    },
    []
  );

  return (
    <SoundContext.Provider value={{ ready, muted, start, toggleMute, chime, pop, whoosh, sparkle, confettiBurst }}>
      {children}
    </SoundContext.Provider>
  );
}
