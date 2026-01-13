
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 0 : 0; // Free shipping
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-gray-50 inline-block p-10 rounded-full mb-6">
          <ShoppingBag size={80} className="text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold mb-4">سلة التسوق فارغة</h2>
        <p className="text-gray-500 text-lg mb-8">لم تقم بإضافة أي منتجات للسلة بعد.</p>
        <Link to="/" className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-green-700 transition shadow-xl inline-flex items-center gap-2">
          ابدأ التسوق الآن <ArrowRight size={24} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-10">سلة التسوق ({cart.length})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 md:items-center shadow-sm">
              <img src={item.image} alt={item.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl" />
              <div className="flex-grow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg md:text-xl mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                  <p className="text-green-600 font-bold">{item.price.toLocaleString()} درهم</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-gray-50">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-gray-200 transition text-gray-500">
                      <Minus size={20} />
                    </button>
                    <span className="px-4 font-bold text-lg">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-200 transition text-gray-500">
                      <Plus size={20} />
                    </button>
                  </div>
                  
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-6 border-b pb-4">ملخص الطلب</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-600">
              <span>المجموع الفرعي:</span>
              <span className="font-bold">{subtotal.toLocaleString()} درهم</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>التوصيل:</span>
              <span className="text-green-600 font-bold">مجاني</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-2xl font-black text-gray-900">
              <span>الإجمالي:</span>
              <span>{total.toLocaleString()} درهم</span>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-green-700 transition shadow-xl shadow-green-100 flex items-center justify-center gap-3"
          >
            إتمام الطلب
            <ArrowRight size={24} />
          </button>
          
          <div className="mt-6 space-y-3">
            <p className="text-xs text-center text-gray-400">الدفع عند الاستلام متاح لجميع الطلبات</p>
            <div className="flex justify-center gap-4 opacity-50 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="payment" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.svg" alt="payment" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="payment" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
