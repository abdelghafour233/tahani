
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart, Heart, Share2, CheckCircle2, ShieldCheck, Truck, Zap } from 'lucide-react';

interface ProductDetailPageProps {
  products: Product[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="text-center py-20 dark:text-gray-400">المنتج غير موجود</div>;
  }

  const handleBuyNow = () => {
    navigate(`/checkout/${product.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="rounded-[40px] overflow-hidden border-2 border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold mb-2 inline-block">
                {product.category === 'electronics' ? 'إلكترونيات' : product.category === 'home' ? 'منتجات منزلية' : 'سيارات'}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{product.name}</h1>
              <p className="text-gray-400 dark:text-gray-500 text-lg">{product.nameEn}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-gray-100 dark:bg-slate-800 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 transition">
                <Heart />
              </button>
              <button className="p-3 bg-gray-100 dark:bg-slate-800 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition">
                <Share2 />
              </button>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-3xl mb-8 border border-green-100 dark:border-green-900/20">
            <div className="text-4xl font-black text-green-700 dark:text-green-400 mb-1">{product.price.toLocaleString()} درهم</div>
            <p className="text-green-600 dark:text-green-500 font-medium">الدفع عند الاستلام في جميع مدن المغرب</p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed mb-10 whitespace-pre-wrap">
            {product.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <Truck className="text-blue-600 mb-2" size={32} />
              <span className="text-sm font-bold text-gray-900 dark:text-gray-200">توصيل سريع</span>
              <span className="text-xs text-gray-500">24-48 ساعة</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <ShieldCheck className="text-green-600 mb-2" size={32} />
              <span className="text-sm font-bold text-gray-900 dark:text-gray-200">ضمان سنة</span>
              <span className="text-xs text-gray-500">على كل الأعطال</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <CheckCircle2 className="text-orange-600 mb-2" size={32} />
              <span className="text-sm font-bold text-gray-900 dark:text-gray-200">أصلي 100%</span>
              <span className="text-xs text-gray-500">من الوكيل الرسمي</span>
            </div>
          </div>

          <button 
            onClick={handleBuyNow}
            className="w-full h-20 rounded-3xl bg-green-600 text-white text-3xl font-black shadow-2xl hover:bg-green-700 transform active:scale-95 transition flex items-center justify-center gap-4 animate-pulse"
          >
            <Zap size={32} />
            اشتري الآن - الدفع عند الاستلام
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
