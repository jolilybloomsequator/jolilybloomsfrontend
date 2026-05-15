import { NextRequest, NextResponse } from "next/server";
import { flowerCatalogue, FlowerItem } from "@/data/flowers";
import {
  FLOWER_CATALOGUE_OBJECT_PATH,
  createSupabaseAdminClient,
} from "@/lib/supabaseStorage";

function verifyAuth(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get("admin_session");
  return !!sessionCookie;
}

function getStorageObjectPathFromPublicUrl(url: string, bucket: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const marker = `/storage/v1/object/public/${bucket}/`;
    const index = parsedUrl.pathname.indexOf(marker);

    if (index < 0) {
      return null;
    }

    return parsedUrl.pathname.slice(index + marker.length);
  } catch {
    return null;
  }
}

async function loadCatalogue(): Promise<{ supabase: ReturnType<typeof createSupabaseAdminClient>["client"]; bucket: string; flowers: FlowerItem[] }> {
  const { client: supabase, bucket } = createSupabaseAdminClient();
  let flowers: FlowerItem[] = [];

  const { data: catalogueBlob, error: downloadError } = await supabase.storage
    .from(bucket)
    .download(FLOWER_CATALOGUE_OBJECT_PATH);

  if (!downloadError && catalogueBlob) {
    try {
      const parsed = JSON.parse(await catalogueBlob.text());
      if (Array.isArray(parsed)) {
        flowers = parsed as FlowerItem[];
      }
    } catch {
      flowers = [];
    }
  }

  return { supabase, bucket, flowers };
}

export async function GET(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized - Please login first" }, { status: 401 });
  }

  try {
    try {
      const { flowers } = await loadCatalogue();
      return NextResponse.json(flowers);
    } catch {
      return NextResponse.json(flowerCatalogue);
    }
  } catch {
    return NextResponse.json({ error: "Failed to fetch flowers" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized - Please login first" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = typeof body?.id === "string" ? body.id.trim() : "";

    if (!id) {
      return NextResponse.json({ error: "Flower id is required" }, { status: 400 });
    }

    const { supabase, bucket, flowers } = await loadCatalogue();
    const flowerIndex = flowers.findIndex((item) => item.id === id);

    if (flowerIndex < 0) {
      return NextResponse.json({ error: "Flower not found" }, { status: 404 });
    }

    const [deletedFlower] = flowers.splice(flowerIndex, 1);

    const catalogueBuffer = Buffer.from(JSON.stringify(flowers, null, 2));
    const { error: catalogueUploadError } = await supabase.storage
      .from(bucket)
      .upload(FLOWER_CATALOGUE_OBJECT_PATH, catalogueBuffer, {
        contentType: "application/json",
        upsert: true,
      });

    if (catalogueUploadError) {
      return NextResponse.json({ error: "Failed to update catalogue" }, { status: 500 });
    }

    if (deletedFlower?.image) {
      const storagePath = getStorageObjectPathFromPublicUrl(deletedFlower.image, bucket);
      if (storagePath) {
        await supabase.storage.from(bucket).remove([storagePath]);
      }
    }

    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json({ error: "Failed to delete flower" }, { status: 500 });
  }
}
