"use client";

import { useEffect, useState } from "react";

const COLORS = [
  { name: "Emerald", value: "#10b981" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
];

const KEY = "accent";

export default function AccentColorPicker() {
  const [mounted, setMounted] = useState(false);
  const [color, setColor] = useState(COLORS[0].value);

  // hydrate
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(KEY);
    const initial = stored || COLORS[0].value;
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
