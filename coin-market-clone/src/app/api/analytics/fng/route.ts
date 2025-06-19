import { NextResponse } from "next/server";

export const revalidate = 3600; // 1h

export async function GET() {
  const res = await fetch("https://api.alternative.me/fng/?limit=1", {
    next: { revalidate },
  });
  if (!res.ok) return new NextResponse("error", { status: res.status });
  const json = await res.json();
  const item = json.data[0];
  return NextResponse.json({
    value: Number(item.value),
    classification: item.value_classification,
  });
}
