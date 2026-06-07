import { createSupabaseAdminClient, FLOWER_CATALOGUE_OBJECT_PATH } from "./supabaseStorage";
import type { FlowerItem } from "../data/flowers";

export async function loadFlowerCatalogue(): Promise<FlowerItem[]> {
  try {
    const { client: supabase, bucket } = createSupabaseAdminClient();
    const { data: catalogueBlob, error } = await supabase.storage
      .from(bucket)
      .download(FLOWER_CATALOGUE_OBJECT_PATH);

    if (error || !catalogueBlob) {
      return [];
    }

    const parsed = JSON.parse(await catalogueBlob.text());
    return Array.isArray(parsed) ? (parsed as FlowerItem[]) : [];
  } catch {
    return [];
  }
}
