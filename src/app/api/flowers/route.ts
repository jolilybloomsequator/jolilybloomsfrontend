import { NextRequest, NextResponse } from "next/server";
import { flowerCatalogue } from "@/data/flowers";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(flowerCatalogue);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch flowers" },
      { status: 500 }
    );
  }
}
