import { NextResponse } from "next/server";
import type { FlowerItem } from "@/data/flowers";
import {
  FLOWER_CATALOGUE_OBJECT_PATH,
  createSupabaseAdminClient,
} from "../../../lib/supabaseStorage";

export async function GET() {
  try {
    let supabaseCatalogue: FlowerItem[] = [];

    try {
      const { client: supabase, bucket } = createSupabaseAdminClient();
      const { data: catalogueBlob, error } = await supabase.storage
        .from(bucket)
        .download(FLOWER_CATALOGUE_OBJECT_PATH);

      if (!error && catalogueBlob) {
        const parsed = JSON.parse(await catalogueBlob.text());
        if (Array.isArray(parsed)) {
          supabaseCatalogue = parsed as FlowerItem[];
        }
      }
    } catch {
      // Return an empty catalogue when Supabase is unavailable.
    }

    return NextResponse.json(supabaseCatalogue);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch flowers" },
      { status: 500 }
    );
  }
}
