
import { Product, SiteSettings } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'sg1',
    name: 'نظارات ذكية Bluetooth 5.3',
    nameEn: 'Smart Bluetooth Glasses Pro',
    price: 349,
    category: 'electronics',
    image: 'https://tmpfiles.org/dl/19667456/storimage_9pbbtke24.png',
    gallery: [
      'https://tmpfiles.org/dl/19667456/storimage_9pbbtke24.png',
      'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1556656793-062ff987b50d?auto=format&fit=crop&q=80&w=1000'
    ],
    rating: 5,
    reviewsCount: 184,
    description: `⭐⭐⭐⭐⭐ النظارات الذكية الأكثر مبيعاً - الإصدار المطور 2024

اكتشف متعة الدمج بين الأناقة الكلاسيكية والتكنولوجيا المتطورة. هذه النظارات ليست مجرد إكسسوار، بل هي رفيقك الذكي للرد على المكالمات والاستماع للموسيقى المفضلة لديك دون الحاجة لسماعات الأذن التقليدية.

✅ صوت ستيريو محيطي (Open-Ear Audio) يحافظ على خصوصيتك.
✅ ميكروفون مدمج عالي الدقة لإجراء المكالمات بوضوح تام.
✅ عدسات حماية متطورة تحمي العين من الأشعة الزرقاء الضارة.
✅ بطارية تدوم طويلاً (حتى 6 ساعات من الاستخدام المتواصل).
✅ تصميم خفيف الوزن ومريح جداً للاستخدام طوال اليوم.
✅ متوافقة مع جميع أجهزة الآيفون والأندرويد.

📦 العرض الحالي: توصيل مجاني لجميع مدن المغرب + الدفع عند الاستلام.`
  }
];

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
  }
};
