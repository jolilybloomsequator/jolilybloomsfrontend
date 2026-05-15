import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { flowerCatalogue, FlowerItem } from "@/data/flowers";

const FLOWERS_DB_PATH = join(process.cwd(), "src/data/flowers.json");
const IMAGES_DIR = join(process.cwd(), "public/images/flowers");

function verifyAuth(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get("admin_session");
  return !!sessionCookie;
}

export async function POST(request: NextRequest) {
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: "Unauthorized - Please login first" }, { status: 401 });
  }

  try {
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

    // Handle image upload if provided
    let imageFilename = flower.image || `${flower.id}.jpg`;
    if (file) {
      const buffer = await file.arrayBuffer();
      const filename = `${flower.id}-${Date.now()}${file.name.substring(file.name.lastIndexOf("."))}`;
      const filepath = join(IMAGES_DIR, filename);

      try {
        writeFileSync(filepath, Buffer.from(buffer));
        imageFilename = filename;
        flower.image = filename;
      } catch (fileError) {
        console.error("File write error:", fileError);
        return NextResponse.json(
          { error: "Failed to save image file" },
          { status: 500 }
        );
      }
    }

    // Update flowers.json with new/updated flower data
    const flowers = JSON.parse(readFileSync(FLOWERS_DB_PATH, "utf-8")) as FlowerItem[];
    const existingIndex = flowers.findIndex(f => f.id === flower.id);
    
    if (existingIndex >= 0) {
      flowers[existingIndex] = { ...flowers[existingIndex], ...flower };
    } else {
      flowers.push(flower);
    }

    writeFileSync(FLOWERS_DB_PATH, JSON.stringify(flowers, null, 2), "utf-8");

    return NextResponse.json(
      { success: true, flower: { ...flower, image: imageFilename } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload flower" },
      { status: 500 }
    );
  }
}
