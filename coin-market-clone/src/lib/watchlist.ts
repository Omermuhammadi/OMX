import { useEffect, useState } from "react";

const WL_KEY = "watchlist";
const HOLD_KEY = "holdings";

type HoldingsMap = Record<string, number>;

export function useWatchlist() {
  const [ids, setIds] = useState<string[]>([]);
  const [holdings, setHoldings] = useState<HoldingsMap>({});

  useEffect(() => {
    setIds(JSON.parse(localStorage.getItem(WL_KEY) || "[]"));
    setHoldings(JSON.parse(localStorage.getItem(HOLD_KEY) || "{}"));
  }, []);

  const saveIds = (next: string[]) => {
    setIds(next);
    localStorage.setItem(WL_KEY, JSON.stringify(next));
  };
  const saveHold = (map: HoldingsMap) => {
    setHoldings(map);
    localStorage.setItem(HOLD_KEY, JSON.stringify(map));
  };

  const toggle = (id: string) => {
    saveIds(ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]);
  };

  const setAmount = (id: string, amt: number) => {
    const next = { ...holdings, [id]: amt };
    saveHold(next);
  };

  return { ids, toggle, holdings, setAmount };
}
