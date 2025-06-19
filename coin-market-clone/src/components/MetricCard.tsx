"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface Props {
  label: string;
  value: string;
  icon: ReactNode;
}

export default function MetricCard({ label, value, icon }: Props) {
  return (
    <div
      className={clsx(
        "flex flex-1 min-w-[160px] items-center gap-3 rounded-lg border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111]"
      )}
    >
      {icon}
      <div className="flex flex-col">
        <span className="text-xs text-foreground/60 uppercase tracking-wide">
          {label}
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-semibold"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
