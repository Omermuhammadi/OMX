"use client";

import useSWR from "swr";
import MetricCard from "@/components/MetricCard";
import { PieChart, TrendingUp } from "lucide-react";
import clsx from "clsx";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function FearGreedGauge({ value }: { value: number }) {
  // value 0..100 – map to rotation -90deg..90deg for needle
  const rotation = (value / 100) * 180 - 90;
  const color =
    value < 25
      ? "#ef4444"
      : value < 50
      ? "#f59e0b"
      : value < 75
      ? "#84cc16"
      : "#22c55e";
  return (
    <div className="relative w-32 h-16 mx-auto">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <path
          d="M5 50 A45 45 0 0 1 95 50"
          fill="none"
          stroke="#333"
          strokeWidth="8"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="12"
          stroke={color}
          strokeWidth="4"
          transform={`rotate(${rotation} 50 50)`}
          className="gauge-needle"
          style={{ animation: `pulse ${Math.max(0.6, 5 - value / 25)}s ease-in-out infinite` }}
        />
      </svg>
      <style jsx>{`
        @keyframes pulse {
          0% { transform-origin: 50% 100%; transform: scaleY(1); }
          50% { transform-origin: 50% 100%; transform: scaleY(0.85); }
          100% { transform-origin: 50% 100%; transform: scaleY(1); }
        }
      `}</style>
      <div className="absolute inset-0 flex items-end justify-center pb-1 text-xl font-semibold">
        {value}
      </div>
    </div>
  );
}

function AltSeasonBar({ index }: { index: number }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between text-xs text-foreground/60 px-1">
        <span>Bitcoin</span>
        <span>Altcoin</span>
      </div>
      <div className="relative h-3 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-700"
          style={{ width: `${index}%` }}
        />
      </div>
      <div className="text-center text-lg font-semibold">{index}/100</div>
    </div>
  );
}

export default function DashboardTiles() {
  const { data: market } = useSWR<{ marketCap: number; marketCapChange24h: number }>(
    "/api/analytics/market",
    fetcher,
    { refreshInterval: 3600000 }
  );
  const { data: fng } = useSWR<{ value: number; classification: string }>(
    "/api/analytics/fng",
    fetcher,
    { refreshInterval: 3600000 }
  );
  const { data: alt } = useSWR<{ index: number }>(
    "/api/analytics/altseason",
    fetcher,
    { refreshInterval: 3600000 }
  );

  const fmt = (n: number, digits = 0) =>
    Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: digits,
    }).format(n);

  return (
    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Market Cap */}
      <MetricCard
        label="Market Cap"
        value={market ? `$${fmt(market.marketCap, 2)}` : "—"}
        icon={<PieChart className="h-6 w-6 text-blue-500" />}
      />
      {/* 24h Change */}
      <MetricCard
        label="MktCap 24h %"
        value={market ? `${market.marketCapChange24h.toFixed(2)}%` : "—"}
        icon={<TrendingUp className={clsx("h-6 w-6", market && market.marketCapChange24h >= 0 ? "text-green-500" : "text-red-500")} />}
      />
      {/* Fear & Greed */}
      <div className="flex flex-col justify-between rounded-lg border border-black/5 dark:border-white/10 bg-white dark:bg-[#111] p-4 shadow-sm">
        <div className="text-xs text-foreground/60 uppercase tracking-wide mb-2">Fear & Greed</div>
        {fng ? <FearGreedGauge value={fng.value} /> : <div className="h-16" />}
        <div className="text-sm text-center mt-1 capitalize">{fng?.classification ?? "—"}</div>
      </div>
      {/* Altcoin Season */}
      <div className="flex flex-col justify-between rounded-lg border border-black/5 dark:border-white/10 bg-white dark:bg-[#111] p-4 shadow-sm">
        <div className="text-xs text-foreground/60 uppercase tracking-wide mb-2">Altcoin Season</div>
        <AltSeasonBar index={alt?.index ?? 23} />
      </div>
    </section>
  );
}
