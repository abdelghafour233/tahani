
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Menu, X, Moon, Sun, Lock, Eye, EyeOff, MessageCircle, Sparkles, Wand2 } from 'lucide-react';
import { Product, Order, SiteSettings } from './types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, STORE_WHATSAPP_NUMBER } from './constants';

// Pages
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import ProductDetailPage from './pages/ProductDetail';
import DashboardPage from './pages/Dashboard';
import PrivacyPolicyPage from './pages/PrivacyPolicy';

const AdSync: React.FC = () => {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
};

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('site_settings');
    if (saved) {
      try { return { ...INITIAL_SETTINGS, ...JSON.parse(saved) }; } catch (e) { return INITIAL_SETTINGS; }
    }
    return INITIAL_SETTINGS;
  });
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('elite_theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // المحرك الذكي - يستخدم الرابط الأول للزر العائم
  const handleWhatsAppWithAd = useCallback(() => {
    const directLink = settings.monetag?.directLinkUrl || 'https://otieu.com/4/10518792';
    try { window.open(directLink, '_blank'); } catch (e) { }
    window.location.href = `https://wa.me/${STORE_WHATSAPP_NUMBER}`;
  }, [settings]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('site_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('elite_theme', newMode ? 'dark' : 'light');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === (settings.adminPassword || INITIAL_SETTINGS.adminPassword)) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else { setLoginError(true); }
  };

  return (
    <Router>
      <AdSync />
      <div className="min-h-screen flex flex-col font-cairo bg-slate-50 dark:bg-darkest text-slate-900 dark:text-slate-100 transition-colors duration-300">
        
        {/* Floating WhatsApp Button (Smart Engine Link 1) */}
        <button 
          onClick={handleWhatsAppWithAd}
          className="fixed bottom-8 left-8 z-[100] group"
        >
          <div className="absolute -inset-2 bg-brand-500/20 rounded-full blur group-hover:bg-brand-500/40 transition duration-500"></div>
          <div className="relative bg-brand-600 text-white p-5 rounded-full shadow-2xl transition-all transform group-hover:scale-110 active:scale-95">
            <MessageCircle size={32} fill="white" />
          </div>
        </button>

        <nav className="glass-nav border-b border-slate-200 dark:border-brand-900/30 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-20 md:h-24 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="flex items-center gap-3 group">
                <div className="bg-brand-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-all">
                  <Wand2 className="text-white w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-2xl md:text-3xl font-black tracking-tighter">berrima<span className="text-brand-500">.ai</span></span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-reverse space-x-12 font-black">
              <Link to="/" className="hover:text-brand-500 transition">الرئيسية</Link>
              <Link to="/category/anime" className="hover:text-brand-500 transition">أنماط الذكاء الاصطناعي</Link>
              <Link to="/privacy-policy" className="hover:text-brand-500 transition">كيف يعمل؟</Link>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleDarkMode} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl transition-all">
                {isDarkMode ? <Sun className="text-amber-400" /> : <Moon className="text-slate-600" />}
              </button>
              <Link to="/dashboard" className="hidden sm:flex items-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm">
                لوحة التحكم
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/category/:type" element={<CategoryPage products={products} />} />
            <Route path="/product/:id" element={<ProductDetailPage products={products} settings={settings} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/dashboard/*" element={
              isAuthenticated ? (
                <DashboardPage orders={orders} settings={settings} setSettings={setSettings} products={products} setProducts={setProducts} setOrders={setOrders} />
              ) : (
                <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
                  <div className="bg-white dark:bg-slate-900 p-12 rounded-[45px] shadow-2xl w-full max-w-md border border-brand-500/20">
                    <div className="bg-brand-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-500/20">
                      <Lock className="text-white" size={48} />
                    </div>
                    <h2 className="text-3xl font-black mb-8">منطقة المطورين</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                      <input 
                        type={showPassword ? "text" : "password"}
                        className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent rounded-2xl px-6 py-5 focus:border-brand-500 outline-none transition text-center font-bold text-lg dark:text-white"
                        placeholder="رمز الدخول"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                      />
                      <button className="w-full bg-slate-900 dark:bg-brand-600 text-white py-5 rounded-2xl font-black text-xl active:scale-95 transition-all">دخول</button>
                    </form>
                  </div>
                </div>
              )
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
