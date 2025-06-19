"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetchTopCoins, TopCoin } from "@/lib/coingecko";
import clsx from "clsx";
import { Star, StarOff } from "lucide-react";
import { useWatchlist } from "@/lib/watchlist";

const fetcher = () => fetchTopCoins();

export default function TopCoinsTable() {
  const { data, error, isLoading } = useSWR<TopCoin[]>("top-coins", fetcher, {
    refreshInterval: 15000,
    dedupingInterval: 4000,
    keepPreviousData: true,
  });

  const [query, setQuery] = useState("");
  const { ids, toggle } = useWatchlist();

  if (error && !data)
    return (
      <p className="text-center text-red-500">Failed to load coins: {String(error.message ?? error)}</p>
    );

  if (!data || isLoading)
    return <p className="text-center text-sm text-muted-foreground">Loading coins…</p>;

  const filtered: TopCoin[] = data.filter((coin: TopCoin) => {
    const q = query.toLowerCase();
    return (
      coin.name.toLowerCase().includes(q) || coin.symbol.toLowerCase().includes(q)
    );
  });

  return (
    <section className="mt-10">
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search by name or symbol…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-64 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-[#111] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-black/5 dark:border-white/10 shadow-sm">
        <table className="min-w-full divide-y divide-black/5 dark:divide-white/10 text-sm">
          <thead className="bg-gray-50 dark:bg-[#1b1b1b]">
            <tr>
              <th className="px-4 py-3 text-left font-medium"></th>
              <th className="px-4 py-3 text-left font-medium">#</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-right font-medium">Price</th>
              <th className="px-4 py-3 text-right font-medium">24h %</th>
              <th className="px-4 py-3 text-right font-medium">Market Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {filtered.map((coin) => (
              <tr key={coin.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                <td className="px-4 py-3 whitespace-nowrap">
                  <button onClick={() => toggle(coin.id)}>
                    {ids.includes(coin.id) ? (
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <StarOff className="h-4 w-4 text-foreground/40" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{coin.market_cap_rank}</td>
                <td className="px-4 py-3 flex items-center gap-2 whitespace-nowrap">
                  <img src={coin.image} alt="logo" className="h-5 w-5" />
                  <span className="font-medium">{coin.name}</span>
                  <span className="text-foreground/60 uppercase text-xs">{coin.symbol}</span>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td
                  className={clsx(
                    "px-4 py-3 text-right whitespace-nowrap",
                    coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-500"
                  )}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
