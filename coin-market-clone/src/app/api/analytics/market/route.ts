import { NextResponse } from "next/server";

// Uses CoinGecko `/global` endpoint. Cache 1h -> 3600 seconds.
export const revalidate = 3600;

export async function GET() {
  const res = await fetch("https://api.coingecko.com/api/v3/global", {
    next: { revalidate },
  });
  if (!res.ok) return new NextResponse("error", { status: res.status });
  const json = await res.json();
  // We only forward what we need to keep payload small
  const { total_market_cap, market_cap_change_percentage_24h_usd } = json.data;
  return NextResponse.json({
    marketCap: total_market_cap.usd,
    marketCapChange24h: market_cap_change_percentage_24h_usd,
  });
}
