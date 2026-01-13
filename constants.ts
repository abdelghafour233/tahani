
import { Product, SiteSettings } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'e1',
    name: 'هاتف ذكي ألترا 2024',
    nameEn: 'Smartphone Ultra 2024',
    price: 4500,
    category: 'electronics',
    image: 'https://picsum.photos/seed/phone/600/400',
    description: 'أحدث هاتف ذكي بمواصفات عالمية وكاميرا احترافية بدقة عالية.'
  },
  {
    id: 'e2',
    name: 'سماعات لاسلكية برو',
    nameEn: 'Wireless Headphones Pro',
    price: 850,
    category: 'electronics',
    image: 'https://picsum.photos/seed/headphone/600/400',
    description: 'عزل ضوضاء فائق وصوت نقي جداً للاستمتاع بالموسيقى.'
  },
  {
    id: 'h1',
    name: 'ماكينة تحضير القهوة',
    nameEn: 'Coffee Machine Elite',
    price: 1200,
    category: 'home',
    image: 'https://picsum.photos/seed/coffee/600/400',
    description: 'استمتع بأفضل كوب قهوة في منزلك كل صباح بكل سهولة.'
  },
  {
    id: 'h2',
    name: 'مكنسة كهربائية ذكية',
    nameEn: 'Smart Vacuum Cleaner',
    price: 2100,
    category: 'home',
    image: 'https://picsum.photos/seed/vacuum/600/400',
    description: 'تنظيف ذكي لجميع أنواع الأرضيات مع تحكم عبر الهاتف.'
  },
  {
    id: 'c1',
    name: 'سيارة سيدان اقتصادية',
    nameEn: 'Eco Sedan Car',
    price: 185000,
    category: 'cars',
    image: 'https://picsum.photos/seed/car1/600/400',
    description: 'سيارة عائلية مثالية باستهلاك وقود منخفض جداً وأمان عالٍ.'
  },
  {
    id: 'c2',
    name: 'سيارة دفع رباعي فاخرة',
    nameEn: 'Luxury SUV',
    price: 420000,
    category: 'cars',
    image: 'https://picsum.photos/seed/car2/600/400',
    description: 'القوة والرفاهية في سيارة واحدة للطرق الوعرة والمدن.'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  domain: 'myshop.ma',
  nameServer: 'ns1.example.com, ns2.example.com',
  googleSheetsUrl: '',
  pixels: {
    facebookPixelId: '',
    googleAnalyticsId: '',
    tiktokPixelId: ''
  }
};
