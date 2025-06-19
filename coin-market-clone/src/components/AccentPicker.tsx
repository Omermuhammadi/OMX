"use client";

import { useEffect, useState } from "react";

const COLORS = [
  { name: "Emerald", value: "#10b981" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
];

const KEY = "accent";

export default function AccentPicker() {
  const [mounted, setMounted] = useState(false);
  const [color, setColor] = useState<string>(COLORS[0].value);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    const initial = stored ?? COLORS[0].value;
    setColor(initial);
    document.documentElement.style.setProperty("--accent", initial);
    setMounted(true);
  }, []);

  const pick = (val: string) => {
    setColor(val);
    document.documentElement.style.setProperty("--accent", val);
    localStorage.setItem(KEY, val);
  };

  if (!mounted) return null;

  return (
    <div className="flex gap-2">
      {COLORS.map((c) => (
        <button
          key={c.value}
          onClick={() => pick(c.value)}
          className="h-5 w-5 rounded-full border-2 border-white/60"
          style={{
            backgroundColor: c.value,
            outline: color === c.value ? "2px solid #fff" : "none",
          }}
          title={c.name}
        />
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";

const COLORS = [
  { name: "Emerald", value: "#10b981" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
];
const KEY = "accent";

export default function AccentPicker() {
  const [mounted, setMounted] = useState(false);
  const [color, setColor] = useState(COLORS[0].value);

  // On mount read stored value
  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    const initial = stored || COLORS[0].value;
    setColor(initial);
    document.documentElement.style.setProperty("--accent", initial);
    setMounted(true);
  }, []);

  // When user picks a color
  const handlePick = (value: string) => {
    setColor(value);
    document.documentElement.style.setProperty("--accent", value);
    localStorage.setItem(KEY, value);
  };

  if (!mounted) return null; // avoid hydration mismatch

  return (
    <div className="flex gap-2">
      {COLORS.map((c) => (
        <button
          key={c.value}
          onClick={() => handlePick(c.value)}
          className="h-5 w-5 rounded-full border-2 border-white/60"
          style={{
            backgroundColor: c.value,
            outline: color === c.value ? "2px solid #fff" : "none",
          }}
          title={c.name}
        />
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";

const COLORS = [
  { name: "Emerald", value: "#10b981" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
];

const KEY = "accent";

export default function AccentPicker() {
  const [mounted, setMounted] = useState(false);
  const [color, setColor] = useState<string>("#10b981");

  // Hydrate
  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) {
      setColor(stored);
      document.documentElement.style.setProperty("--accent", stored);
    }
    setMounted(true);
  }, []);

  // Update on pick
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.setProperty("--accent", color);
    localStorage.setItem(KEY, color);
  }, [color, mounted]);

  if (!mounted) return null;
  const [hydrated, setHydrated] = useState(false);
  const [color, setColor] = useState<string | null>(() => null);
    if (typeof window !== "undefined") {
      return localStorage.getItem(KEY) || COLORS[0].value;
    }
    return COLORS[0].value;
  }); // placeholder

  useEffect(() => {
    const stored = localStorage.getItem(KEY) || COLORS[0].value;
    setColor(stored);
    document.documentElement.style.setProperty("--accent", stored);
    setHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", color);
    localStorage.setItem(KEY, color);
    if (color) {
      document.documentElement.style.setProperty("--accent", color);
      localStorage.setItem(KEY, color);
    }
  }, [color]);

  if (!hydrated || !color) return null;
  return (
    <div className="flex gap-2">
      {COLORS.map((c) => (
        <button
          key={c.value}
          onClick={() => setColor(c.value)}
          className="h-5 w-5 rounded-full border-2 border-white/60"
          style={{ backgroundColor: c.value, outline: color === c.value ? "2px solid #fff" : "none" }}
          title={c.name}
        />
      ))}
    </div>
  );
}
