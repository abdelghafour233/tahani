
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryPageProps {
  products: Product[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({ products }) => {
  return (
    <div className="bg-dark-900 min-h-screen text-white">
      <div className="max-w-[1600px] mx-auto px-6 py-20">
        
        <div className="mb-20 text-center">
            <h1 className="text-5xl font-black mb-4 tracking-tighter">مكتبة النماذج</h1>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto">استكشف القدرات اللانهائية للذكاء الاصطناعي عبر مجموعتنا المتنوعة.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="group block">
                <div className="relative aspect-[4/5] bg-dark-800 rounded-none overflow-hidden mb-4 border border-dark-700 group-hover:border-zinc-500 transition-colors">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" 
                    />
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-white px-3 py-1 text-xs font-mono">
                        GEN-v2
                    </div>
                </div>
                
                <div className="flex justify-between items-start border-b border-dark-800 pb-4 group-hover:border-white transition-colors">
                    <div>
                        <h3 className="font-bold text-xl text-white mb-1">{product.name}</h3>
                        <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">{product.category} MODEL</p>
                    </div>
                    <ArrowUpRight className="text-zinc-600 group-hover:text-white transition-colors" />
                </div>
            </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
