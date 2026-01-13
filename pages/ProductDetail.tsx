
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart, Heart, Share2, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

interface ProductDetailPageProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return <div className="text-center py-20">المنتج غير موجود</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="rounded-3xl overflow-hidden border-2 border-gray-100 bg-white">
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:border-green-500 transition">
                <img src={`https://picsum.photos/seed/${product.id + i}/200`} alt="preview" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold mb-2 inline-block">
                {product.category === 'electronics' ? 'إلكترونيات' : product.category === 'home' ? 'منتجات منزلية' : 'سيارات'}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-400 text-lg">{product.nameEn}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-gray-100 rounded-full hover:bg-pink-50 hover:text-pink-600 transition">
                <Heart />
              </button>
              <button className="p-3 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-600 transition">
                <Share2 />
              </button>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl mb-8">
            <div className="text-4xl font-black text-green-700 mb-1">{product.price.toLocaleString()} درهم</div>
            <p className="text-green-600 font-medium">الدفع عند الاستلام في جميع مدن المغرب</p>
          </div>

          <p className="text-gray-600 text-xl leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <Truck className="text-blue-600 mb-2" size={32} />
              <span className="text-sm font-bold text-gray-900">توصيل سريع</span>
              <span className="text-xs text-gray-500">24-48 ساعة</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <ShieldCheck className="text-green-600 mb-2" size={32} />
              <span className="text-sm font-bold text-gray-900">ضمان سنة</span>
              <span className="text-xs text-gray-500">على كل الأعطال</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <CheckCircle2 className="text-orange-600 mb-2" size={32} />
              <span className="text-sm font-bold text-gray-900">أصلي 100%</span>
              <span className="text-xs text-gray-500">من الوكيل الرسمي</span>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <button 
              onClick={handleAddToCart}
              className={`flex-grow h-16 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95 shadow-xl ${
                isAdded ? 'bg-blue-600 text-white' : 'bg-green-600 text-white hover:bg-green-700 shadow-green-200'
              }`}
            >
              {isAdded ? (
                <>تمت الإضافة بنجاح !</>
              ) : (
                <>
                  <ShoppingCart size={28} />
                  أضف إلى السلة
                </>
              )}
            </button>
            <button 
              onClick={() => {
                addToCart(product);
                navigate('/checkout');
              }}
              className="px-8 h-16 rounded-2xl bg-gray-900 text-white font-bold hover:bg-black transition shadow-xl"
            >
              شراء الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
