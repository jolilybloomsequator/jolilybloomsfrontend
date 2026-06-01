export const flowerHeroImages = [
  {
    src: "https://github.com/user-attachments/assets/0a7c787c-a886-4dd6-b1ff-c274b87fcdf6",
    alt: "Pink rose bloom with raindrops",
  },
  {
    src: "https://github.com/user-attachments/assets/8458bdc0-af4a-4e90-89ef-d71aed8b1994",
    alt: "White lily flower in bloom",
  },
  {
    src: "https://github.com/user-attachments/assets/f032738f-0885-4d45-8731-2740288d73d8",
    alt: "Mixed bouquet of colorful flowers",
  },
] as const;

export const aboutGalleryPhotos = [
  {
    src: "https://github.com/user-attachments/assets/97cb2598-b0b4-4ecf-9171-56ad7b8924da",
    alt: "Jolily Blooms about page photo one",
  },
  {
    src: "https://github.com/user-attachments/assets/dfcb0fa3-646a-46c7-836b-6566834be3c5",
    alt: "Jolily Blooms about page photo two",
  },
  {
    src: "https://github.com/user-attachments/assets/4e846db5-d8a3-4dcf-a956-5ea61f11dee1",
    alt: "Jolily Blooms about page photo three",
  },
] as const;

export const pageHeaderImages = {
  about: aboutGalleryPhotos[2],
  flowers: {
    src: "https://github.com/user-attachments/assets/f748c236-61ab-4109-bfbd-b13f2ec14da6",
    alt: "Floral background for the flowers page",
  },
  quality: {
    src: "https://github.com/user-attachments/assets/7d80c337-2ef9-4c0c-84a3-8cc909e82a84",
    alt: "Floral background for the quality page",
  },
  contact: {
    src: "https://github.com/user-attachments/assets/74bc2985-8323-4be5-a33d-213769490c95",
    alt: "Bright flowers arranged in a garden path",
  },
  faq: {
    src: "https://github.com/user-attachments/assets/4c4ce5ae-0fa6-40b2-82fb-54e7ee61a82a",
    alt: "Floral background for the FAQ page",
  },
  reviews: {
    src: flowerHeroImages[2].src,
    alt: "Floral background for the reviews page",
  },
  privacy: {
    src: "https://github.com/user-attachments/assets/56d9e2cf-4e5c-4af3-86a1-be62b781f6ae",
    alt: "Floral background for the privacy page",
  },
} as const;

export const pageHeaderImage = pageHeaderImages.flowers;
