import { NextRequest, NextResponse } from "next/server";
import { FlowerItem } from "@/data/flowers";
import { MAX_FLOWER_IMAGE_SIZE_BYTES, MAX_FLOWER_IMAGE_SIZE_MB } from "@/lib/adminUpload";
import {
  FLOWER_CATALOGUE_OBJECT_PATH,
  createSupabaseAdminClient,
  sanitizeFilename,
} from "../../../../../lib/supabaseStorage";

function verifyAuth(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get("admin_session");
  return !!sessionCookie;
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized - Please login first" }, { status: 401 });
  }

  try {
    const { client: supabase, bucket } = createSupabaseAdminClient();
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const flowerData = formData.get("flower") as string;

    if (!flowerData) {
      return NextResponse.json(
        { error: "Missing flower data" },
        { status: 400 }
      );
    }

    // Parse flower metadata
    const flower: FlowerItem = JSON.parse(flowerData);

    // Validate required fields
    if (!flower.id || !flower.name) {
      return NextResponse.json(
        { error: "Flower must have id and name" },
        { status: 400 }
      );
    }

    // Handle image upload (stored in Supabase Storage)
    let imageValue = flower.image ?? "";
    if (file) {
      if (file.size > MAX_FLOWER_IMAGE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `Image file too large. Maximum allowed size is ${MAX_FLOWER_IMAGE_SIZE_MB}MB.` },
          { status: 413 }
        );
      }

      const extension = file.name.includes(".")
        ? file.name.substring(file.name.lastIndexOf("."))
        : "";
      const storagePath = `images/${sanitizeFilename(flower.id)}-${Date.now()}${extension}`;
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(storagePath, fileBuffer, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload image to storage" },
          { status: 500 }
        );
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(storagePath);

      imageValue = publicUrlData.publicUrl;
      flower.image = imageValue;
    }

    // Load existing catalogue from Supabase Storage (or start empty)
    let flowers: FlowerItem[] = [];
    const { data: existingCatalogueBlob, error: downloadError } = await supabase.storage
      .from(bucket)
      .download(FLOWER_CATALOGUE_OBJECT_PATH);

    if (existingCatalogueBlob && !downloadError) {
      try {
        flowers = (JSON.parse(await existingCatalogueBlob.text()) as FlowerItem[]) ?? [];
      } catch (parseError) {
        console.warn("Failed to parse existing catalogue JSON, starting fresh.", parseError);
      }
    }

    // Upsert flower metadata in catalogue
    const existingIndex = flowers.findIndex(f => f.id === flower.id);
    
    if (existingIndex >= 0) {
      flowers[existingIndex] = { ...flowers[existingIndex], ...flower };
    } else {
      flowers.push(flower);
    }

    const catalogueBuffer = Buffer.from(JSON.stringify(flowers, null, 2));
    const { error: catalogueUploadError } = await supabase.storage
      .from(bucket)
      .upload(FLOWER_CATALOGUE_OBJECT_PATH, catalogueBuffer, {
        contentType: "application/json",
        upsert: true,
      });

    if (catalogueUploadError) {
      console.error("Supabase catalogue upload error:", catalogueUploadError);
      return NextResponse.json(
        { error: "Failed to save flower metadata" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, flower: { ...flower, image: imageValue || flower.image } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload flower. Check Supabase env configuration." },
      { status: 500 }
    );
  }
}
