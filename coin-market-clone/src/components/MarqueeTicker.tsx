"use client";

import useSWR from "swr";
import { fetchTopCoins, TopCoin } from "@/lib/coingecko";
import clsx from "clsx";

const fetcher = () => fetchTopCoins();

export default function MarqueeTicker() {
  const { data } = useSWR<TopCoin[]>("top-coins", fetcher, {
    refreshInterval: 15000,
  });
  if (!data) return null;
  return (
    <div className="whitespace-nowrap overflow-hidden bg-background border-y border-black/5 dark:border-white/10 text-sm">
      <div className="animate-marquee flex gap-6 py-2 px-4">
        {data.slice(0, 20).map((c) => (
          <span
            key={c.id}
            className={clsx(
              c.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-500"
            )}
          >
            {c.symbol.toUpperCase()} {c.current_price.toLocaleString()} ({c.price_change_percentage_24h.toFixed(2)}%)
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-flex;
          min-width: 100%;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
