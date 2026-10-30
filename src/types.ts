export interface Product {
  id: string;
  name: string;
  producerId: string;
  producerName: string;
  producerDistance: string;
  producerRegion: string;
  category: 'produce' | 'bakery' | 'dairy' | 'pantry' | 'orchard';
  price: number;
  unit: string;
  weightLabel: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  dietary: ('Bio' | 'Local' | 'Heirloom' | 'AOP' | 'Gluten Free')[];
  description: string;
  originStory: string;
  harvestDate: string;
  ingredients?: string;
  storageTip: string;
  inStock: boolean;
  stockQuantity: number;
  badge?: string;
  isSeasonalHighlight?: boolean;
}

export interface Producer {
  id: string;
  name: string;
  craft: string;
  location: string;
  distanceKm: number;
  establishedYear: number;
  specialties: string[];
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  certifications: string[];
  nextDeliverySlot: string;
  rating: number;
  productCount: number;
}

export interface HarvestBasket {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  description: string;
  imageUrl: string;
  itemsCount: number;
  servings: string;
  contents: {
    name: string;
    producer: string;
    quantity: string;
  }[];
  seasonalNote: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliverySlot: string;
  deliveryDate: string;
  recipientName: string;
  address: string;
  phone: string;
  paymentMethod: string;
  status: 'Harvesting' | 'Crated' | 'In Delivery' | 'Delivered';
}
