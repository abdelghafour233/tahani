
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { Product, SiteSettings } from '../types';
import { Upload, Wand2, RefreshCw, Download, AlertCircle, Loader2, ImageIcon, Sparkles, MoveRight } from 'lucide-react';

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

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!product) return <div className="text-center py-20">المنتج غير موجود</div>;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setGeneratedImage(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError("الصورة كبيرة جداً (أقصى حد 5MB)");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => setSelectedImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getPrompt = (p: Product) => {
    return `Transform the following image into ${p.nameEn}. High quality, 4k resolution, detailed, masterpiece.`;
  };

  const handleGenerate = async () => {
    if (!selectedImage) return setError('يرجى رفع صورة أولاً');
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      if (!process.env.API_KEY) throw new Error("مفتاح API غير متوفر");
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const mimeType = selectedImage.substring(selectedImage.indexOf(":") + 1, selectedImage.indexOf(";"));
      const base64Data = selectedImage.split(',')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { mimeType, data: base64Data } },
            { text: getPrompt(product) }
          ]
        }
      });

      if (response.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
         setGeneratedImage(`data:image/png;base64,${response.candidates[0].content.parts[0].inlineData.data}`);
      } else {
        throw new Error("فشل التوليد");
      }
    } catch (err: any) {
      console.error(err);
      setError("حدث خطأ غير متوقع. حاول مرة أخرى.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10 max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 font-medium">
            <span>الأدوات</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 dark:text-white">{product.category}</span>
        </div>
        <h1 className="text-4xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">{product.name}</h1>
        <p className="text-lg text-slate-500 leading-relaxed">{product.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar / Controls */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-500">الإعدادات</h3>
                
                <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-400 block mb-1">النمط المختار</span>
                        <div className="font-bold">{product.name}</div>
                    </div>

                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-4 px-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 hover:border-slate-900 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors flex items-center justify-center gap-2 text-sm font-bold"
                    >
                        <Upload size={18} /> {selectedImage ? 'تغيير الصورة' : 'رفع صورة'}
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

                    <button 
                        onClick={handleGenerate}
                        disabled={!selectedImage || isGenerating}
                        className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-sm ${
                            !selectedImage || isGenerating
                            ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed' 
                            : 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800'
                        }`}
                    >
                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                        {isGenerating ? 'جاري المعالجة...' : 'توليد الصورة'}
                    </button>

                    {error && (
                        <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg flex items-center gap-2">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}
                </div>
            </div>

            {/* Hint */}
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/20 text-sm text-blue-700 dark:text-blue-300">
                <p className="font-bold flex items-center gap-2 mb-1"><Sparkles size={14} /> نصيحة احترافية</p>
                استخدم صوراً ذات إضاءة جيدة وتفاصيل واضحة للوجه للحصول على أفضل النتائج.
            </div>
        </div>

        {/* Workspace / Preview */}
        <div className="lg:col-span-2">
            <div className="bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 h-[600px] flex items-center justify-center relative overflow-hidden group">
                
                {/* Before/After Split or Single Image */}
                {generatedImage ? (
                     <div className="relative w-full h-full">
                        <img src={generatedImage} alt="Result" className="w-full h-full object-contain" />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                             <a href={generatedImage} download="berrima-art.png" className="bg-white/90 backdrop-blur text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-white transition flex items-center gap-2">
                                <Download size={18} /> تحميل HD
                             </a>
                             <button onClick={() => setGeneratedImage(null)} className="bg-black/50 backdrop-blur text-white px-6 py-3 rounded-full font-bold hover:bg-black/70 transition">
                                صورة جديدة
                             </button>
                        </div>
                     </div>
                ) : selectedImage ? (
                    <div className="relative w-full h-full">
                        <img src={selectedImage} alt="Original" className="w-full h-full object-contain opacity-80 blur-[2px] scale-95 transition-all duration-700" />
                        {isGenerating && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-900/20 backdrop-blur-sm">
                                <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-white animate-pulse w-2/3"></div>
                                </div>
                                <p className="text-white font-bold mt-4 shadow-black drop-shadow-md">جاري الرسم...</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center text-slate-400">
                        <ImageIcon size={64} className="mx-auto mb-4 opacity-50" />
                        <p className="font-medium">مساحة العمل فارغة</p>
                        <p className="text-sm">قم برفع صورة للبدء</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
