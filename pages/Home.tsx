
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Wand2, Zap, ArrowLeft, ArrowUpRight } from 'lucide-react';

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div>
      {/* Hero Section - Minimalist */}
      <section className="pt-20 pb-32 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 mb-8 bg-slate-50 dark:bg-slate-900/50">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            الذكاء الاصطناعي متاح الآن للجميع
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
            حول خيالك إلى<br />
            <span className="text-slate-400">واقع رقمي.</span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            منصة berrima.ai تمكنك من توليد صور احترافية، تحويل صورك الشخصية، وصناعة فن رقمي باستخدام أحدث نماذج Gemini و Stable Diffusion.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/category/anime" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Wand2 size={20} /> ابدأ التصميم مجاناً
            </Link>
            <a href="#styles" className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              اكتشف الأنماط
            </a>
          </div>
        </div>
      </section>

      {/* Grid Showcase */}
      <section id="styles" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">أنماط شائعة</h2>
                <p className="text-slate-500">اختر النمط المناسب لمشروعك القادم</p>
            </div>
            <Link to="/category/anime" className="hidden md:flex items-center gap-2 text-sm font-bold hover:underline">
                عرض الكل <ArrowLeft size={16} />
            </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Zap size={12} className="text-amber-500" /> AI
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">{product.name}</h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-1">{product.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Simple */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-24 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-12">
                  {[
                      { title: "سريع جداً", desc: "معالجة فورية للصور باستخدام سيرفرات سحابية قوية." },
                      { title: "جودة 4K", desc: "تصدير عالي الدقة يصلح للطباعة والاستخدام المهني." },
                      { title: "خصوصية تامة", desc: "يتم حذف الصور من خوادمنا تلقائياً بعد المعالجة." }
                  ].map((f, i) => (
                      <div key={i}>
                          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6 shadow-sm">
                              <ArrowUpRight size={20} />
                          </div>
                          <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                          <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
};

export default Home;
