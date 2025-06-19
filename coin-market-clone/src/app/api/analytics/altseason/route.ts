import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  // Return static value of 23 instead of calling external API
  return NextResponse.json({ index: 23 });
}
