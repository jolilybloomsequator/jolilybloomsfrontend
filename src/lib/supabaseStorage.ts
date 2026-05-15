import { createClient } from "@supabase/supabase-js";

export const FLOWER_CATALOGUE_OBJECT_PATH = "catalogue/flowers.json";

export function getSupabaseStorageConfig() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET;

  if (!url || !serviceRoleKey || !bucket) {
    return null;
  }

  return { url, serviceRoleKey, bucket };
}

export function createSupabaseAdminClient() {
  const config = getSupabaseStorageConfig();

  if (!config) {
    throw new Error(
      "Supabase Storage is not configured. Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY, and SUPABASE_STORAGE_BUCKET.",
    );
  }

  return {
    client: createClient(config.url, config.serviceRoleKey),
    bucket: config.bucket,
  };
}

export function sanitizeFilename(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
