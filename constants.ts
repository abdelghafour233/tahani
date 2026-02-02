
import { Product, SiteSettings } from './types';

export const STORE_WHATSAPP_NUMBER = "212649075664";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'anime-v4',
    name: 'تحويل صورتك إلى أنمي ياباني',
    nameEn: 'Turn Photo into Anime',
    price: 19,
    category: 'anime',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
    rating: 5,
    reviewsCount: 2400,
    processingTime: '5 دقائق',
    description: `🎌 حول صورتك الشخصية إلى شخصية أنمي احترافية!
✨ جودة عالية 4K
🎨 ألوان زاهية وتفاصيل دقيقة
🚀 استلام فوري عبر الواتساب`
  },
  {
    id: 'professional-linkedin',
    name: 'بورتريه احترافي (LinkedIn)',
    nameEn: 'Professional Headshot AI',
    price: 29,
    category: 'professional',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 1850,
    processingTime: '10 دقائق',
    description: `👔 احصل على صورة شخصية احترافية لملفك المهني دون الحاجة لاستوديو.
✅ خلفيات مكتبية واضحة
✅ بدلات رسمية أنيقة
✅ تحسين ملامح الوجه والإضاءة`
  },
  {
    id: 'disney-3d',
    name: 'شخصية كرتونية 3D (أسلوب ديزني)',
    nameEn: '3D Cartoon Style',
    price: 25,
    category: '3d',
    image: 'https://images.unsplash.com/photo-1634838080334-28befa9fe80c?q=80&w=1000&auto=format&fit=crop',
    rating: 5,
    reviewsCount: 3200,
    processingTime: '8 دقائق',
    description: `🎬 شاهد نفسك كبطل في فيلم رسوم متحركة!
✨ تفاصيل ثلاثية الأبعاد مذهلة
✨ إضاءة سينمائية
✨ هدية مثالية للأصدقاء`
  },
  {
    id: 'cyberpunk-neon',
    name: 'سايبر بانك (المستقبل)',
    nameEn: 'Cyberpunk Neon Style',
    price: 20,
    category: 'art',
    image: 'https://images.unsplash.com/photo-1620641788421-7f1c91ade639?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 950,
    processingTime: '5 دقائق',
    description: `🌃 سافر إلى المستقبل مع أسلوب السايبر بانك.
⚡ أضواء نيون وإضاءة ليلية
⚡ ملابس مستقبلية
⚡ تأثيرات بصرية مذهلة`
  }
];

export const MOROCCAN_CITIES = ["الدار البيضاء", "الرباط", "مراكش", "طنجة", "أغادير", "فاس", "مكناس"].sort();

export const INITIAL_SETTINGS: SiteSettings = {
  domain: 'berrima.ai',
  nameServer: 'ns1.berrima.ai',
  googleSheetsUrl: '',
  adminPassword: '0631368627',
  pixels: {
    facebookPixelId: '',
    googleAnalyticsId: '',
    tiktokPixelId: '',
    textEvent: 'Generate'
  },
  monetag: {
    directLinkUrl: 'https://otieu.com/4/10518792',
    directLinkUrl2: 'https://otieu.com/4/10518800',
    zoneId: '3205664'
  },
  customHeadCode: '',
  customBodyCode: ''
};
