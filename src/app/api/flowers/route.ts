import { NextResponse } from "next/server";
import { flowerCatalogue, type FlowerItem } from "@/data/flowers";
import {
  FLOWER_CATALOGUE_OBJECT_PATH,
  createSupabaseAdminClient,
} from "../../../lib/supabaseStorage";

function mergeFlowerCatalogues(base: FlowerItem[], incoming: FlowerItem[]) {
  const map = new Map<string, FlowerItem>();

  for (const flower of base) {
    map.set(flower.id, flower);
  }

  for (const flower of incoming) {
    if (typeof flower?.id === "string" && flower.id.trim().length > 0) {
      map.set(flower.id, flower);
    }
  }

  return Array.from(map.values());
}

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
      // Fallback to local static catalogue when Supabase is unavailable.
    }

    return NextResponse.json(mergeFlowerCatalogues(flowerCatalogue, supabaseCatalogue));
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch flowers" },
      { status: 500 }
    );
  }
}
