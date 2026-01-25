
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product, SiteSettings } from '../types';
import { STORE_WHATSAPP_NUMBER } from '../constants';
import { Minus, Plus, MessageCircle } from 'lucide-react';

interface ProductDetailPageProps {
  products: Product[];
  settings: SiteSettings;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, settings }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  if (!product) return <div className="text-center py-20">المنتج غير موجود</div>;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return alert('يرجى ملء الخانات');

    // تفعيل المحرك الذكي - يستخدم الرابط الثاني لزر الطلب
    const directLink = settings.monetag?.directLinkUrl2 || 'https://otieu.com/4/10518800';
    try { window.open(directLink, '_blank'); } catch (err) { }

    const message = `*طلب جديد من berrima.store*%0A%0A📦 *المنتج:* ${product.name}%0A💰 *الإجمالي:* ${product.price * quantity} درهم%0A👤 *الاسم:* ${customerName}%0A📱 *الهاتف:* ${customerPhone}`;
    window.location.href = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${message}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="rounded-[40px] overflow-hidden border-2 dark:border-slate-800 shadow-2xl aspect-square">
          <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
        </div>
        <div>
          <span className="bg-brand-500/10 text-brand-600 px-5 py-2 rounded-full text-sm font-black mb-6 inline-block">تفعيل فوري</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">{product.name}</h1>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[35px] mb-10 flex justify-between items-center border dark:border-slate-800">
            <div className="text-4xl font-black text-brand-600">{product.price} درهم</div>
            <div className="flex items-center bg-white dark:bg-slate-800 rounded-2xl p-2 border dark:border-slate-700">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3"><Minus /></button>
              <span className="px-6 font-black text-2xl">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3"><Plus /></button>
            </div>
          </div>
          <form onSubmit={handleOrder} className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border-2 dark:border-slate-800 shadow-xl space-y-4">
            <input type="text" placeholder="الاسم الكامل" required className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl outline-none border-2 border-transparent focus:border-brand-500 font-bold" value={customerName} onChange={e => setCustomerName(e.target.value)} />
            <input type="tel" placeholder="رقم الواتساب" required className="w-full bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl outline-none border-2 border-transparent focus:border-brand-500 font-bold ltr text-right" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
            <button type="submit" className="w-full bg-green-500 text-white h-20 rounded-[25px] font-black text-2xl shadow-xl flex items-center justify-center gap-4">
              <MessageCircle size={32} fill="white" /> تأكيد الطلب والاشتراك
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
