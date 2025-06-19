"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetchTopCoins, TopCoin } from "@/lib/coingecko";

const FIAT = [
  { id: "usd", symbol: "USD", price: 1 },
  { id: "eur", symbol: "EUR", price: 0.93 },
];

const fetcher = () => fetchTopCoins();

type Option = { id: string; symbol: string; price: number };

export default function CurrencyConverter() {
  const { data } = useSWR<TopCoin[]>("top-coins", fetcher);
  const [fromId, setFromId] = useState("btc");
  const [toId, setToId] = useState("usd");
  const [amount, setAmount] = useState(1);

  if (!data) return null;
  const coinOptions: Option[] = data.slice(0, 50).map((c) => ({ id: c.id, symbol: c.symbol.toUpperCase(), price: c.current_price }));
  const options: Option[] = [...coinOptions, ...FIAT];

  const price = (id: string) => options.find((o) => o.id === id)?.price ?? 0;
  const result = (amount * price(fromId)) / price(toId);

  return (
    <section className="mb-10 max-w-md mx-auto bg-white dark:bg-[#111] rounded-lg shadow-sm p-5">
      <h2 className="font-semibold mb-4 text-center">Currency Converter</h2>
      <div className="grid grid-cols-3 gap-3 items-center">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          className="col-span-3 sm:col-span-1 rounded-md border border-black/10 dark:border-white/20 px-3 py-2 bg-transparent"
        />
        <select
          value={fromId}
          onChange={(e) => setFromId(e.target.value)}
          className="col-span-3 sm:col-span-1 rounded-md border border-black/10 dark:border-white/20 px-3 py-2 bg-transparent"
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.symbol}
            </option>
          ))}
        </select>
        <span className="hidden sm:block text-center">=</span>
        <div className="col-span-3 sm:col-span-1 rounded-md border border-black/10 dark:border-white/20 px-3 py-2 bg-black/5 dark:bg-white/5 flex items-center">
          {result.toLocaleString(undefined, { maximumFractionDigits: 6 })} {options.find((o) => o.id === toId)?.symbol}
        </div>
        <select
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          className="col-span-3 sm:col-span-1 rounded-md border border-black/10 dark:border-white/20 px-3 py-2 bg-transparent"
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.symbol}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
