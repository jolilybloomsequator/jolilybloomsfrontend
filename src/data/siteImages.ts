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
    src: "https://github.com/user-attachments/assets/9233ab03-eb79-4182-9170-5ad7a8d37e3a",
    alt: "Flower field with a gardener holding a bouquet",
  },
  quality: {
    src: "https://github.com/user-attachments/assets/b6aea04f-ec6b-45e4-b76e-b104ad488a86",
    alt: "Rows of blooming flowers in a field",
  },
  contact: {
    src: "https://github.com/user-attachments/assets/74bc2985-8323-4be5-a33d-213769490c95",
    alt: "Bright flowers arranged in a garden path",
  },
  faq: {
    src: "https://github.com/user-attachments/assets/bf83233b-21e0-4633-9bf6-5f4154bc776a",
    alt: "Vibrant flowers in a field",
  },
  privacy: flowerHeroImages[2],
} as const;

export const pageHeaderImage = pageHeaderImages.flowers;
