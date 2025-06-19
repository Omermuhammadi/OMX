import { NextResponse } from "next/server";

const API_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? "";

export const revalidate = 0; // disable route cache for realtime

export async function GET() {
  const headers: Record<string, string> = {};
  if (API_KEY) headers["x-cg-pro-api-key"] = API_KEY;

  const url = `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
  const res = await fetch(url, { headers, cache: "no-store" });

  if (!res.ok) {
    return new NextResponse("CoinGecko error", { status: res.status });
  }
  const json = await res.json();
  return NextResponse.json(json);
}
