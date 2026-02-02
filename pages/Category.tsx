
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  products: Product[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ products }) => {
  const { type } = useParams<{ type: string }>();
  
  const filteredProducts = products; // Simplified filtering for demo

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">جميع الأنماط</h1>
        <p className="text-slate-500">تصفح مجموعتنا المختارة من نماذج الذكاء الاصطناعي</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="group block">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden aspect-[4/5] mb-4 relative">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
            </div>
            
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-1">{product.name}</h3>
                    <p className="text-sm text-slate-500">{product.category}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                    <ArrowRight size={16} />
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
