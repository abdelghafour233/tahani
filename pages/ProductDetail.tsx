import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Product, SiteSettings } from '../types';
import { STORE_WHATSAPP_NUMBER } from '../constants';
import { Upload, Wand2, RefreshCw, CheckCircle2, Image as ImageIcon, ArrowRight, Sparkles } from 'lucide-react';

interface ProductDetailPageProps {
  products: Product[];
  settings: SiteSettings;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, settings }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!product) return <div className="text-center py-20 text-white">النمط غير موجود</div>;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Monetag Link 1 (Upload Click)
    const directLink = settings.monetag?.directLinkUrl || 'https://otieu.com/4/10518792';
    try { window.open(directLink, '_blank'); } catch (err) { }

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleGenerate = () => {
    if (!selectedImage) return alert('يرجى رفع صورة أولاً');

    // Monetag Link 2 (Generate Click)
    const directLink2 = settings.monetag?.directLinkUrl2 || 'https://otieu.com/4/10518800';
    try { window.open(directLink2, '_blank'); } catch (err) { }

    setIsGenerating(true);

    // Simulate AI Processing time then redirect to WhatsApp
    setTimeout(() => {
      const message = `*طلب تحويل صورة بالذكاء الاصطناعي*%0A%0A🎨 *النمط:* ${product.name}%0A🚀 *يرجى معالجة صورتي المرفقة*`;
      window.location.href = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${message}`;
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Editor / Preview Area */}
        <div className="order-2 lg:order-1">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-gray-200 dark:border-slate-800 p-6 shadow-2xl relative overflow-hidden">
            {isGenerating && (
               <div className="absolute inset-0 bg-slate-900/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
                 <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p className="text-white font-black text-xl animate-pulse">جاري معالجة الصورة...</p>
               </div>
            )}

            <div className="aspect-[3/4] bg-slate-100 dark:bg-slate-950 rounded-[30px] border-2 border-dashed border-gray-300 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
              {selectedImage ? (
                <img src={selectedImage} alt="Uploaded" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <div className="bg-brand-50 dark:bg-brand-900/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-500">
                    <Upload size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-700 dark:text-gray-300 mb-2">ارفع صورتك هنا</h3>
                  <p className="text-gray-400 font-bold mb-8">يفضل صورة واضحة للوجه</p>
                  <button onClick={triggerFileInput} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-black hover:scale-105 transition-transform shadow-lg">
                    اختر صورة من الجهاز
                  </button>
                </div>
              )}
              
              {selectedImage && (
                <button onClick={triggerFileInput} className="absolute bottom-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 backdrop-blur-md transition-colors">
                  <RefreshCw size={20} />
                </button>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            
            <div className="mt-6">
              <button 
                onClick={handleGenerate}
                disabled={!selectedImage || isGenerating}
                className={`w-full py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-3 transition-all shadow-xl ${
                  !selectedImage 
                    ? 'bg-gray-200 dark:bg-slate-800 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-brand-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-brand-500/30'
                }`}
              >
                <Wand2 size={28} /> تحويل الصورة الآن
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 font-bold">سيتم توجيهك للواتساب لاستلام النتيجة النهائية بجودة 4K</p>
            </div>
          </div>
        </div>

        {/* Info Area */}
        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-black mb-4 bg-brand-50 dark:bg-brand-900/10 px-4 py-2 rounded-full text-sm">
            <Sparkles size={16} /> نمط الذكاء الاصطناعي
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 dark:text-white">{product.name}</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-bold mb-10 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <img src={product.beforeImage || product.image} className="w-20 h-20 rounded-xl object-cover grayscale opacity-70" alt="Before" />
              <ArrowRight className="text-gray-300" />
              <img src={product.image} className="w-20 h-20 rounded-xl object-cover border-2 border-brand-500" alt="After" />
              <div className="mr-auto">
                <span className="block text-sm font-bold text-gray-400">النتيجة المتوقعة</span>
                <span className="block text-brand-600 dark:text-brand-400 font-black">تحول مذهل!</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-900/20">
                <CheckCircle2 className="text-green-500 mb-2" />
                <h4 className="font-bold dark:text-white">جودة عالية</h4>
                <p className="text-xs text-green-600 dark:text-green-400">دقة 4K فائقة</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                <ImageIcon className="text-blue-500 mb-2" />
                <h4 className="font-bold dark:text-white">خصوصية تامة</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400">تحذف الصور بعد المعالجة</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;