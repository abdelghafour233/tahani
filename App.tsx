import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Menu, X, Moon, Sun, Lock, Eye, EyeOff, Key, MessageCircle, Zap, ShieldCheck } from 'lucide-react';
import { Product, Order, SiteSettings } from './types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, STORE_WHATSAPP_NUMBER } from './constants';

// Pages
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import ProductDetailPage from './pages/ProductDetail';
import CheckoutPage from './pages/Checkout';
import DashboardPage from './pages/Dashboard';
import PrivacyPolicyPage from './pages/PrivacyPolicy';

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('site_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_SETTINGS, ...parsed };
      } catch (e) {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const savedOrders = localStorage.getItem('site_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('elite_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('elite_theme', 'light');
    }
  };

  const placeOrder = (product: Product, quantity: number, customerData: { name: string, city: string, phone: string }) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      customerName: customerData.name,
      city: customerData.city,
      phone: customerData.phone,
      items: [{ productId: product.id, quantity, name: product.name, price: product.price }],
      total: product.price * quantity,
      date: new Date().toLocaleDateString('ar-MA'),
      status: 'pending'
    };
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('site_orders', JSON.stringify(updatedOrders));
    return newOrder.id;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === (settings.adminPassword || INITIAL_SETTINGS.adminPassword)) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-cairo bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        
        {/* Floating WhatsApp Service */}
        <a 
          href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 left-8 z-[100] group"
        >
          <div className="absolute -inset-2 bg-green-500/30 rounded-full blur group-hover:bg-green-500/50 transition duration-500"></div>
          <div className="relative bg-green-500 text-white p-5 rounded-full shadow-2xl transition-all transform group-hover:scale-110 active:scale-90">
            <MessageCircle size={32} fill="white" />
          </div>
        </a>

        {/* Glassmorphism Header */}
        <nav className="glass-nav border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-20 md:h-24 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-brand-600 p-2 rounded-xl group-hover:rotate-12 transition duration-300">
                  <Zap className="text-white w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-2xl md:text-3xl font-black tracking-tighter">berrima<span className="text-brand-600">.store</span></span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-reverse space-x-10">
              <Link to="/" className="text-lg font-black hover:text-brand-600 transition">الرئيسية</Link>
              <Link to="/category/electronics" className="text-lg font-black hover:text-brand-600 transition">الخدمات</Link>
              <Link to="/privacy-policy" className="text-lg font-black hover:text-brand-600 transition">سياسة الضمان</Link>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleDarkMode} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl transition hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-90">
                {isDarkMode ? <Sun className="text-amber-400" /> : <Moon className="text-slate-600" />}
              </button>
              <Link to="/dashboard" className="hidden sm:flex items-center gap-2 px-5 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-black text-sm hover:opacity-90 active:scale-95 transition">
                <LayoutDashboard size={18} /> لوحة الإدارة
              </Link>
            </div>
          </div>
          
          {/* Mobile Side Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-slate-900 p-6 flex flex-col font-black border-t dark:border-slate-800 text-right space-y-4 animate-in slide-in-from-top duration-300">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">الرئيسية</Link>
              <Link to="/category/electronics" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">الخدمات الرقمية</Link>
              <Link to="/privacy-policy" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">سياسة الضمان</Link>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="p-4 border-2 border-slate-900 dark:border-white rounded-2xl text-center">دخول الإدارة</Link>
            </div>
          )}
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/category/:type" element={<CategoryPage products={products} />} />
            <Route path="/product/:id" element={<ProductDetailPage products={products} placeOrder={placeOrder} />} />
            <Route path="/checkout/:productId" element={<CheckoutPage products={products} placeOrder={placeOrder} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/dashboard/*" element={
              isAuthenticated ? (
                <DashboardPage orders={orders} settings={settings} setSettings={setSettings} products={products} setProducts={setProducts} setOrders={setOrders} />
              ) : (
                <div className="min-h-[70vh] flex items-center justify-center p-6">
                  <div className="bg-white dark:bg-slate-900 p-10 rounded-[45px] shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-md text-center">
                    <div className="bg-brand-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-500/20">
                      <Lock className="text-white" size={40} />
                    </div>
                    <h2 className="text-3xl font-black mb-4">منطقة المحترفين</h2>
                    <p className="text-slate-500 mb-8 font-bold">أدخل كلمة المرور للوصول إلى لوحة التحكم</p>
                    <form onSubmit={handleLogin} className="space-y-5">
                      {loginError && <p className="text-red-500 font-black animate-pulse bg-red-50 p-3 rounded-xl">⚠️ كلمة السر غير صحيحة</p>}
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-5 pl-14 focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-right font-bold text-lg"
                          placeholder="كلمة المرور"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                          {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                        </button>
                      </div>
                      <button className="w-full bg-slate-900 dark:bg-brand-600 text-white py-5 rounded-2xl font-black text-xl hover:opacity-95 transform active:scale-95 transition-all shadow-xl">تحقق ودخول</button>
                    </form>
                  </div>
                </div>
              )
            } />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-white py-20 mt-20 border-t-4 border-brand-600">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-right">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <Zap className="text-brand-500 w-8 h-8" />
                <span className="text-3xl font-black">berrima<span className="text-brand-500">.store</span></span>
              </Link>
              <p className="text-slate-400 font-bold leading-relaxed">الوجهة الأولى في المغرب للحصول على كافة اشتراكاتك الرقمية الرسمية بضمان كامل وأقل سعر في السوق.</p>
            </div>
            <div>
              <h3 className="text-xl font-black mb-6 text-brand-500">تصفح</h3>
              <ul className="text-slate-300 space-y-3 font-bold">
                <li><Link to="/" className="hover:text-brand-500 transition">الرئيسية</Link></li>
                <li><Link to="/category/electronics" className="hover:text-brand-500 transition">الخدمات الرقمية</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-brand-500 transition">سياسة الضمان</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black mb-6 text-brand-500">تواصل معنا</h3>
              <div className="space-y-4">
                <a href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`} className="flex items-center justify-center md:justify-start gap-3 text-slate-300 font-bold hover:text-brand-500 transition">
                  <MessageCircle size={20} /> واتساب: {STORE_WHATSAPP_NUMBER}
                </a>
                <div className="flex items-center justify-center md:justify-start gap-3 text-slate-300 font-bold">
                  <ShieldCheck size={20} /> ضمان رسمي 100%
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start justify-center">
               <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 w-full">
                  <span className="text-brand-500 font-black block mb-2">حالة الخدمة</span>
                  <div className="flex items-center gap-2 text-green-400 font-bold">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    جميع الأنظمة تعمل بكفاءة
                  </div>
               </div>
               <p className="text-xs text-slate-500 mt-4 font-black">v4.0 Elite Edition | 2024</p>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-slate-800 text-center text-slate-500 font-bold">
            <p>© {new Date().getFullYear()} berrima.store. صمم باحترافية لخدمتكم.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;