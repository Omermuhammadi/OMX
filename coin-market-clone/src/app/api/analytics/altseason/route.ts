import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const res = await fetch("https://api.blockchaincenter.net/api/v1/altcoin_season", {
    next: { revalidate },
  });
  if (!res.ok) return new NextResponse("error", { status: res.status });
  const json = await res.json();
  // index 0..100
  return NextResponse.json({ index: json.index });
}
