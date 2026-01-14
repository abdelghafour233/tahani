
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { MOROCCAN_CITIES, STORE_WHATSAPP_NUMBER } from '../constants';
import { 
  Heart, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Zap, 
  Star, 
  User, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Minus, 
  Plus,
  ArrowDown,
  Facebook,
  Twitter,
  MessageCircle,
  Link as LinkIcon
} from 'lucide-react';

interface ProductDetailPageProps {
  products: Product[];
  placeOrder: (product: Product, quantity: number, data: { name: string, city: string, phone: string }) => string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, placeOrder }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [formData, setFormData] = useState({ name: '', city: '', phone: '' });
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!product) {
    return <div className="text-center py-20 dark:text-gray-400">المنتج غير موجود</div>;
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `اكتشف هذا المنتج الرائع في berrima.store: ${product.name}`;
    
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
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('تم نسخ رابط المنتج بنجاح!');
        break;
    }
  };

  const total = product.price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.city || !formData.phone) {
      alert("يرجى ملء جميع الخانات المطلوبة");
      return;
    }
    
    setIsOrdering(true);
    
    const message = `*طلب جديد من berrima.store*%0A%0A` +
      `*المنتج:* ${product.name}%0A` +
      `*الكمية:* ${quantity}%0A` +
      `*السعر الإجمالي:* ${total} درهم%0A%0A` +
      `*معلومات الزبون:*%0A` +
      `*الاسم:* ${formData.name}%0A` +
      `*المدينة:* ${formData.city}%0A` +
      `*الهاتف:* ${formData.phone}%0A%0A` +
      `يرجى تأكيد الطلب في أقرب وقت.`;
    
    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${message}`;

    setTimeout(() => {
      placeOrder(product, quantity, formData);
      setIsSuccess(true);
      setIsOrdering(false);
      window.open(whatsappUrl, '_blank');
      window.scrollTo(0, 0);
    }, 1200);
  };

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-in fade-in duration-700">
        <div className="mb-10 flex justify-center">
          <div className="bg-green-100 dark:bg-green-900/30 p-8 rounded-full text-green-600 dark:text-green-400 animate-bounce">
            <CheckCircle2 size={80} />
          </div>
        </div>
        <h1 className="text-4xl font-black mb-4">تم إرسال طلبك!</h1>
        <p className="text-gray-500 text-xl mb-10">لقد تم توجيهك للواتساب لتأكيد طلبك. سيقوم فريقنا بالتواصل معك قريباً.</p>
        <button onClick={() => window.location.href = '/'} className="bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-green-700 transition-all shadow-xl">
          العودة للمتجر
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12">
        {/* Gallery */}
        <div className="space-y-4 md:space-y-6">
          <div className="rounded-[30px] md:rounded-[40px] overflow-hidden border-2 border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 shadow-xl flex items-center justify-center p-4">
            <img 
              src={selectedImage || product.image} 
              alt={product.name} 
              className="w-full h-auto max-h-[500px] object-contain transition-all duration-500" 
            />
          </div>
          
          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar justify-center md:justify-start">
              {galleryImages.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all p-1 bg-white dark:bg-slate-800 ${selectedImage === img ? 'border-green-500 scale-105 shadow-md' : 'border-gray-100 dark:border-slate-700 opacity-60'}`}
                >
                  <img src={img} alt={`${product.name} ${index}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-xs md:text-sm font-bold mb-2 inline-block">
                جديد - متوفر حالياً
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-2 md:gap-4 mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={`${i < (product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold">({product.reviewsCount || 0} تقييم موثق)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 md:p-3 bg-gray-100 dark:bg-slate-800 rounded-full hover:text-pink-600 transition shadow-sm">
                <Heart size={20} />
              </button>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/10 p-5 md:p-6 rounded-2xl md:rounded-3xl mb-6 md:mb-8 border border-green-100 dark:border-green-900/20 shadow-inner">
            <div className="text-3xl md:text-4xl font-black text-green-700 dark:text-green-400 mb-1">{product.price.toLocaleString()} درهم</div>
            <p className="text-sm md:text-base text-green-600 dark:text-green-500 font-medium">عرض خاص: توصيل مجاني والدفع عند الاستلام</p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-8 whitespace-pre-wrap font-medium">
            {product.description}
          </p>

          <button 
            onClick={scrollToForm}
            className="w-full h-16 md:h-20 rounded-2xl md:rounded-3xl bg-green-600 text-white text-xl md:text-2xl font-black shadow-xl hover:bg-green-700 transform active:scale-95 transition flex items-center justify-center gap-3 md:gap-4 group mb-6"
          >
            <Zap size={24} className="md:w-8 md:h-8 group-hover:animate-bounce" />
            أطلب الآن - الدفع عند الاستلام
            <ArrowDown size={24} className="mr-auto hidden md:block" />
          </button>
          
          {/* Social Media Sharing Section */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-[25px] border border-gray-100 dark:border-slate-800 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <span className="font-black text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Share2 className="text-green-600" size={20} /> شارك هذا المنتج مع أصدقائك:
              </span>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleShare('whatsapp')} 
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-600 transition shadow-md active:scale-95"
                >
                  <MessageCircle size={18} /> واتساب
                </button>
                <button 
                  onClick={() => handleShare('facebook')} 
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-md active:scale-95"
                >
                  <Facebook size={18} /> فيسبوك
                </button>
                <button 
                  onClick={() => handleShare('twitter')} 
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl font-bold hover:opacity-90 transition shadow-md active:scale-95"
                >
                  <Twitter size={18} /> X
                </button>
                <button 
                  onClick={() => handleShare('copy')} 
                  className="p-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 transition active:scale-95"
                  title="نسخ الرابط"
                >
                  <LinkIcon size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <Truck className="text-blue-500 w-10 h-10" />
          <div>
            <h4 className="font-bold">توصيل سريع ومجاني</h4>
            <p className="text-xs text-gray-500">لجميع المدن المغربية</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <ShieldCheck className="text-green-500 w-10 h-10" />
          <div>
            <h4 className="font-bold">الدفع عند الاستلام</h4>
            <p className="text-xs text-gray-500">تأكد من طلبك قبل الدفع</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
          <CheckCircle2 className="text-orange-500 w-10 h-10" />
          <div>
            <h4 className="font-bold">ضمان حقيقي</h4>
            <p className="text-xs text-gray-500">خدمة ما بعد البيع متوفرة</p>
          </div>
        </div>
      </div>

      {/* Integrated Order Form Section */}
      <div ref={formRef} className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[35px] md:rounded-[50px] border-4 border-green-600/20 shadow-2xl overflow-hidden scroll-mt-24">
        <div className="bg-green-600 text-white p-8 text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-2">املأ المعلومات لإتمام طلبك</h2>
          <p className="text-green-100 font-bold">توصيل مجاني لجميع المدن - الدفع عند الاستلام</p>
        </div>
        
        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-lg font-bold flex items-center gap-2">
                  <User size={20} className="text-green-600" /> الاسم
                </label>
                <input 
                  required
                  type="text" 
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 focus:border-green-500 focus:outline-none transition text-lg"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-lg font-bold flex items-center gap-2">
                  <MapPin size={20} className="text-green-600" /> المدينة
                </label>
                <select 
                  required
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 focus:border-green-500 focus:outline-none transition text-lg appearance-none"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                >
                  <option value="">-- اختر مدينتك --</option>
                  {MOROCCAN_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-lg font-bold flex items-center gap-2">
                  <Phone size={20} className="text-green-600" /> رقم الهاتف
                </label>
                <input 
                  required
                  type="tel" 
                  style={{ direction: 'ltr', textAlign: 'right' }}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 focus:border-green-500 focus:outline-none transition text-lg ltr"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b dark:border-slate-700">
                <span className="font-bold text-gray-500">الكمية:</span>
                <div className="flex items-center bg-white dark:bg-slate-900 rounded-xl overflow-hidden border dark:border-slate-800">
                  <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition"><Minus size={18} /></button>
                  <span className="px-4 font-black text-lg min-w-[40px] text-center">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(q => q + 1)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition"><Plus size={18} /></button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between font-bold">
                  <span>سعر المنتج:</span>
                  <span>{product.price} درهم</span>
                </div>
                <div className="flex justify-between font-bold text-green-600">
                  <span>التوصيل:</span>
                  <span>مجاني</span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-4 border-t dark:border-slate-700 text-green-700 dark:text-green-400">
                  <span>الإجمالي:</span>
                  <span>{total.toLocaleString()} درهم</span>
                </div>
              </div>

              <button 
                disabled={isOrdering}
                type="submit"
                className="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-green-700 transition shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {isOrdering ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <MessageSquare size={24} />
                    تأكيد الطلب عبر واتساب
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest">
                <ShieldCheck size={14} /> الدفع عند الاستلام متاح
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
