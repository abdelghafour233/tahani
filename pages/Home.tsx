import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Zap, ShieldCheck, Headphones, Star, ChevronLeft, Crown, Globe, CheckCircle2, LayoutGrid, Sparkles } from 'lucide-react';

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div className="pb-24 hero-glow">
      {/* Dynamic Hero Section */}
      <section className="relative pt-24 pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 px-6 py-2.5 rounded-full font-black text-sm mb-10 border border-brand-500/20 backdrop-blur-md animate-in fade-in slide-in-from-bottom duration-700">
            <Crown size={18} className="animate-pulse" /> المنصة المعتمدة لتفعيل الخدمات الرقمية بالمغرب
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[1] animate-in fade-in slide-in-from-bottom duration-1000 delay-100">
            اشتراكات <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-emerald-500 to-teal-400">بريميوم</span> <br/> بسعر خيالي
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 mb-16 max-w-4xl mx-auto font-bold leading-relaxed px-4 opacity-80 animate-in fade-in duration-1000 delay-200">
            وفر أكثر من 70% من سعر اشتراكك الرسمي في نيتفليكس، كانفا، ويوتيوب. تفعيل فوري ومضمون طوال مدة الخدمة.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 px-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            <Link to="/category/electronics" className="group bg-brand-600 text-white px-12 py-6 rounded-[25px] font-black text-2xl hover:bg-brand-700 transition-all shadow-2xl shadow-brand-500/30 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
              <Sparkles size={28} /> تصفح العروض الحصرية
            </Link>
            <a href="#featured" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-12 py-6 rounded-[25px] font-black text-2xl border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
              <LayoutGrid size={28} /> الفئات
            </a>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "تفعيل فوري", desc: "استلم بيانات التفعيل خلال أقل من 15 دقيقة", color: "text-amber-500", bg: "bg-amber-500/10" },
            { icon: ShieldCheck, title: "ضمان كامل", desc: "نحن المسؤولون عن تفعيلك طوال مدة الاشتراك", color: "text-brand-500", bg: "bg-brand-500/10" },
            { icon: Headphones, title: "دعم فني 24/7", desc: "فريق دعم مخصص عبر الواتساب للإجابة عن أسئلتك", color: "text-blue-500", bg: "bg-blue-500/10" }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-10 rounded-[45px] border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all group hover:-translate-y-2 duration-500">
              <div className={`${feature.bg} ${feature.color} w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform`}>
                <feature.icon size={40} />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-lg leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section id="featured" className="max-w-7xl mx-auto px-4 mt-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="text-right">
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">أكثر الاشتراكات <br/><span className="text-brand-600">طلباً هذا الأسبوع</span></h2>
            <p className="text-2xl text-slate-500 dark:text-slate-400 font-bold">باقات بريميوم أصلية 100% وبأقل سعر في المغرب</p>
          </div>
          <Link to="/category/electronics" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-xl">
            مشاهدة الكل <ChevronLeft size={24} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map(product => (
            <div key={product.id} className="group relative bg-white dark:bg-slate-900 rounded-[50px] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] transition-all duration-700">
              {/* Product Badge */}
              <div className="absolute top-8 right-8 z-20 bg-brand-600 text-white px-5 py-2 rounded-full text-xs font-black shadow-2xl flex items-center gap-1.5 backdrop-blur-sm">
                <CheckCircle2 size={16} /> تفعيل مباشر
              </div>

              {/* Image with Parallax Effect */}
              <div className="aspect-[1.2] overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-90"></div>
              </div>

              {/* Content Card */}
              <div className="p-10 relative -mt-16">
                <div className="flex justify-center gap-1.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={`${i < (product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                  ))}
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-center mb-6 min-h-[96px] group-hover:text-brand-600 transition-colors leading-tight">{product.name}</h3>
                
                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-[35px] p-8 text-center mb-10 border border-slate-100 dark:border-slate-800/50 shadow-inner">
                  <span className="text-5xl font-black text-brand-600 dark:text-brand-400 tracking-tighter">{product.price}</span>
                  <span className="text-2xl font-black text-slate-400 mr-2 tracking-tight">درهم</span>
                </div>

                <Link to={`/product/${product.id}`} className="block w-full bg-slate-900 dark:bg-brand-600 text-white text-center py-6 rounded-[25px] font-black text-2xl hover:bg-brand-700 transition-all shadow-xl shadow-slate-900/10 dark:shadow-brand-600/20 active:scale-95">
                  احصل على التفعيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="max-w-7xl mx-auto px-4 mt-48">
        <div className="bg-slate-900 dark:bg-brand-600/5 rounded-[60px] p-16 md:p-24 text-center border border-slate-800 dark:border-brand-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          
          <Globe className="text-brand-500 mx-auto mb-10 group-hover:rotate-[360deg] transition-transform duration-1000" size={80} />
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">موثوقون من طرف +10,000 <br/> مستخدم رقمي بالمغرب</h2>
          <p className="text-2xl text-slate-400 dark:text-brand-200/60 max-w-3xl mx-auto font-bold mb-16 leading-relaxed">نحن نؤمن بأن المحتوى عالي الجودة يجب أن يكون متاحاً للجميع بأسعار عادلة وبأعلى معايير الأمان.</p>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 cursor-default">
            <span className="text-3xl md:text-5xl font-black text-white tracking-widest">NETFLIX</span>
            <span className="text-3xl md:text-5xl font-black text-white tracking-widest">CANVA</span>
            <span className="text-3xl md:text-5xl font-black text-white tracking-widest">IPTV</span>
            <span className="text-3xl md:text-5xl font-black text-white tracking-widest">SPOTIFY</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;