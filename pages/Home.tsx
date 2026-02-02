
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Sparkles, ArrowRight, Aperture, Layers } from 'lucide-react';

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div className="bg-dark-900 text-white">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-dark-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-900/20 via-dark-900 to-dark-900 z-0"></div>
        
        <div className="max-w-5xl mx-auto px-6 text-center z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 rounded-full text-brand-300 text-xs font-bold mb-8 uppercase tracking-widest">
            <Sparkles size={12} /> الجيل القادم من الذكاء الاصطناعي
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
            تخيل.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">اصنع.</span>
            <span className="text-brand-500"> ألهم.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            استوديو berrima.ai يمنحك القوة لتحويل أفكارك إلى فن بصري مذهل في ثوانٍ.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/category/anime" className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-transform hover:scale-105 flex items-center justify-center gap-2">
              ابدأ الآن <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee / Brands (Visual Filler) */}
      <div className="border-b border-dark-800 py-8 bg-dark-900/50 backdrop-blur">
         <div className="flex justify-center gap-12 text-zinc-600 font-black text-xl md:text-2xl opacity-50 select-none overflow-hidden whitespace-nowrap">
            <span>GEMINI 2.5</span>
            <span>STABLE DIFFUSION</span>
            <span>FLUX</span>
            <span>MIDJOURNEY STYLE</span>
            <span>4K UPSCALING</span>
         </div>
      </div>

      {/* Grid Showcase */}
      <section className="max-w-[1400px] mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-dark-800 pb-8">
            <div>
                <h2 className="text-4xl font-bold mb-4">اختر نموذجك</h2>
                <p className="text-zinc-400 text-lg">مجموعة مختارة من أفضل نماذج التوليد الفني.</p>
            </div>
            <Link to="/category/anime" className="hidden md:flex text-white border-b border-white pb-1 hover:text-brand-400 hover:border-brand-400 transition-colors">
                استعراض المكتبة الكاملة
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <Link to={`/product/${product.id}`} key={product.id} className={`group relative block overflow-hidden rounded-2xl bg-dark-800 border border-dark-700 aspect-[3/4] hover:border-brand-500/50 transition-all duration-500 ${index === 1 ? 'lg:col-span-2 lg:aspect-auto' : ''}`}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">{product.category}</span>
                <h3 className="text-2xl font-bold text-white leading-none">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Minimal Features */}
      <section className="bg-dark-800 py-32 border-t border-dark-700">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
              {[
                  { icon: Aperture, title: "دقة فائقة", desc: "محرك المعالجة لدينا يدعم تصدير الصور بدقة تصل إلى 4K مع تفاصيل دقيقة." },
                  { icon: Layers, title: "أنماط متعددة", desc: "تنقل بين الواقعية، الأنمي، والرسم الزيتي بضغطة زر واحدة." },
                  { icon: Sparkles, title: "سحر Gemini", desc: "مدعوم بأحدث تقنيات Google Vision لفهم الصور وإعادة تخيلها." }
              ].map((f, i) => (
                  <div key={i} className="group">
                      <f.icon className="w-12 h-12 text-zinc-500 group-hover:text-brand-500 transition-colors mb-6" />
                      <h3 className="text-2xl font-bold mb-4 text-white">{f.title}</h3>
                      <p className="text-zinc-400 leading-relaxed text-lg">{f.desc}</p>
                  </div>
              ))}
          </div>
      </section>
    </div>
  );
};

export default Home;
