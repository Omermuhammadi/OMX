"use client";

import useSWR from "swr";
import { fetchTopCoins, TopCoin } from "@/lib/coingecko";
import MetricCard from "@/components/MetricCard";
import {
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";
import clsx from "clsx";

const fetcher = () => fetchTopCoins();

export default function LocalAnalytics() {
  // Reuse top-coins cache so no extra network call.
  const { data } = useSWR<TopCoin[]>("top-coins", fetcher);

  if (!data) return null; // still loading

  const sorted = [...data].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
  );
  const topGainer = sorted[0];
  const topLoser = sorted[sorted.length - 1];

  const avgChange =
    data.reduce((sum, c) => sum + c.price_change_percentage_24h, 0) / data.length;

  const fmtPct = (n: number) => `${n.toFixed(2)}%`;

  return (
    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <MetricCard
        label={`Top Gainer (${topGainer.symbol.toUpperCase()})`}
        value={fmtPct(topGainer.price_change_percentage_24h)}
        icon={<ArrowUpRight className="h-6 w-6 text-green-600" />}
      />
      <MetricCard
        label={`Top Loser (${topLoser.symbol.toUpperCase()})`}
        value={fmtPct(topLoser.price_change_percentage_24h)}
        icon={<ArrowDownRight className="h-6 w-6 text-red-500" />}
      />
      <MetricCard
        label="Avg 24h Change"
        value={fmtPct(avgChange)}
        icon={<Activity className={clsx("h-6 w-6", avgChange >= 0 ? "text-green-600" : "text-red-500")} />}
      />
    </section>
  );
}
