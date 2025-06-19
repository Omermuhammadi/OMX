const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? "";

export interface TopCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
}

export interface GlobalMetricsResponse {
  data: {
    active_cryptocurrencies: number;
    upcoming_icos: number;
    ongoing_icos: number;
    ended_icos: number;
    markets: number;
    total_market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    market_cap_percentage: Record<string, number>;
    market_cap_change_percentage_24h_usd: number;
    updated_at: number;
  };
}

export async function fetchGlobalMetrics(): Promise<GlobalMetricsResponse["data"]> {
  const headers: Record<string, string> = {};
  if (API_KEY) {
    headers["x-cg-pro-api-key"] = API_KEY;
  }
  const res = await fetch(`/api/global`, {
    next: { revalidate: 3600 },
    headers,

  });
  if (!res.ok) {
    throw new Error(`CoinGecko error: ${res.status}`);
  }
  const json: GlobalMetricsResponse = await res.json();
  return json.data;
}

export async function fetchTopCoins(perPage = 100): Promise<TopCoin[]> {
  const headers: Record<string, string> = {};
  if (API_KEY) headers["x-cg-pro-api-key"] = API_KEY;

  const url = `/api/coins`;
  const res = await fetch(url, {
    headers,
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`CoinGecko error: ${res.status}`);
  return res.json();
}
