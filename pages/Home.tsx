
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Laptop, Car, Watch, Glasses, Star, ChevronLeft } from 'lucide-react';

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div className="space-y-10 md:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[550px] bg-green-700 text-white flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1200" alt="Hero background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <h1 className="text-3xl md:text-7xl font-black mb-4 md:mb-6 drop-shadow-2xl leading-tight">أفضل العروض في المغرب</h1>
          <p className="text-lg md:text-3xl mb-8 md:mb-10 opacity-90 font-bold max-w-3xl mx-auto leading-relaxed">جودة عالية، أفضل الأسعار، وتوصيل مجاني لجميع المدن والدفع عند الاستلام</p>
          <div className="flex justify-center gap-4">
            <Link to="/category/electronics" className="bg-white text-green-700 px-8 md:px-12 py-3 md:py-4 rounded-full font-black text-lg md:text-xl hover:bg-gray-100 transition shadow-2xl transform hover:scale-105 active:scale-95">
              تسوق الآن
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-black mb-8 md:12 text-center text-gray-800 dark:text-gray-100">تصفح أقسامنا</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Electronics */}
          <Link to="/category/electronics" className="group bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[30px] md:rounded-[40px] flex flex-col items-center hover:shadow-xl transition transform active:scale-95 border border-gray-100 dark:border-slate-800 text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-4 md:p-5 rounded-2xl md:rounded-3xl mb-3 md:mb-5 group-hover:scale-110 transition">
              <Laptop className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <h3 className="text-base md:text-xl font-black">إلكترونيات</h3>
          </Link>
          
          {/* Glasses/Accessories */}
          <Link to="/category/accessories" className="group bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[30px] md:rounded-[40px] flex flex-col items-center hover:shadow-xl transition transform active:scale-95 border border-gray-100 dark:border-slate-800 text-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-4 md:p-5 rounded-2xl md:rounded-3xl mb-3 md:mb-5 group-hover:scale-110 transition">
              <Glasses className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <h3 className="text-base md:text-xl font-black">نظارات</h3>
          </Link>

          {/* Car Accessories */}
          <Link to="/category/cars" className="group bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[30px] md:rounded-[40px] flex flex-col items-center hover:shadow-xl transition transform active:scale-95 border border-gray-100 dark:border-slate-800 text-center">
            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-4 md:p-5 rounded-2xl md:rounded-3xl mb-3 md:mb-5 group-hover:scale-110 transition">
              <Car className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <h3 className="text-base md:text-xl font-black">إكسسوارات السيارات</h3>
          </Link>

          {/* Watches */}
          <Link to="/category/watches" className="group bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[30px] md:rounded-[40px] flex flex-col items-center hover:shadow-xl transition transform active:scale-95 border border-gray-100 dark:border-slate-800 text-center">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-4 md:p-5 rounded-2xl md:rounded-3xl mb-3 md:mb-5 group-hover:scale-110 transition">
              <Watch className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <h3 className="text-base md:text-xl font-black">ساعات</h3>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-4xl font-black dark:text-white">أحدث المنتجات</h2>
            <div className="w-12 md:w-20 h-1.5 md:h-2 bg-green-500 mt-2 md:mt-4 rounded-full"></div>
          </div>
          <Link to="/category/electronics" className="text-green-600 dark:text-green-400 font-black flex items-center gap-1 hover:underline text-sm md:text-lg">
            عرض الكل <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group bg-white dark:bg-slate-900 rounded-[25px] md:rounded-[35px] overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="relative aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-0.5 rounded-full text-xs font-black shadow-lg">
                  جديد
                </div>
              </div>
              <div className="p-5 md:p-6 flex-grow flex flex-col text-center">
                <h3 className="font-black text-xl md:text-2xl mb-1 text-gray-800 dark:text-gray-100 group-hover:text-green-600 transition line-clamp-1">{product.name}</h3>
                
                {/* Stars Rating */}
                <div className="flex justify-center gap-0.5 md:gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={`${i < (product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-[10px] md:text-xs text-gray-400 font-bold mr-1">({product.reviewsCount || 0})</span>
                </div>

                <div className="mt-auto">
                  <span className="text-2xl md:text-3xl font-black text-green-700 dark:text-green-400 block mb-4 md:mb-6">{product.price.toLocaleString()} درهم</span>
                  <button className="w-full bg-gray-900 dark:bg-slate-800 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black hover:bg-black transition active:scale-95">عرض المنتج</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
