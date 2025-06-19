"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

const BUBBLES = [
  { symbol: "BTC", change: 2.4, size: 120 },
  { symbol: "ETH", change: -1.8, size: 110 },
  { symbol: "SOL", change: 8.9, size: 95 },
  { symbol: "DOGE", change: -3.2, size: 85 },
  { symbol: "ADA", change: 4.2, size: 90 },
  { symbol: "AVAX", change: -6.5, size: 80 },
  { symbol: "LINK", change: 5.3, size: 75 },
  { symbol: "MATIC", change: -2.7, size: 85 },
  { symbol: "APT", change: 7.2, size: 70 },
  { symbol: "OP", change: -4.9, size: 65 },
];

export default function CryptoBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);

  // simple random animation direction per bubble (CSS classes)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    children.forEach((el) => {
      const duration = 20 + Math.random() * 20; // 20s–40s
      el.style.animationDuration = `${duration}s`;
      el.style.animationDelay = `${-Math.random() * duration}s`;
    });
  }, []);

  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold mb-3">Crypto Bubbles (1-day)</h2>
      <div
        ref={containerRef}
        className="relative w-full h-[450px] overflow-hidden rounded-md bg-gradient-to-br from-zinc-200/20 to-zinc-200/5"
      >
        {BUBBLES.map((b, i) => (
          <div
            key={i}
            className={clsx(
              "absolute flex flex-col items-center justify-center text-white font-semibold shadow-lg backdrop-blur-sm",
              "animate-bubble"
            )}
            style={{
              width: b.size,
              height: b.size,
              left: `${(i * 37) % 90}%`,
              top: `${(i * 53) % 90}%`,
              borderRadius: "50%",
              backgroundColor: b.change >= 0 ? "rgba(34,197,94,0.8)" : "rgba(220,38,38,0.8)",
            }}
          >
            <span className="text-sm">{b.symbol}</span>
            <span className="text-xs">+{b.change}%</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes bubble {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-40px) scale(1.05);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }
        .animate-bubble {
          animation-name: bubble;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </section>
  );
}
