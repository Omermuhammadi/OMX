"use client";

import { BitcoinIcon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import AccentColorPicker from "@/components/AccentColorPicker";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between bg-background/80 px-4 backdrop-blur-md md:h-16 md:px-8">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <BitcoinIcon className="h-6 w-6 text-yellow-400" />
        <span>OMX</span>
      </Link>
      <div className="flex items-center gap-4">
        <AccentColorPicker />
        <ThemeToggle />
      </div>
    </header>
  );
}
