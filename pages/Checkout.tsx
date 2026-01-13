
import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Product } from '../types';
import { MOROCCAN_CITIES, STORE_WHATSAPP_NUMBER } from '../constants';
import { CheckCircle, Truck, ShieldCheck, MapPin, Phone, User, ArrowLeft, Minus, Plus, MessageSquare } from 'lucide-react';

interface CheckoutPageProps {
  products: Product[];
  placeOrder: (product: Product, quantity: number, data: { name: string, city: string, phone: string }) => string;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ products, placeOrder }) => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === productId);

  const [formData, setFormData] = useState({ name: '', city: '', phone: '' });
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-gray-500 mb-8">المنتج غير موجود.</p>
        <Link to="/" className="text-green-600 font-bold text-lg underline">العودة للرئيسية</Link>
      </div>
    );
  }

  const total = product.price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.city || !formData.phone) {
      alert("يرجى ملء جميع الخانات المطلوبة");
      return;
    }
    
    setIsOrdering(true);
    
    // Construct WhatsApp Message
    const message = `*طلب جديد من berrima.store*%0A%0A` +
      `*المنتج:* ${product.name}%0A` +
      `*الكمية:* ${quantity}%0A` +
      `*السعر الإجمالي:* ${total} درهم%0A%0A` +
      `*معلومات الزبون:*%0A` +
      `*الاسم:* ${formData.name}%0A` +
      `*المدينة:* ${formData.city}%0A` +
      `*الهاتف:* ${formData.phone}%0A%0A` +
      `يرجى تأكيد الطلب في أقرب وقت.`;
    
    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${message}`;

    setTimeout(() => {
      // 1. Save locally for admin dashboard
      const id = placeOrder(product, quantity, formData);
      setOrderId(id);
      setIsOrdering(false);
      
      // 2. Redirect to WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Scroll to top
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (orderId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-in fade-in duration-700">
        <div className="mb-10 flex justify-center">
          <div className="bg-green-100 dark:bg-green-900/30 p-8 rounded-full text-green-600 dark:text-green-400 animate-bounce">
            <CheckCircle size={80} />
          </div>
        </div>
        <h1 className="text-4xl font-black mb-4">تم إرسال طلبك بنجاح!</h1>
        <p className="text-gray-500 text-xl mb-2">لقد تلقينا طلبك رقم <span className="text-green-600 font-bold">{orderId}</span></p>
        <p className="text-gray-500 text-lg mb-10">لقد تم توجيه معلوماتك عبر الواتساب لتأكيد طلبك بسرعة أكبر. سيقوم فريقنا بالتواصل معك قريباً.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <Truck className="mx-auto text-blue-500 mb-3" size={40} />
            <h3 className="font-bold">توصيل سريع</h3>
            <p className="text-sm text-gray-500">من 24 إلى 48 ساعة</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <ShieldCheck className="mx-auto text-green-500 mb-3" size={40} />
            <h3 className="font-bold">ضمان حقيقي</h3>
            <p className="text-sm text-gray-500">خدمة ما بعد البيع</p>
          </div>
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <Phone className="mx-auto text-orange-500 mb-3" size={40} />
            <h3 className="font-bold">دعم هاتفي</h3>
            <p className="text-sm text-gray-500">متواجدون دائماً</p>
          </div>
        </div>

        <Link to="/" className="bg-gray-900 dark:bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-xl inline-flex items-center gap-2">
          العودة للتسوق <ArrowLeft size={24} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form - First on mobile */}
        <div className="order-1 lg:order-1">
          <h1 className="text-3xl font-black mb-8 border-r-4 border-green-600 pr-4">أكمل معلوماتك للطلب</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-lg font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User size={20} className="text-green-600" /> الاسم
              </label>
              <input 
                required
                type="text" 
                placeholder=""
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 focus:border-green-500 focus:ring-0 focus:outline-none transition text-lg bg-white dark:bg-slate-900 dark:text-white"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            {/* City Field - Dropdown */}
            <div className="space-y-2">
              <label className="text-lg font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <MapPin size={20} className="text-green-600" /> المدينة
              </label>
              <select 
                required
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 focus:border-green-500 focus:ring-0 focus:outline-none transition text-lg bg-white dark:bg-slate-900 dark:text-white appearance-none"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              >
                <option value="">-- اختر مدينتك --</option>
                {MOROCCAN_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="text-lg font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Phone size={20} className="text-green-600" /> رقم الهاتف
              </label>
              <input 
                required
                type="tel" 
                placeholder=""
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 focus:border-green-500 focus:ring-0 focus:outline-none transition text-lg bg-white dark:bg-slate-900 dark:text-white ltr"
                style={{ direction: 'ltr', textAlign: 'right' }}
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl flex items-start gap-4 border border-green-100 dark:border-green-900/20">
              <div className="bg-green-600 text-white p-2 rounded-lg mt-1">
                <MessageSquare size={24} />
              </div>
              <div>
                <h4 className="font-bold text-green-900 dark:text-green-400">الطلب عبر الواتساب</h4>
                <p className="text-green-700 dark:text-green-300 text-sm">سيتم إرسال معلوماتك مباشرة عبر الواتساب لتسريع معالجة طلبك وتأكيده.</p>
              </div>
            </div>

            <button 
              disabled={isOrdering}
              type="submit"
              className="w-full bg-green-600 text-white py-6 rounded-2xl font-black text-2xl hover:bg-green-700 transition shadow-xl shadow-green-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-95"
            >
              {isOrdering ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري إرسال الطلب...
                </div>
              ) : (
                <>تأكيد الطلب الآن</>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary - Second on mobile */}
        <div className="order-2 lg:order-2">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-2xl overflow-hidden sticky top-24">
            <div className="p-8 bg-gray-50 dark:bg-slate-800 border-b dark:border-slate-700">
              <h2 className="text-2xl font-bold">ملخص طلبك</h2>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-32 h-32 bg-gray-100 dark:bg-slate-800 rounded-2xl overflow-hidden p-2 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-black text-xl text-gray-900 dark:text-white mb-2">{product.name}</h3>
                  <p className="text-green-600 dark:text-green-400 font-black text-xl mb-4">{product.price.toLocaleString()} درهم</p>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 font-bold">الكمية:</span>
                    <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden border dark:border-slate-700">
                      <button 
                        type="button"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400 transition"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="px-4 font-black text-lg text-gray-900 dark:text-white min-w-[40px] text-center">{quantity}</span>
                      <button 
                        type="button"
                        onClick={() => setQuantity(q => q + 1)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400 transition"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t dark:border-slate-800 pt-8 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 dark:text-gray-400 font-bold">سعر الوحدة:</span>
                  <span className="font-black">{product.price.toLocaleString()} درهم</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600 dark:text-gray-400 font-bold">التوصيل:</span>
                  <span className="text-green-600 dark:text-green-400 font-black">مجاني (0 درهم)</span>
                </div>
                <div className="flex justify-between text-3xl font-black text-green-700 dark:text-green-400 pt-6 border-t border-dashed dark:border-slate-800">
                  <span>الإجمالي:</span>
                  <span>{total.toLocaleString()} درهم</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
