
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Menu, X, Moon, Sun, Lock, Eye, EyeOff, Key, MessageCircle } from 'lucide-react';
import { Product, Order, SiteSettings } from './types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from './constants';

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

  const WHATSAPP_NUMBER = "212649075664"; // الرقم المحول لصيغة دولية بدون أصفار زائدة

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-cairo bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* WhatsApp Floating Button */}
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=السلام عليكم، أريد الاستفسار عن منتج في متجركم`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 left-8 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 animate-bounce flex items-center justify-center"
          title="تواصل معنا عبر واتساب"
        >
          <MessageCircle size={32} fill="white" />
          <span className="absolute -top-2 -right-2 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-green-600 border-2 border-white"></span>
          </span>
        </a>

        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 dark:text-gray-300">
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
                <Link to="/" className="text-2xl font-black text-green-600 flex items-center gap-2">
                  <ShoppingBag className="w-8 h-8" />
                  <span className="hidden sm:inline">berrima.store</span>
                </Link>
              </div>

              <div className="hidden md:flex space-x-reverse space-x-8 text-lg font-black">
                <Link to="/" className="hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 transition">الرئيسية</Link>
                <Link to="/category/electronics" className="hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 transition">إلكترونيات</Link>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleDarkMode}
                  className="p-3 bg-gray-100 dark:bg-slate-800 rounded-2xl hover:bg-yellow-100 dark:hover:bg-slate-700 transition-all shadow-sm"
                >
                  {isDarkMode ? <Sun className="text-yellow-500 w-6 h-6" /> : <Moon className="text-slate-600 w-6 h-6" />}
                </button>
                <Link to="/dashboard" className="p-3 bg-gray-100 dark:bg-slate-800 rounded-2xl hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all shadow-sm">
                  <LayoutDashboard className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/category/:type" element={<CategoryPage products={products} />} />
            <Route path="/product/:id" element={<ProductDetailPage products={products} />} />
            <Route path="/checkout/:productId" element={<CheckoutPage products={products} placeOrder={placeOrder} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route 
              path="/dashboard/*" 
              element={
                isAuthenticated ? (
                  <DashboardPage 
                    orders={orders} 
                    settings={settings} 
                    setSettings={setSettings} 
                    products={products}
                    setProducts={setProducts}
                    setOrders={setOrders}
                  />
                ) : (
                  <div className="min-h-[60vh] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[35px] shadow-2xl border border-gray-100 dark:border-slate-800 w-full max-w-md">
                      <div className="flex justify-center mb-6">
                        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full text-green-600">
                          <Lock size={40} />
                        </div>
                      </div>
                      <h2 className="text-2xl font-black text-center mb-8">تسجيل الدخول للإدارة</h2>
                      <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                          <label className="block text-sm font-bold mb-2 text-gray-400">كلمة المرور</label>
                          <div className="relative">
                            <input 
                              type={showPassword ? "text" : "password"}
                              className={`w-full bg-gray-50 dark:bg-slate-800 border-2 rounded-2xl px-5 py-4 pl-12 focus:outline-none transition ${loginError ? 'border-red-400' : 'border-transparent focus:border-green-500'}`}
                              placeholder="أدخل كلمة السر"
                              value={passwordInput}
                              onChange={(e) => setPasswordInput(e.target.value)}
                            />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                            </button>
                            <Key className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={24} />
                          </div>
                          {loginError && <p className="text-red-500 text-sm mt-2 font-bold">كلمة السر غير صحيحة!</p>}
                        </div>
                        <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-green-700 transition">
                          دخول للوحة التحكم
                        </button>
                      </form>
                    </div>
                  </div>
                )
              } 
            />
          </Routes>
        </main>

        <footer className="bg-gray-900 dark:bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
            <div>
              <h3 className="text-2xl font-black mb-6 flex items-center justify-center md:justify-start gap-2">
                <ShoppingBag className="text-green-500" /> berrima.store
              </h3>
              <p className="text-gray-400 text-lg">وجهتكم الموثوقة للتسوق في المغرب. نوفر لكم أجود المنتجات مع خدمة الدفع عند الاستلام.</p>
            </div>
            <div>
              <h3 className="text-xl font-black mb-6 border-r-4 border-green-500 pr-4">روابط سريعة</h3>
              <ul className="space-y-3 text-gray-400 font-bold">
                <li><Link to="/category/electronics" className="hover:text-green-400 transition">إلكترونيات</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-green-400 transition">سياسة الخصوصية</Link></li>
                <li><Link to="/" className="hover:text-green-400 transition">الرئيسية</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black mb-6 border-r-4 border-green-500 pr-4">تواصل معنا</h3>
              <p className="text-gray-400 font-bold mb-2">اتصل بنا: 0649075664</p>
              <p className="text-green-400 font-bold italic">توصيل مجاني لجميع المدن المغربية</p>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-slate-900 mt-12 pt-8 text-center text-gray-500 font-bold">
            <p>© 2024 berrima.store. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
