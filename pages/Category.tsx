
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, Category } from '../types';
import { Star, Wand2, Share2, Layers } from 'lucide-react';

interface CategoryPageProps {
  products: Product[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ products }) => {
  const { type } = useParams<{ type: string }>();
  
  const filteredProducts = products.filter(p => p.category === type || type === 'anime'); // Show all for demo if needed or filter strictly
  
  const getCategoryTitle = (cat: string) => {
    switch(cat) {
      case 'anime': return 'أنمي ياباني';
      case 'realistic': return 'واقعي';
      case 'art': return 'فن رقمي';
      case '3d': return 'ثلاثي الأبعاد';
      case 'professional': return 'احترافي';
      default: return 'كل الأنماط';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-8 text-sm flex items-center gap-2 text-gray-500">
        <Link to="/" className="hover:text-brand-600">الرئيسية</Link>
        <span>/</span>
        <span className="text-gray-900 font-bold dark:text-gray-100">{getCategoryTitle(type || '')}</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-black dark:text-white flex items-center gap-3">
          <Layers className="text-brand-500" /> {getCategoryTitle(type || '')}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? filteredProducts.map(product => (
          <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-[30px] overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 flex flex-col hover:border-brand-500/30">
            <Link to={`/product/${product.id}`} className="block flex-grow">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-4 right-4 bg-brand-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
                  AI Generated
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-black text-xl mb-2 group-hover:text-brand-600 transition dark:text-white">{product.name}</h3>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={`${i < (product.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-slate-700'}`} />
                  ))}
                </div>
                <div className="mt-auto">
                  <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-xl font-black hover:opacity-90 transition-colors shadow-lg flex items-center justify-center gap-2">
                    <Wand2 size={18} /> جرب هذا النمط
                  </button>
                </div>
              </div>
            </Link>
          </div>
        )) : (
          <div className="col-span-full text-center py-20 text-gray-500">لا توجد أنماط في هذه الفئة حالياً.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
