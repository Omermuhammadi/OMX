"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import MetricCard from "@/components/MetricCard";
import { fetchGlobalMetrics } from "@/lib/coingecko";
import {
  BarChart2,
  PieChart,
  TrendingUp,
  Wallet,
} from "lucide-react";

const fetcher = () => fetchGlobalMetrics();

export default function GlobalMetrics() {
  const { data, error } = useSWR("global-metrics", fetcher);



  if (error)
    return (
      <p className="text-center text-red-500">Failed to load market data: {String(error.message ?? error)}</p>
    );

  if (!data)
    return (
      <p className="text-center text-sm text-muted-foreground">Loading global metrics…</p>
    );

  const fmt = (n: number, digits = 0) =>
    Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: digits,
    }).format(n);

  return (
    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="Total Market Cap"
        value={`$${fmt(data.total_market_cap.usd, 2)}`}
        icon={<PieChart className="h-6 w-6 text-blue-500" />}
      />
      <MetricCard
        label="24h Volume"
        value={`$${fmt(data.total_volume.usd, 2)}`}
        icon={<BarChart2 className="h-6 w-6 text-teal-500" />}
      />
      <MetricCard
        label="BTC Dominance"
        value={`${data.market_cap_percentage.btc.toFixed(1)}%`}
        icon={<TrendingUp className="h-6 w-6 text-orange-400" />}
      />
      <MetricCard
        label="ETH Dominance"
        value={`${data.market_cap_percentage.eth.toFixed(1)}%`}
        icon={<Wallet className="h-6 w-6 text-purple-500" />}
      />
    </section>
  );
}
