import { NextResponse } from "next/server";

const API_BASE = "https://api.coingecko.com/api/v3";
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? "";

export const revalidate = 60; // cache this route for 60 seconds

export async function GET() {
  const headers: Record<string, string> = {};
  if (API_KEY) headers["x-cg-pro-api-key"] = API_KEY;

  const res = await fetch(`${API_BASE}/global`, {
    headers,
    next: { revalidate },
  });

  if (!res.ok) {
    return new NextResponse("CoinGecko error", { status: res.status });
  }

  const json = await res.json();
  return NextResponse.json(json.data);
}
