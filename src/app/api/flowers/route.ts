import { NextResponse } from "next/server";
import { flowerCatalogue } from "@/data/flowers";
import { FLOWER_CATALOGUE_OBJECT_PATH, createSupabaseAdminClient } from "@/lib/supabaseStorage";

export async function GET() {
  try {
    try {
      const { client: supabase, bucket } = createSupabaseAdminClient();
      const { data: catalogueBlob, error } = await supabase.storage
        .from(bucket)
        .download(FLOWER_CATALOGUE_OBJECT_PATH);

      if (!error && catalogueBlob) {
        const parsed = JSON.parse(await catalogueBlob.text());
        if (Array.isArray(parsed)) {
          return NextResponse.json(parsed);
        }
      }
    } catch {
      // Fallback to local static catalogue when Supabase is unavailable.
    }

    return NextResponse.json(flowerCatalogue);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch flowers" },
      { status: 500 }
    );
  }
}
