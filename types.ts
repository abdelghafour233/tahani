
export type Category = 'electronics' | 'home' | 'cars';

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  category: Category;
  image: string;
  description: string;
}

export interface Order {
  id: string;
  customerName: string;
  city: string;
  phone: string;
  items: { productId: string; quantity: number; name: string; price: number }[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface PixelSettings {
  facebookPixelId: string;
  googleAnalyticsId: string;
  tiktokPixelId: string;
}

export interface SiteSettings {
  domain: string;
  nameServer: string;
  googleSheetsUrl: string;
  pixels: PixelSettings;
}

export interface CartItem extends Product {
  quantity: number;
}
