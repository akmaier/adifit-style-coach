const runningShoes = '/attached_assets/generated_images/Athletic_running_shoes_product_41986024.png';
const trainingShoes = '/attached_assets/generated_images/Training_shoes_product_609a0c6f.png';
const lifestyleShoes = '/attached_assets/generated_images/Lifestyle_sneakers_product_51614ec6.png';
const compressionShirt = '/attached_assets/generated_images/Performance_compression_shirt_c579a882.png';
const athleticShorts = '/attached_assets/generated_images/Athletic_training_shorts_c778d546.png';
const trackJacket = '/attached_assets/generated_images/Athletic_track_jacket_22e84f94.png';
const duffleBag = '/attached_assets/generated_images/Athletic_duffle_bag_811f536c.png';
const baseballCap = '/attached_assets/generated_images/Athletic_baseball_cap_943ca288.png';
const waterBottle = '/attached_assets/generated_images/Athletic_water_bottle_fda09040.png';

export interface OutfitItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'shoes' | 'clothes' | 'accessories';
}

export interface SuggestedLook {
  id: string;
  name: string;
  shoes: OutfitItem;
  clothes: OutfitItem;
  accessories: OutfitItem;
  totalPrice: number;
}

export const outfitItems: OutfitItem[] = [
  {
    id: 'shoes-1',
    name: 'UltraBoost Running Shoes',
    description: 'Premium cushioning for maximum comfort',
    price: 180,
    image: runningShoes,
    category: 'shoes'
  },
  {
    id: 'shoes-2',
    name: 'Pro Training Sneakers',
    description: 'Versatile performance for any workout',
    price: 140,
    image: trainingShoes,
    category: 'shoes'
  },
  {
    id: 'shoes-3',
    name: 'Classic Lifestyle Kicks',
    description: 'Sleek style meets everyday comfort',
    price: 120,
    image: lifestyleShoes,
    category: 'shoes'
  },
  {
    id: 'clothes-1',
    name: 'Performance Compression Top',
    description: 'Moisture-wicking tech fabric',
    price: 60,
    image: compressionShirt,
    category: 'clothes'
  },
  {
    id: 'clothes-2',
    name: 'Athletic Training Shorts',
    description: 'Lightweight with secure pockets',
    price: 45,
    image: athleticShorts,
    category: 'clothes'
  },
  {
    id: 'clothes-3',
    name: 'Track Jacket',
    description: 'Classic three-stripe design',
    price: 85,
    image: trackJacket,
    category: 'clothes'
  },
  {
    id: 'accessories-1',
    name: 'Athletic Duffle Bag',
    description: 'Spacious with multiple compartments',
    price: 75,
    image: duffleBag,
    category: 'accessories'
  },
  {
    id: 'accessories-2',
    name: 'Performance Cap',
    description: 'Breathable with moisture management',
    price: 28,
    image: baseballCap,
    category: 'accessories'
  },
  {
    id: 'accessories-3',
    name: 'Premium Water Bottle',
    description: 'Insulated stainless steel 24oz',
    price: 32,
    image: waterBottle,
    category: 'accessories'
  }
];

export const suggestedLooks: SuggestedLook[] = [
  {
    id: 'look-1',
    name: 'Runner\'s Elite',
    shoes: outfitItems[0],
    clothes: outfitItems[3],
    accessories: outfitItems[8],
    totalPrice: 272
  },
  {
    id: 'look-2',
    name: 'Training Pro',
    shoes: outfitItems[1],
    clothes: outfitItems[4],
    accessories: outfitItems[7],
    totalPrice: 213
  },
  {
    id: 'look-3',
    name: 'Street Athlete',
    shoes: outfitItems[2],
    clothes: outfitItems[5],
    accessories: outfitItems[6],
    totalPrice: 280
  }
];
