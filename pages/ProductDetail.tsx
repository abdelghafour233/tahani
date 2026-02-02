
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { Product, SiteSettings } from '../types';
import { Upload, Wand2, Download, AlertCircle, Loader2, Maximize2, X, ImagePlus, Sliders } from 'lucide-react';

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

  if (!product) return <div className="text-center py-20 text-white">404 - Model Not Found</div>;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setGeneratedImage(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError("MAX FILE SIZE 5MB");
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
    if (!selectedImage) return setError('UPLOAD IMAGE FIRST');
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      if (!process.env.API_KEY) throw new Error("API KEY MISSING");
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
        throw new Error("GENERATION FAILED");
      }
    } catch (err: any) {
      console.error(err);
      setError("PROCESSING ERROR");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-dark-900 text-white min-h-[calc(100vh-80px)] flex flex-col md:flex-row">
      
      {/* Left Sidebar: Controls */}
      <div className="w-full md:w-[400px] border-l border-dark-800 bg-dark-900 p-6 md:h-[calc(100vh-80px)] md:overflow-y-auto flex flex-col gap-6 shrink-0 z-20 shadow-2xl">
        <div>
            <h1 className="text-2xl font-black mb-2 tracking-tight">{product.name}</h1>
            <p className="text-zinc-500 text-sm leading-relaxed">{product.description}</p>
        </div>

        <div className="border-t border-dark-800 pt-6 space-y-6 flex-grow">
            <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <ImagePlus size={14} /> Source Image
                </label>
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed border-dark-700 bg-dark-800 rounded-xl p-8 text-center cursor-pointer hover:bg-dark-700 hover:border-zinc-500 transition-all ${selectedImage ? 'border-brand-500/50' : ''}`}
                >
                    {selectedImage ? (
                        <div className="relative">
                            <img src={selectedImage} alt="Source" className="h-32 mx-auto rounded-lg object-contain" />
                            <div className="mt-2 text-xs text-brand-400 font-bold">Click to change</div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-zinc-500">
                            <Upload size={24} />
                            <span className="text-sm font-bold">Upload / Drop</span>
                        </div>
                    )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <Sliders size={14} /> Parameters
                </label>
                <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 space-y-3">
                    <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">Model</span>
                        <span className="font-mono text-white">Gemini 2.5 Flash</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-zinc-400">Quality</span>
                        <span className="font-mono text-white">High (4K)</span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-bold flex items-center gap-2">
                    <AlertCircle size={16} /> {error}
                </div>
            )}
        </div>

        <div className="pt-6 border-t border-dark-800">
             <button 
                onClick={handleGenerate}
                disabled={!selectedImage || isGenerating}
                className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    !selectedImage || isGenerating
                    ? 'bg-dark-800 text-zinc-600 cursor-not-allowed' 
                    : 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/10'
                }`}
            >
                {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
                {isGenerating ? 'Processing...' : 'Generate Art'}
            </button>
        </div>
      </div>

      {/* Right Area: Canvas */}
      <div className="flex-grow bg-[#050505] relative flex items-center justify-center p-8 overflow-hidden">
         {/* Grid Background Pattern */}
         <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
         
         <div className="relative z-10 w-full h-full max-w-4xl flex items-center justify-center">
            {generatedImage ? (
                <div className="relative group animate-fade-in shadow-2xl shadow-black/50">
                    <img src={generatedImage} alt="Result" className="max-h-[80vh] max-w-full rounded-lg border border-dark-700" />
                    
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <a href={generatedImage} download={`berrima-${id}.png`} className="bg-white text-black p-3 rounded-lg hover:bg-zinc-200 shadow-xl" title="Download">
                            <Download size={20} />
                         </a>
                         <button onClick={() => setGeneratedImage(null)} className="bg-dark-900 text-white p-3 rounded-lg hover:bg-dark-800 border border-dark-700 shadow-xl" title="Close">
                            <X size={20} />
                         </button>
                    </div>
                </div>
            ) : selectedImage ? (
                <div className="relative animate-fade-in">
                     <img src={selectedImage} alt="Preview" className={`max-h-[60vh] max-w-full rounded-lg border border-dark-700 opacity-50 grayscale transition-all duration-1000 ${isGenerating ? 'scale-95 blur-sm' : ''}`} />
                     {isGenerating && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <div className="w-64 h-1 bg-dark-800 rounded-full overflow-hidden">
                                 <div className="h-full bg-brand-500 animate-slide-up w-full origin-left"></div>
                             </div>
                             <p className="mt-4 font-mono text-xs text-brand-400 animate-pulse">GENERATING...</p>
                         </div>
                     )}
                </div>
            ) : (
                <div className="text-center text-dark-700 select-none">
                    <Maximize2 size={64} className="mx-auto mb-6 opacity-20" />
                    <h3 className="text-2xl font-black text-dark-600 mb-2">WORKSPACE EMPTY</h3>
                    <p className="font-mono text-xs">SELECT AN IMAGE TO START EDITING</p>
                </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
