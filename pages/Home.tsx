import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Zap, ShieldCheck, Headphones, Star, ChevronLeft, MessageCircle, Share2, Crown, Globe, CheckCircle2 } from 'lucide-react';

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div className="pb-16 hero-gradient">
      {/* Premium Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 px-4 py-2 rounded-full font-black text-sm mb-8 border border-brand-500/20">
            <Crown size={16} /> المنصة رقم #1 للاشتراكات الرقمية بالمغرب
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
            عالم من <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-emerald-400">الترفيه الرقمي</span> <br/> بين يديك
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 max-w-3xl mx-auto font-bold leading-relaxed">
            احصل على اشتراكاتك المفضلة (Netflix, Canva, IPTV) بأسعار حصرية وتفعيل فوري مع ضمان استرجاع الأموال.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/category/electronics" className="bg-brand-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-brand-700 transition shadow-2xl shadow-brand-500/20 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
              <Zap size={24} /> استكشف العروض الآن
            </Link>
            <a href="#features" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-10 py-5 rounded-2xl font-black text-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition flex items-center justify-center gap-2">
              لماذا نحن؟
            </a>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-3xl -z-10"></div>
      </section>

      {/* Trust & Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "تفعيل فوري", desc: "استلم بيانات حسابك فوراً عبر الواتساب", color: "text-amber-500", bg: "bg-amber-500/10" },
            { icon: ShieldCheck, title: "ضمان ذهبي", desc: "نضمن لك استمرار الخدمة طوال المدة", color: "text-brand-500", bg: "bg-brand-500/10" },
            { icon: Headphones, title: "دعم مخصص", desc: "فريقنا معك في كل خطوة للتفعيل", color: "text-blue-500", bg: "bg-blue-500/10" }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[35px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
              <div className={`${feature.bg} ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-black mb-2">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-bold">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 mt-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-right">
            <h2 className="text-4xl md:text-5xl font-black mb-4">باقات بريميوم مختارة</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-bold">اشترك اليوم ووفر أكثر من 60% من السعر الرسمي</p>
          </div>
          <Link to="/category/electronics" className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-brand-600 hover:text-white transition">
            عرض كل الخدمات <ChevronLeft size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="group relative bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500">
              {/* Product Badge */}
              <div className="absolute top-6 right-6 z-10 bg-brand-600 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
                <CheckCircle2 size={14} /> تفعيل رسمي
              </div>

              {/* Image Section */}
              <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-8 relative -mt-12">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={`${i < (product.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-center mb-4 group-hover:text-brand-600 transition min-h-[72px]">{product.name}</h3>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 text-center mb-8 border border-slate-100 dark:border-slate-800">
                  <span className="text-4xl font-black text-brand-600 dark:text-brand-400">{product.price}</span>
                  <span className="text-lg font-bold text-slate-400 mr-2">درهم</span>
                </div>

                <Link to={`/product/${product.id}`} className="block w-full bg-slate-900 dark:bg-brand-600 text-white text-center py-5 rounded-2xl font-black text-xl hover:bg-brand-700 transition shadow-xl active:scale-95">
                  تفعيل الاشتراك
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Trust Footer Feature */}
      <section className="max-w-7xl mx-auto px-4 mt-32">
        <div className="bg-slate-900 dark:bg-brand-600/10 rounded-[50px] p-12 text-center border border-slate-800 dark:border-brand-500/20">
          <Globe className="text-brand-500 mx-auto mb-6" size={64} />
          <h2 className="text-4xl font-black text-white mb-6">انضم إلى أكثر من 5,000+ عميل سعيد</h2>
          <p className="text-xl text-slate-400 dark:text-brand-200 max-w-2xl mx-auto font-bold mb-10">نحن نفتخر بتقديم أفضل خدمة مبيعات ما بعد الاشتراك لضمان رضاكم التام.</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition duration-500">
            <span className="text-2xl font-black text-white">NETFLIX</span>
            <span className="text-2xl font-black text-white">CANVA</span>
            <span className="text-2xl font-black text-white">IPTV</span>
            <span className="text-2xl font-black text-white">WINDOWS</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;