import { NextResponse } from "next/server";
import { loadFlowerCatalogue } from "../../../lib/flowerCatalogue";

export async function GET() {
  try {
    return NextResponse.json(await loadFlowerCatalogue());
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch flowers" },
      { status: 500 }
    );
  }
}
