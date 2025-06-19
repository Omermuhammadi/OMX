"use client";

import { useWatchlist } from "@/lib/watchlist";
import useSWR from "swr";
import { fetchTopCoins, TopCoin } from "@/lib/coingecko";
import { X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function WatchlistDrawer() {
  const { ids, holdings, setAmount, toggle } = useWatchlist();
  const { data } = useSWR<TopCoin[]>("top-coins", fetchTopCoins);
  const [open, setOpen] = useState(false);
  if (!data || ids.length === 0) return null;
  const coins = data.filter((c) => ids.includes(c.id));
  const total = coins.reduce((sum, c) => sum + (holdings[c.id] || 0) * c.current_price, 0);
  const totalChange = coins.reduce(
    (sum, c) => sum + (holdings[c.id] || 0) * c.current_price * (c.price_change_percentage_24h / 100),
    0
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700"
      >
        WL
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
      )}
      <aside
        className={clsx(
          "fixed top-0 right-0 z-50 h-full w-80 bg-background shadow-lg transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10">
          <h2 className="font-semibold">My Watchlist</h2>
          <button onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
          {coins.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <img src={c.image} className="h-5 w-5" />
                <span>{c.symbol.toUpperCase()}</span>
              </div>
              <input
                type="number"
                placeholder="Qty"
                className="w-20 rounded border border-black/20 dark:border-white/20 bg-transparent px-1 text-right text-sm"
                value={holdings[c.id] ?? ""}
                onChange={(e) => setAmount(c.id, parseFloat(e.target.value) || 0)}
              />
              <span className="text-sm text-right w-20">${c.current_price.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-black/10 dark:border-white/10 p-4 text-sm space-y-1">
          <div className="flex justify-between font-medium">
            <span>Total Value</span>
            <span>${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <div className={clsx("flex justify-between", totalChange >= 0 ? "text-green-600" : "text-red-500")}>
            <span>P/L 24h</span>
            <span>{totalChange >= 0 ? "+" : ""}${totalChange.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
