export type FlowerItem = {
  id: string;
  name: string;
  botanicalName: string;
  stemLength: string;
  category: string;
  color: string;
  availability: "Year-Round" | "Seasonal";
  image?: string; // Image filename, served via /api/flowers/image/[id]
};

// Legacy: Import from flowers.json instead
import flowersData from "./flowers.json";

export const flowerCatalogue: FlowerItem[] = flowersData as FlowerItem[];
