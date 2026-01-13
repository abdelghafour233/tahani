
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, Category } from '../types';
import { Star } from 'lucide-react';

interface CategoryPageProps {
  products: Product[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ products }) => {
  const { type } = useParams<{ type: string }>();
  
  const filteredProducts = products.filter(p => p.category === type);
  
  const getCategoryTitle = (cat: string) => {
    switch(cat) {
      case 'electronics': return 'إلكترونيات';
      case 'home': return 'منزلية';
      case 'cars': return 'اكسسوارات السيارات';
      case 'watches': return 'ساعات';
      case 'accessories': return 'نظارات واكسسوارات';
      default: return 'المنتجات';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-8 text-sm flex items-center gap-2 text-gray-500">
        <Link to="/" className="hover:text-green-600">الرئيسية</Link>
        <span>/</span>
        <span className="text-gray-900 font-bold dark:text-gray-100">{getCategoryTitle(type || '')}</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold dark:text-white">{getCategoryTitle(type || '')}</h1>
        <div className="flex gap-4 items-center bg-white dark:bg-slate-900 p-2 rounded-lg border dark:border-slate-800 shadow-sm">
          <span className="text-sm text-gray-500 dark:text-gray-400">ترتيب حسب:</span>
          <select className="bg-transparent font-medium focus:outline-none dark:text-white">
            <option className="dark:bg-slate-900">الأحدث</option>
            <option className="dark:bg-slate-900">السعر من الأقل للأعلى</option>
            <option className="dark:bg-slate-900">السعر من الأعلى للأقل</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-800">
          <p className="text-gray-400 dark:text-gray-500 text-xl">لا توجد منتجات في هذه الفئة حالياً.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="font-bold text-xl mb-1 group-hover:text-green-600 transition dark:text-white">{product.name}</h3>
                
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={`${i < (product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-[10px] text-gray-400 font-bold mr-1">({product.reviewsCount || 0})</span>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex justify-between items-end">
                  <div>
                    <span className="block text-2xl font-extrabold text-green-700 dark:text-green-400">{product.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">درهم مغربي</span>
                  </div>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;