
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { STORE_WHATSAPP_NUMBER } from '../constants';
import { 
  Share2, 
  ShieldCheck, 
  Zap, 
  Star, 
  MessageSquare, 
  Minus, 
  Plus,
  Facebook,
  Twitter,
  MessageCircle,
  Link as LinkIcon,
  Key,
  CheckCircle2
} from 'lucide-react';

// Custom Pinterest Icon for better UX
const PinterestIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.289 2C6.617 2 2 6.617 2 12.289c0 4.332 2.674 8.013 6.457 9.531-.088-.81-.166-2.052.034-2.937.181-.794 1.166-4.943 1.166-4.943s-.297-.595-.297-1.474c0-1.383.801-2.415 1.8-2.415.849 0 1.258.637 1.258 1.402 0 .854-.544 2.131-.823 3.312-.235.988.494 1.794 1.467 1.794 1.76 0 3.117-1.857 3.117-4.539 0-2.373-1.706-4.033-4.143-4.033-2.826 0-4.484 2.119-4.484 4.31 0 .854.329 1.77.738 2.268.081.098.092.184.068.285-.074.312-.241.985-.274 1.121-.044.177-.145.214-.334.126-1.24-.577-2.015-2.389-2.015-3.845 0-3.13 2.275-6.005 6.558-6.005 3.444 0 6.12 2.455 6.12 5.734 0 3.42-2.157 6.174-5.152 6.174-1.006 0-1.95-.523-2.274-1.141l-.618 2.356c-.223.858-.826 1.933-1.229 2.589 1.056.326 2.174.502 3.334.502 5.672 0 10.289-4.617 10.289-10.289S17.961 2 12.289 2z"/>
  </svg>
);

interface ProductDetailPageProps {
  products: Product[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="text-center py-20 dark:text-gray-400">المنتج غير موجود</div>;
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `اكتشف هذا المنتج الرائع في berrima.store: ${product.name}`;
    const image = product.image;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'pinterest':
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('✅ تم نسخ رابط المنتج بنجاح!');
        break;
    }
  };

  const total = product.price * quantity;

  const handleDirectWhatsAppOrder = () => {
    const message = `مرحباً berrima.store 👋%0A%0Aأود طلب الخدمة التالية:%0A📦 *${product.name}*%0A🔢 *الكمية:* ${quantity}%0A💰 *الإجمالي:* ${total} درهم%0A%0Aيرجى تزويدي بطرق الدفع وكيفية التفعيل.`;
    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-20">
        {/* Gallery Section */}
        <div className="space-y-6">
          <div className="rounded-[40px] overflow-hidden border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl flex items-center justify-center aspect-square md:aspect-auto">
            <img 
              src={selectedImage || product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-700" 
            />
          </div>
          
          {galleryImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar justify-start">
              {galleryImages.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-24 h-24 rounded-3xl overflow-hidden border-4 transition-all p-1 bg-white dark:bg-slate-800 ${selectedImage === img ? 'border-brand-600 scale-105 shadow-lg' : 'border-transparent opacity-60'}`}
                >
                  <img src={img} alt={`${product.name} ${index}`} className="w-full h-full object-cover rounded-2xl" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <span className="bg-brand-500/10 text-brand-600 dark:text-brand-400 px-5 py-2 rounded-full text-sm font-black mb-6 inline-flex items-center gap-2 border border-brand-500/20">
              <Zap size={16} className="fill-brand-600" /> تفعيل فوري ومضمون
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tighter">{product.name}</h1>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className={`${i < (product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                ))}
              </div>
              <span className="text-slate-500 dark:text-slate-400 font-bold text-lg">({product.reviewsCount || 120}+ تقييم إيجابي)</span>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[35px] mb-10 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
            <div className="text-center md:text-right">
              <div className="text-5xl font-black text-brand-600 dark:text-brand-400 leading-none mb-2">
                {product.price.toLocaleString()} <span className="text-2xl">درهم</span>
              </div>
              <p className="text-slate-400 font-bold">بدون رسوم إضافية مخفية</p>
            </div>

            <div className="flex items-center bg-white dark:bg-slate-800 rounded-2xl p-2 border dark:border-slate-700 shadow-sm">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition rounded-xl"><Minus size={20} /></button>
              <span className="px-6 font-black text-2xl min-w-[60px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition rounded-xl"><Plus size={20} /></button>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mb-12 font-bold opacity-90">
            {product.description}
          </p>

          {/* Action Area */}
          <div className="space-y-8 bg-white dark:bg-slate-900 p-2 rounded-[35px]">
            <div className="space-y-4">
              <button 
                onClick={handleDirectWhatsAppOrder}
                className="w-full group bg-green-500 text-white h-24 rounded-[30px] font-black text-3xl shadow-2xl shadow-green-500/30 hover:bg-green-600 transition-all transform active:scale-95 flex items-center justify-center gap-4"
              >
                <MessageCircle size={36} fill="white" className="group-hover:animate-bounce" />
                أطلب عبر الواتساب الآن
              </button>
              <p className="text-center text-slate-400 font-bold flex items-center justify-center gap-2">
                <ShieldCheck size={18} className="text-brand-500" /> دفع آمن وضمان كامل على الخدمة
              </p>
            </div>

            {/* INTEGRATED SOCIAL SHARE UNDER BUTTON */}
            <div className="pt-6 border-t-2 border-slate-50 dark:border-slate-800/50">
              <div className="flex flex-col items-center gap-5">
                <span className="font-black text-slate-400 text-sm uppercase tracking-widest flex items-center gap-2">
                  <Share2 size={16} /> شارك العرض واكسب الأجر
                </span>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => handleShare('whatsapp')} 
                    className="w-14 h-14 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg shadow-green-500/5"
                    title="واتساب"
                  >
                    <MessageCircle size={24} />
                  </button>
                  <button 
                    onClick={() => handleShare('facebook')} 
                    className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg shadow-blue-500/5"
                    title="فيسبوك"
                  >
                    <Facebook size={24} />
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')} 
                    className="w-14 h-14 bg-sky-50 dark:bg-sky-900/20 text-sky-500 rounded-2xl hover:bg-sky-500 hover:text-white transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg shadow-sky-500/5"
                    title="تويتر"
                  >
                    <Twitter size={24} />
                  </button>
                  <button 
                    onClick={() => handleShare('pinterest')} 
                    className="w-14 h-14 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg shadow-red-500/5"
                    title="بنتريست"
                  >
                    <PinterestIcon size={24} />
                  </button>
                  <button 
                    onClick={() => handleShare('copy')} 
                    className="w-14 h-14 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-600 dark:hover:bg-slate-700 hover:text-white transition-all transform hover:-translate-y-1 flex items-center justify-center shadow-lg shadow-black/5"
                    title="نسخ الرابط"
                  >
                    <LinkIcon size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Trust Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Zap, title: "تسليم فوري", desc: "استلم معلومات حسابك فوراً", color: "text-amber-500", bg: "bg-amber-500/10" },
          { icon: ShieldCheck, title: "ضمان رسمي", desc: "اشتراكات أصلية 100% ومستقرة", color: "text-brand-500", bg: "bg-brand-500/10" },
          { icon: Key, title: "دعم فني", desc: "نحن معك طوال مدة اشتراكك", color: "text-blue-500", bg: "bg-blue-500/10" }
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
            <div className={`${f.bg} ${f.color} p-5 rounded-3xl`}>
              <f.icon size={32} />
            </div>
            <div>
              <h4 className="text-xl font-black">{f.title}</h4>
              <p className="text-slate-400 font-bold">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Help Card */}
      <div className="max-w-4xl mx-auto bg-slate-900 dark:bg-brand-600 text-white p-12 rounded-[50px] text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
        <h2 className="text-3xl md:text-4xl font-black mb-6">هل لديك أي استفسار قبل الطلب؟</h2>
        <p className="text-slate-300 dark:text-brand-100 text-xl font-bold mb-10 max-w-2xl mx-auto">فريق الدعم متاح الآن للإجابة على جميع تساؤلاتك وتوجيهك لاختيار الباقة الأنسب لك.</p>
        <button 
          onClick={() => window.open(`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=مرحباً، لدي استفسار بخصوص منتج ${product.name}`, '_blank')}
          className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition active:scale-95 flex items-center justify-center gap-3 mx-auto"
        >
          <MessageSquare size={24} /> تحدث مع الدعم الفني
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
