
import { Product, SiteSettings } from './types';

export const STORE_WHATSAPP_NUMBER = "212649075664";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'netflix-1',
    name: 'اشتراك Netflix Premium ULTRA HD - شهر كامل',
    nameEn: 'Netflix Premium Subscription ULTRA HD - 1 Month',
    price: 35,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1000&auto=format&fit=crop'],
    rating: 5,
    reviewsCount: 1240,
    description: `🍿 استمتع بأفضل الأفلام والمسلسلات بأعلى دقة ممكنة 4K ULTRA HD!
✅ حساب بريميوم رسمي ومضمون 100%.
✅ ضمان كامل طوال مدة الاشتراك.
✅ تسليم فوري للمعلومات عبر الواتساب بعد التأكيد.`
  },
  {
    id: 'canva-pro',
    name: 'اشتراك Canva Pro مدى الحياة',
    nameEn: 'Canva Pro Lifetime Access',
    price: 39,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop'],
    rating: 5,
    reviewsCount: 850,
    description: `🎨 صمم كالمحترفين مع كانفا برو!
✅ دخول كامل لجميع القوالب المدفوعة.
✅ تفعيل رسمي على إيميلك الشخصي.
✅ ضمان ذهبي مدى الحياة.`
  }
];

export const MOROCCAN_CITIES = ["الدار البيضاء", "الرباط", "مراكش", "طنجة", "أغادير", "فاس", "مكناس"].sort();

export const INITIAL_SETTINGS: SiteSettings = {
  domain: 'berrima.store',
  nameServer: 'ns1.example.com, ns2.example.com',
  googleSheetsUrl: '',
  adminPassword: '0631368627',
  pixels: {
    facebookPixelId: '',
    googleAnalyticsId: '',
    tiktokPixelId: '',
    textEvent: 'Purchase'
  },
  monetag: {
    directLinkUrl: 'https://otieu.com/4/8584347',
    zoneId: '3205664'
  },
  customHeadCode: '',
  customBodyCode: ''
};
