"use client";

import MetricCard from "@/components/MetricCard";
import {
  BarChart2,
  PieChart,
  TrendingUp,
  Wallet,
} from "lucide-react";

const STATIC_DATA = {
  total_market_cap: 2600000000000,
  total_volume: 120000000000,
  btc_dominance: 51.2,
  eth_dominance: 14.6,
};

const fmt = (n: number, digits = 0) =>
  Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: digits,
  }).format(n);

export default function StaticGlobalMetrics() {
  return (
    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="Total Market Cap"
        value={`$${fmt(STATIC_DATA.total_market_cap, 2)}`}
        icon={<PieChart className="h-6 w-6 text-blue-500" />}
      />
      <MetricCard
        label="24h Volume"
        value={`$${fmt(STATIC_DATA.total_volume, 2)}`}
        icon={<BarChart2 className="h-6 w-6 text-teal-500" />}
      />
      <MetricCard
        label="BTC Dominance"
        value={`${STATIC_DATA.btc_dominance.toFixed(1)}%`}
        icon={<TrendingUp className="h-6 w-6 text-orange-400" />}
      />
      <MetricCard
        label="ETH Dominance"
        value={`${STATIC_DATA.eth_dominance.toFixed(1)}%`}
        icon={<Wallet className="h-6 w-6 text-purple-500" />}
      />
    </section>
  );
}
