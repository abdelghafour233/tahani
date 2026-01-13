
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Menu, X, Moon, Sun, Lock, Eye, EyeOff, Key, MessageCircle } from 'lucide-react';
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
        return {
          ...INITIAL_SETTINGS,
          ...parsed,
          pixels: {
            ...INITIAL_SETTINGS.pixels,
            ...(parsed.pixels || {})
          }
        };
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
      items: [{ productId: product.id, quantity: quantity, name: product.name, price: product.price }],
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
    const correctPassword = settings.adminPassword || INITIAL_SETTINGS.adminPassword;
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-cairo bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* WhatsApp Floating Button - Mobile Adjusted */}
        <a 
          href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=السلام عليكم، أريد الاستفسار عن منتج في متجركم`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-[100] bg-green-500 text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 animate-bounce flex items-center justify-center active:scale-90"
          title="تواصل معنا عبر واتساب"
        >
          <MessageCircle size={28} className="md:w-8 md:h-8" fill="white" />
        </a>

        <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 md:h-20 items-center">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 dark:text-gray-300 active:bg-gray-100 dark:active:bg-slate-800 rounded-lg">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <Link to="/" className="text-xl md:text-2xl font-black text-green-600 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="truncate max-w-[120px] sm:max-w-none">berrima.store</span>
                </Link>
              </div>

              <div className="hidden md:flex space-x-reverse space-x-8 text-lg font-black">
                <Link to="/" className="hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 transition">الرئيسية</Link>
                <Link to="/category/electronics" className="hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 transition">إلكترونيات</Link>
                <Link to="/category/cars" className="hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 transition">إكسسوارات السيارات</Link>
                <Link to="/category/watches" className="hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 transition">ساعات</Link>
              </div>

              <div className="flex items-center gap-1 md:gap-2">
                <button 
                  onClick={toggleDarkMode}
                  className="p-2 md:p-3 bg-gray-100 dark:bg-slate-800 rounded-xl md:rounded-2xl hover:bg-yellow-100 dark:hover:bg-slate-700 transition-all shadow-sm active:scale-90"
                >
                  {isDarkMode ? <Sun className="text-yellow-500 w-5 h-5 md:w-6 md:h-6" /> : <Moon className="text-slate-600 w-5 h-5 md:w-6 md:h-6" />}
                </button>
                <Link to="/dashboard" className="p-2 md:p-3 bg-gray-100 dark:bg-slate-800 rounded-xl md:rounded-2xl hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all shadow-sm active:scale-90">
                  <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu - Improved Animation and Style */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-slate-900 border-b dark:border-slate-800 p-4 space-y-2 flex flex-col font-bold animate-in slide-in-from-top duration-300">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="p-3 hover:bg-green-50 dark:hover:bg-green-900/10 rounded-xl transition text-right">الرئيسية</Link>
              <Link to="/category/electronics" onClick={() => setIsMenuOpen(false)} className="p-3 hover:bg-green-50 dark:hover:bg-green-900/10 rounded-xl transition text-right">إلكترونيات</Link>
              <Link to="/category/accessories" onClick={() => setIsMenuOpen(false)} className="p-3 hover:bg-green-50 dark:hover:bg-green-900/10 rounded-xl transition text-right">نظارات</Link>
              <Link to="/category/cars" onClick={() => setIsMenuOpen(false)} className="p-3 hover:bg-green-50 dark:hover:bg-green-900/10 rounded-xl transition text-right">إكسسوارات السيارات</Link>
              <Link to="/category/watches" onClick={() => setIsMenuOpen(false)} className="p-3 hover:bg-green-50 dark:hover:bg-green-900/10 rounded-xl transition text-right">ساعات</Link>
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
                <div className="min-h-[60vh] flex items-center justify-center p-4">
                  <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[30px] md:rounded-[35px] shadow-2xl border border-gray-100 dark:border-slate-800 w-full max-w-md">
                    <h2 className="text-xl md:text-2xl font-black text-center mb-6">تسجيل الدخول للإدارة</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          className="w-full bg-gray-50 dark:bg-slate-800 border-2 rounded-xl md:rounded-2xl px-5 py-3 md:py-4 pl-12 focus:outline-none focus:border-green-500 transition"
                          placeholder="أدخل كلمة السر"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        <Key className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                      </div>
                      <button className="w-full bg-green-600 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-green-700 transition active:scale-95">دخول</button>
                    </form>
                  </div>
                </div>
              )
            } />
          </Routes>
        </main>

        <footer className="bg-gray-900 dark:bg-black text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-right">
            <div>
              <h3 className="text-xl md:text-2xl font-black mb-4 flex items-center justify-center md:justify-start gap-2">
                <ShoppingBag className="text-green-500" /> berrima.store
              </h3>
              <p className="text-gray-400 text-sm md:text-lg">وجهتكم الموثوقة للتسوق في المغرب. نوفر لكم أجود المنتجات مع خدمة الدفع عند الاستلام.</p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-black mb-4 border-r-0 md:border-r-4 border-green-500 pr-0 md:pr-4">روابط سريعة</h3>
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-3 text-gray-400 font-bold text-sm md:text-base">
                <li><Link to="/category/electronics" className="hover:text-green-400 transition">إلكترونيات</Link></li>
                <li><Link to="/category/accessories" className="hover:text-green-400 transition">نظارات</Link></li>
                <li><Link to="/category/cars" className="hover:text-green-400 transition">إكسسوارات السيارات</Link></li>
                <li><Link to="/category/watches" className="hover:text-green-400 transition">ساعات</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-black mb-4 border-r-0 md:border-r-4 border-green-500 pr-0 md:pr-4">تواصل معنا</h3>
              <p className="text-gray-400 font-bold mb-2 text-sm md:text-base">واتساب: {STORE_WHATSAPP_NUMBER}</p>
              <p className="text-green-400 font-bold italic text-sm md:text-base">توصيل مجاني لجميع المدن المغربية</p>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-slate-900 mt-10 md:mt-12 pt-6 md:pt-8 text-center text-gray-500 font-bold text-xs md:text-sm">
            <p>© 2024 berrima.store. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
