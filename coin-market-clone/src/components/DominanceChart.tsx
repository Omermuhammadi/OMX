"use client";

import useSWR from "swr";
import { fetchTopCoins, TopCoin } from "@/lib/coingecko";
import { PieChart as Pie } from "lucide-react";

const fetcher = () => fetchTopCoins();

export default function DominanceChart() {
  const { data } = useSWR<TopCoin[]>("top-coins", fetcher);
  if (!data) return null;
  const btc = data.find((c) => c.id === "bitcoin")?.market_cap || 0;
  const eth = data.find((c) => c.id === "ethereum")?.market_cap || 0;
  const total = data.reduce((s, c) => s + c.market_cap, 0);
  const others = total - btc - eth;
  const pct = (v: number) => ((v / total) * 100).toFixed(1);

  return (
    <section className="mb-10 max-w-md mx-auto bg-white dark:bg-[#111] rounded-lg shadow-sm p-5">
      <h2 className="font-semibold mb-4 text-center flex items-center gap-2 justify-center">
        <Pie className="h-5 w-5" /> Dominance
      </h2>
      <svg viewBox="0 0 32 32" className="mx-auto w-40 h-40">
        <circle r="16" cx="16" cy="16" fill="#d1d5db" />
        <circle
          r="16"
          cx="16"
          cy="16"
          fill="transparent"
          stroke="#f97316"
          strokeWidth="32"
          strokeDasharray={`${(btc / total) * 100} 100`}
          transform="rotate(-90 16 16)"
        />
        <circle
          r="16"
          cx="16"
          cy="16"
          fill="transparent"
          stroke="#6366f1"
          strokeWidth="32"
          strokeDasharray={`${(eth / total) * 100} 100`}
          transform={`rotate(${(btc / total) * 360 - 90} 16 16)`}
        />
      </svg>
      <div className="flex justify-center gap-6 text-sm mt-4">
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 bg-orange-500 rounded-sm" /> BTC {pct(btc)}%
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 bg-indigo-500 rounded-sm" /> ETH {pct(eth)}%
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 bg-gray-300 rounded-sm" /> Others {pct(others)}%
        </div>
      </div>
    </section>
  );
}
