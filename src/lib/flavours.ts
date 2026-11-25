export type Flavour = {
  slug: string;
  name: string;
  displayName: string;
  tagline: string;
  city: string;
  description: string;
  ingredients: string[];
  spiceLevel: number; // 0-5
  tasteTags: string[];
  pairing: string;
  occasion: string;
  colors: {
    base: string;
    baseDark: string;
    accent: string;
    accentSoft: string;
    text: string;
    /** Guaranteed-readable text color for use on top of `accent` backgrounds. */
    accentForeground: string;
  };
  /** Extra gallery images (e.g. pack back) beyond the default `{slug}.png` front shot. */
  images?: string[];
  sizes?: { label: string; price?: number }[];
};

export const flavours: Flavour[] = [
  {
    slug: "classic-butter",
    name: "Classic Butter Flavour",
    displayName: "Classic Butter Flavour",
    tagline: "A Timeless Indulgence.",
    city: "Paris",
    description:
      "A love letter to the classics. Butter, a whisper of cream, and just enough salt — this is the flavour that started it all, done the way a French patisserie would insist it should be done.",
    ingredients: ["Popcorn kernels", "Butter", "Milk solids", "Sea salt", "Edible oil"],
    spiceLevel: 0,
    tasteTags: ["Buttery", "Creamy", "Comforting"],
    pairing: "Sparkling lemonade and Cola",
    occasion: "Movie Nights & Cozy weekends",
    images: [
      "/images/products/classic-butter.png",
      "/images/products/label/classic-butter-nutrition.png",
      "/images/products/label/classic-butter-barcode.png",
      "/images/products/label/classic-butter-fssai.png",
    ],
    colors: {
      base: "#16233F",
      baseDark: "#0D1526",
      accent: "#F4C349",
      accentSoft: "#FDE9AE",
      text: "#FFFBEF",
      accentForeground: "#0A1B33",
    },
  },
  {
    slug: "italian-cheese",
    name: "Italian Cheese",
    displayName: "Italian Cheese",
    tagline: "Every Bite, Cheese Delight!",
    city: "Rome",
    description:
      "Rich, indulgent, and a little dramatic — just like Rome itself. A blend of cheddar and parmesan-style seasoning clings to every kernel for a snack that's pure comfort.",
    ingredients: ["Popcorn kernels", "Cheddar cheese powder", "Parmesan-style seasoning", "Herbs", "Edible oil", "Salt"],
    spiceLevel: 1,
    tasteTags: ["Cheesy", "Savoury", "Rich"],
    pairing: "Iced coffee, Garlic Bread",
    occasion: "Date nights & Movie marathons",
    images: [
      "/images/products/italian-cheese.png",
      "/images/products/label/italian-cheese-nutrition.png",
      "/images/products/label/italian-cheese-barcode.png",
      "/images/products/label/italian-cheese-fssai.png",
    ],
    colors: {
      base: "#E8A926",
      baseDark: "#B37E12",
      accent: "#7A4A1E",
      accentSoft: "#FBE4A6",
      text: "#3A2A0C",
      accentForeground: "#FBF6EC",
    },
  },
  {
    slug: "indian-masala",
    name: "Indian Masala",
    displayName: "Indian Masala",
    tagline: "Crunch with the Desi Punch.",
    city: "Mumbai",
    description:
      "The flavour of home. A warm, aromatic masala built on cumin, chaat masala, star anise and cracked pepper — the same spice box that lives in every Indian kitchen, now on popcorn.",
    ingredients: ["Popcorn kernels", "Chaat masala", "Cumin", "Star anise", "Black pepper", "Red chilli", "Edible oil"],
    spiceLevel: 3,
    tasteTags: ["Spicy", "Aromatic", "Tangy"],
    pairing: "Masala chai or an iced filter coffee",
    occasion: "Sports screenings & Strolls",
    images: [
      "/images/products/indian-masala.png",
      "/images/products/label/indian-masala-nutrition.png",
      "/images/products/label/indian-masala-barcode.png",
      "/images/products/label/indian-masala-fssai.png",
    ],
    colors: {
      base: "#4A2359",
      baseDark: "#2E1538",
      accent: "#C98A2C",
      accentSoft: "#E6C892",
      text: "#FBF3FF",
      accentForeground: "#0A1B33",
    },
  },
  {
    slug: "portugal-peri-peri",
    name: "Portugal Peri-Peri",
    displayName: "Portugal Peri-Peri",
    tagline: "Zesty in every bite.",
    city: "Lisbon",
    description:
      "Coastal Portugal in a bowl — tangy peri-peri chillies, smoky paprika, and a citrus kick that mirrors the grill houses of Lisbon. Zesty enough to wake up any evening.",
    ingredients: ["Popcorn kernels", "Peri-peri seasoning", "Smoked paprika", "Lemon zest", "Garlic", "Edible oil"],
    spiceLevel: 3,
    tasteTags: ["Tangy", "Smoky", "Zesty"],
    pairing: "Citrus Coolers",
    occasion: "Weekend grill nights & sundowners",
    images: [
      "/images/products/portugal-peri-peri.png",
      "/images/products/label/portugal-peri-peri-nutrition.png",
      "/images/products/label/portugal-peri-peri-barcode.png",
      "/images/products/label/portugal-peri-peri-fssai.png",
    ],
    colors: {
      base: "#D9631B",
      baseDark: "#A6480E",
      accent: "#8F1D1D",
      accentSoft: "#F6C79A",
      text: "#FFF7EC",
      accentForeground: "#FBF6EC",
    },
  },
  {
    slug: "thai-chilli",
    name: "Thai Chilli",
    displayName: "Thai Chilli",
    tagline: "Spicy Burst of Flavours!",
    city: "Bangkok",
    description:
      "A bold, fiery popcorn coated in a vibrant blend of red chilli, garlic, and citrus-lemongrass warmth. Air-popped and generously seasoned for a bright, punchy kick in every handful.",
    ingredients: ["Popcorn kernels", "Thai chilli seasoning", "Red chilli", "Garlic", "Lemongrass notes", "Edible oil", "Salt"],
    spiceLevel: 4,
    tasteTags: ["Spicy", "Tangy", "Savoury"],
    pairing: "Chilled lychee soda & Lemonade ",
    occasion: "Beach Outings & Game Nights",
    colors: {
      base: "#6E1E38",
      baseDark: "#4A1226",
      accent: "#E8622B",
      accentSoft: "#F3B385",
      text: "#FFF6EE",
      accentForeground: "#0A1B33",
    },
  },
];

export function getFlavour(slug: string) {
  return flavours.find((f) => f.slug === slug);
}

/** Placeholder price until real pack pricing is finalised — edit this one constant to change it everywhere. */
export const DEFAULT_PRICE_INR = 40;

/** Sizes with a guaranteed `price`, defaulting any unset size/price to a single standard pack. */
export function getSizes(f: Flavour): { label: string; price: number }[] {
  if (f.sizes && f.sizes.length > 0) {
    return f.sizes.map((s) => ({ label: s.label, price: s.price ?? DEFAULT_PRICE_INR }));
  }
  return [{ label: "Standard Pack", price: DEFAULT_PRICE_INR }];
}
