"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label="Toggle Dark Mode"
      className={clsx(
        "flex h-9 w-9 items-center justify-center rounded-md border border-transparent transition-colors",
        "hover:bg-black/5 dark:hover:bg-white/10"
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 90 }}
      >
        {isDark ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </motion.span>
    </button>
  );
}
