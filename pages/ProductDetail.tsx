
import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { Product, SiteSettings } from '../types';
import { Upload, Wand2, RefreshCw, CheckCircle2, Image as ImageIcon, ArrowRight, Sparkles, Download, AlertCircle } from 'lucide-react';

interface ProductDetailPageProps {
  products: Product[];
  settings: SiteSettings;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, settings }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!product) return <div className="text-center py-20 text-white">النمط غير موجود</div>;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setGeneratedImage(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError("حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 5 ميجابايت");
        return;
      }
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

  const getPrompt = (p: Product) => {
    // تخصيص الأوامر (Prompts) بناءً على نوع المنتج للحصول على أفضل النتائج
    const basePrompt = "Transform the following image into";
    const style = p.nameEn;
    const details = "Keep the subject's identity recognizable but apply the style strongly. High quality, 4k resolution, detailed, masterpiece.";
    return `${basePrompt} ${style}. ${details}`;
  };

  const handleGenerate = async () => {
    if (!selectedImage) return setError('يرجى رفع صورة أولاً');
    
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // استخراج نوع الملف والبيانات من Base64
      const mimeType = selectedImage.substring(selectedImage.indexOf(":") + 1, selectedImage.indexOf(";"));
      const base64Data = selectedImage.split(',')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { 
              inlineData: { 
                mimeType: mimeType, 
                data: base64Data 
              } 
            },
            { text: getPrompt(product) }
          ]
        }
      });

      let imageFound = false;
      if (response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            setGeneratedImage(`data:image/png;base64,${base64EncodeString}`);
            imageFound = true;
            break;
          }
        }
      }

      if (!imageFound) {
        throw new Error("لم يتم إرجاع صورة من النموذج. حاول مرة أخرى.");
      }

    } catch (err) {
      console.error("Error generating image:", err);
      setError("عذراً، حدث خطأ أثناء معالجة الصورة. تأكد من أن مفتاح API صالح وحاول مرة أخرى.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `berrima-ai-${product.id}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Editor / Preview Area */}
        <div className="order-2 lg:order-1 sticky top-24">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-gray-200 dark:border-slate-800 p-6 shadow-2xl relative overflow-hidden transition-all duration-500">
            {isGenerating && (
               <div className="absolute inset-0 bg-slate-900/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm rounded-[30px]">
                 <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p className="text-white font-black text-xl animate-pulse">جاري رسم تحفتك الفنية...</p>
                 <p className="text-brand-200 text-sm mt-2">قد يستغرق الأمر بضع ثوانٍ</p>
               </div>
            )}

            <div className={`aspect-[3/4] bg-slate-100 dark:bg-slate-950 rounded-[30px] border-2 border-dashed border-gray-300 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-500 ${generatedImage ? 'border-brand-500 dark:border-brand-500' : ''}`}>
              {generatedImage ? (
                <img src={generatedImage} alt="Generated Art" className="w-full h-full object-cover animate-in fade-in duration-700" />
              ) : selectedImage ? (
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
              
              {(selectedImage || generatedImage) && !isGenerating && (
                <button onClick={triggerFileInput} className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 backdrop-blur-md transition-colors z-10" title="تغيير الصورة">
                  <RefreshCw size={20} />
                </button>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-2 font-bold text-sm">
                <AlertCircle size={20} /> {error}
              </div>
            )}

            <div className="mt-6 space-y-4">
              {generatedImage ? (
                 <button 
                 onClick={handleDownload}
                 className="w-full bg-green-500 text-white py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
               >
                 <Download size={28} /> تحميل الصورة (HD)
               </button>
              ) : (
                <button 
                  onClick={handleGenerate}
                  disabled={!selectedImage || isGenerating}
                  className={`w-full py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-3 transition-all shadow-xl ${
                    !selectedImage 
                      ? 'bg-gray-200 dark:bg-slate-800 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-brand-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-brand-500/30'
                  }`}
                >
                  <Wand2 size={28} /> {selectedImage ? 'تحويل الصورة بالذكاء الاصطناعي' : 'ابدأ برفع صورة'}
                </button>
              )}
              
              {!generatedImage && (
                <p className="text-center text-xs text-gray-400 font-bold">يتم معالجة الصور باستخدام خوادم Gemini المتطورة.</p>
              )}
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
                <p className="text-xs text-green-600 dark:text-green-400">دقة عالية وتفاصيل دقيقة</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                <ImageIcon className="text-blue-500 mb-2" />
                <h4 className="font-bold dark:text-white">خصوصية تامة</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400">لا يتم تخزين صورك</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
