"use client";

import useSWR from "swr";
import { fetchTopCoins, TopCoin } from "@/lib/coingecko";
import clsx from "clsx";
import { useState } from "react";

const fetcher = () => fetchTopCoins();

function pctToColor(pct: number) {
  // pct range roughly -50..+50 map to red->grey->green
  const clamped = Math.max(-15, Math.min(15, pct));
  const ratio = (clamped + 15) / 30; // 0..1
  const r = Math.round(255 * (1 - ratio));
  const g = Math.round(255 * ratio);
  return `rgb(${r},${g},128)`; // reddish to greenish
}

export default function PriceHeatmap() {
  const { data } = useSWR<TopCoin[]>("top-coins", fetcher);
  const [hover, setHover] = useState<TopCoin | null>(null);
  if (!data) return null;

  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-3">24h Change Heatmap</h2>
      <div
        className="grid grid-cols-10 gap-1"
        onMouseLeave={() => setHover(null)}
      >
        {data.map((coin) => {
          const color = pctToColor(coin.price_change_percentage_24h);
          return (
            <div
              key={coin.id}
              className="relative h-8 cursor-pointer rounded-sm"
              style={{ backgroundColor: color }}
              onMouseEnter={() => setHover(coin)}
            />
          );
        })}
      </div>
      {hover && (
        <div className="mt-4 flex items-center gap-2">
          <img src={hover.image} alt={hover.symbol} className="h-5 w-5" />
          <span className="font-medium">{hover.name}</span>
          <span className="text-sm text-foreground/60 uppercase">{hover.symbol}</span>
          <span
            className={clsx(
              "text-sm font-semibold",
              hover.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-500"
            )}
          >
            {hover.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
      )}
    </section>
  );
}
