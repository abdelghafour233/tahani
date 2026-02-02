
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Wand2, Image as ImageIcon, Download, Star, ChevronLeft, BrainCircuit, Sparkles, Zap, Layers } from 'lucide-react';

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div className="pb-24 ai-glow">
      {/* Dynamic Hero Section */}
      <section className="relative pt-24 pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-600 dark:text-brand-300 px-6 py-2.5 rounded-full font-black text-sm mb-10 border border-brand-500/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom duration-700">
            <BrainCircuit size={18} className="animate-pulse" /> الجيل القادم من معالجة الصور بالذكاء الاصطناعي
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom duration-1000 delay-100">
            حول صورك إلى <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-purple-500 to-pink-500 animate-gradient-x">تحف فنية مذهلة</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-300 mb-16 max-w-3xl mx-auto font-bold leading-relaxed px-4 opacity-80 animate-in fade-in duration-1000 delay-200">
            استخدم قوة الذكاء الاصطناعي لتحويل صورك الشخصية إلى أنمي، كرتون 3D، أو صور احترافية لـ LinkedIn بضغطة زر واحدة.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 px-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            <Link to="/category/anime" className="group bg-brand-600 text-white px-12 py-6 rounded-full font-black text-2xl hover:bg-brand-700 transition-all shadow-2xl shadow-brand-500/30 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
              <Wand2 size={28} /> ابدأ التحويل الآن
            </Link>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ImageIcon, title: "1. ارفع صورتك", desc: "اختر صورة واضحة من هاتفك", color: "text-blue-500", bg: "bg-blue-500/10" },
            { icon: Sparkles, title: "2. اختر النمط", desc: "أنمي، واقعي، أو كرتون", color: "text-brand-500", bg: "bg-brand-500/10" },
            { icon: Download, title: "3. حمل النتيجة", desc: "احصل على صورتك بدقة 4K", color: "text-pink-500", bg: "bg-pink-500/10" }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl p-10 rounded-[40px] border border-slate-200 dark:border-brand-500/20 shadow-xl hover:shadow-2xl transition-all group hover:-translate-y-2 duration-500">
              <div className={`${feature.bg} ${feature.color} w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <feature.icon size={40} />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-lg leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Styles Grid */}
      <section id="styles" className="max-w-7xl mx-auto px-4 mt-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="text-right">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">اكتشف الأنماط <br/><span className="text-brand-600">الأكثر رواجاً</span></h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-bold">جرب هذه الفلاتر السحرية على صورك الآن</p>
          </div>
          <Link to="/category/anime" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-black text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-xl">
            تصفح كل الأنماط <ChevronLeft size={24} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="group relative bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-brand-500/50">
              {/* Image Container */}
              <div className="aspect-[3/4] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-xl font-black text-white mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 text-brand-300 text-sm font-bold">
                     <Zap size={14} fill="currentColor" /> {product.processingTime}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech Specs / Trust */}
      <section className="max-w-7xl mx-auto px-4 mt-48">
        <div className="bg-slate-900 dark:bg-slate-950 rounded-[50px] p-12 md:p-24 text-center border border-slate-800 dark:border-brand-500/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          
          <Layers className="text-brand-500 mx-auto mb-10 group-hover:animate-bounce transition-transform duration-1000" size={64} />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">تقنية ذكاء اصطناعي متطورة</h2>
          <p className="text-xl text-slate-400 dark:text-brand-200/60 max-w-3xl mx-auto font-bold mb-12 leading-relaxed">نستخدم أحدث خوارزميات Stable Diffusion و Midjourney لمعالجة صورك بدقة فائقة مع الحفاظ على ملامحك الأصلية.</p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-slate-800/50 px-6 py-3 rounded-full text-brand-300 font-mono font-bold border border-slate-700">Stable Diffusion XL</div>
            <div className="bg-slate-800/50 px-6 py-3 rounded-full text-brand-300 font-mono font-bold border border-slate-700">ControlNet</div>
            <div className="bg-slate-800/50 px-6 py-3 rounded-full text-brand-300 font-mono font-bold border border-slate-700">LoRA Training</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
