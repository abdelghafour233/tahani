
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart, Heart, Share2, CheckCircle2, ShieldCheck, Truck, Zap, Star } from 'lucide-react';

interface ProductDetailPageProps {
  products: Product[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(product?.image || '');

  if (!product) {
    return <div className="text-center py-20 dark:text-gray-400">المنتج غير موجود</div>;
  }

  const handleBuyNow = () => {
    navigate(`/checkout/${product.id}`);
  };

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Gallery */}
        <div className="space-y-4 md:space-y-6">
          <div className="rounded-[30px] md:rounded-[40px] overflow-hidden border-2 border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-all duration-500">
            <img src={selectedImage || product.image} alt={product.name} className="w-full h-auto object-cover aspect-square" />
          </div>
          
          {/* Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
              {galleryImages.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-green-500 scale-105 shadow-md' : 'border-gray-100 dark:border-slate-800 opacity-60'}`}
                >
                  <img src={img} alt={`${product.name} ${index}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-xs md:text-sm font-bold mb-2 inline-block">
                {product.category === 'electronics' ? 'إلكترونيات' : product.category === 'home' ? 'منتجات منزلية' : product.category === 'cars' ? 'إكسسوارات سيارات' : 'إكسسوارات'}
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-2 md:gap-4 mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={`${i < (product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-bold">({product.reviewsCount || 0} تقييم موثق)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 md:p-3 bg-gray-100 dark:bg-slate-800 rounded-full hover:text-pink-600 transition active:scale-90">
                <Heart size={20} />
              </button>
              <button className="p-2 md:p-3 bg-gray-100 dark:bg-slate-800 rounded-full hover:text-blue-600 transition active:scale-90">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/10 p-5 md:p-6 rounded-2xl md:rounded-3xl mb-6 md:mb-8 border border-green-100 dark:border-green-900/20">
            <div className="text-3xl md:text-4xl font-black text-green-700 dark:text-green-400 mb-1">{product.price.toLocaleString()} درهم</div>
            <p className="text-sm md:text-base text-green-600 dark:text-green-500 font-medium">الدفع عند الاستلام في جميع مدن المغرب</p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-base md:text-xl leading-relaxed mb-8 whitespace-pre-wrap">
            {product.description}
          </p>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-10">
            <div className="flex flex-col items-center p-3 md:p-4 bg-gray-50 dark:bg-slate-800 rounded-xl md:rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
              <Truck className="text-blue-600 mb-1 md:mb-2 w-6 h-6 md:w-8 md:h-8" />
              <span className="text-[10px] md:text-sm font-bold text-gray-900 dark:text-gray-200">توصيل سريع</span>
            </div>
            <div className="flex flex-col items-center p-3 md:p-4 bg-gray-50 dark:bg-slate-800 rounded-xl md:rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
              <ShieldCheck className="text-green-600 mb-1 md:mb-2 w-6 h-6 md:w-8 md:h-8" />
              <span className="text-[10px] md:text-sm font-bold text-gray-900 dark:text-gray-200">ضمان سنة</span>
            </div>
            <div className="flex flex-col items-center p-3 md:p-4 bg-gray-50 dark:bg-slate-800 rounded-xl md:rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
              <CheckCircle2 className="text-orange-600 mb-1 md:mb-2 w-6 h-6 md:w-8 md:h-8" />
              <span className="text-[10px] md:text-sm font-bold text-gray-900 dark:text-gray-200">أصلي 100%</span>
            </div>
          </div>

          <button 
            onClick={handleBuyNow}
            className="w-full h-16 md:h-20 rounded-2xl md:rounded-3xl bg-green-600 text-white text-xl md:text-3xl font-black shadow-xl hover:bg-green-700 transform active:scale-95 transition flex items-center justify-center gap-3 md:gap-4 animate-pulse-slow"
          >
            <Zap size={24} className="md:w-8 md:h-8" />
            اشتري الآن - الدفع عند الاستلام
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
