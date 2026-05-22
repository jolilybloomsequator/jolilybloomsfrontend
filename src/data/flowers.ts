export type FlowerItem = {
  id: string;
  name: string;
  botanicalName?: string;
  stemLength?: string;
  category?: string;
  color?: string;
  availability?: "Year-Round" | "Seasonal";
  image?: string; // Image filename, served via /api/flowers/image/[id]
};

// Static seed catalogue disabled while flowers are uploaded through the admin panel.
export const flowerCatalogue: FlowerItem[] = [];
