
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
    gallery: [
      'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 5,
    reviewsCount: 1240,
    description: `🍿 استمتع بأفضل الأفلام والمسلسلات بأعلى دقة ممكنة 4K ULTRA HD!

✅ حساب بريميوم رسمي ومضمون 100%.
✅ جودة فائقة ULTRA HD / HDR.
✅ يدعم جميع الأجهزة (تلفاز، هاتف، حاسوب).
✅ ضمان كامل طوال مدة الاشتراك.
✅ تسليم فوري للمعلومات عبر الواتساب بعد التأكيد.

📦 العرض: اشتراك شهر كامل بسعر حصري ومخفض.`
  },
  {
    id: 'canva-pro',
    name: 'اشتراك Canva Pro مدى الحياة',
    nameEn: 'Canva Pro Lifetime Access',
    price: 39,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 5,
    reviewsCount: 850,
    description: `🎨 صمم كالمحترفين مع كانفا برو!

✅ دخول كامل لجميع القوالب المدفوعة.
✅ إزالة خلفية الصور بضغطة واحدة.
✅ مساحة تخزين سحابية كبيرة.
✅ تفعيل رسمي على إيميلك الشخصي.
✅ ضمان ذهبي مدى الحياة.

🚀 التفعيل يتم في أقل من 30 دقيقة!`
  },
  {
    id: 'iptv-pro',
    name: 'اشتراك IPTV 4K - سنة كاملة',
    nameEn: 'IPTV 4K Subscription - 1 Year',
    price: 199,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 5,
    reviewsCount: 2100,
    description: `📺 جميع قنوات العالم بين يديك في اشتراك واحد!

✅ أكثر من 10,000 قناة عالمية وعربية.
✅ مكتبة ضخمة من الأفلام والمسلسلات المترجمة (VOD).
✅ استقرار تام وبدون تقطيع أثناء المباريات.
✅ يدعم جودة 4K و FHD.
✅ يعمل على Smart TV, Android, iPhone.

⚽ لا تفوت مباريات فريقك المفضل بعد اليوم!`
  }
];

export const MOROCCAN_CITIES = [
  "الدار البيضاء", "الرباط", "مراكش", "فاس", "طنجة", "أغادير", "مكناس", "وجدة", 
  "القنيطرة", "تطوان", "تمارة", "آسفي", "العيون", "المحمدية", "بني ملال", "الجديدة", 
  "تازة", "الناظور", "سطات", "القصر الكبير", "العرائش", "الخميسات", "تيزنيت", 
  "برشيد", "وادي زم", "الفقيه بن صالح", "إفران", "الداخلة", "قلعة السراغنة", 
  "تارودانت", "بركان", "سيدي قاسم", "خريبكة"
].sort();

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
  adsterra: {
    popunderScript: '<script src="https://bouncingbuzz.com/1b/bb/91/1bbb91b924fe9aa427cfa5a251caab9f.js"></script>',
    socialBarScript: '',
    nativeAdsScript: '',
    smartLinkUrl: 'https://bouncingbuzz.com/m9x9bfr9c?key=3ec907280f33c9f26699609cb53571d2'
  }
};
