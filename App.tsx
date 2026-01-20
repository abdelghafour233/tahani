
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Menu, X, Moon, Sun, Lock, Eye, EyeOff, Key, MessageCircle, Zap, ShieldCheck, Crown } from 'lucide-react';
import { Product, Order, SiteSettings } from './types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, STORE_WHATSAPP_NUMBER } from './constants';

// Pages
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import ProductDetailPage from './pages/ProductDetail';
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

    // Inject Scripts
    const injectScripts = (scripts: string[], container: HTMLElement = document.body) => {
      scripts.forEach(scriptStr => {
        if (scriptStr && scriptStr.trim() !== '') {
          try {
            const range = document.createRange();
            const fragment = range.createContextualFragment(scriptStr);
            container.appendChild(fragment);
          } catch (e) {
            console.error("Script injection failed", e);
          }
        }
      });
    };

    // 1. Adsterra
    if (settings.adsterra) {
      injectScripts([
        settings.adsterra.popunderScript,
        settings.adsterra.socialBarScript,
        settings.adsterra.nativeAdsScript
      ]);
    }

    // 2. Monetag
    if (settings.monetag) {
      injectScripts([
        settings.monetag.mainScript,
        settings.monetag.vignetteScript
      ]);
    }

    // 3. Custom Codes
    if (settings.customHeadCode) {
      injectScripts([settings.customHeadCode], document.head);
    }
    if (settings.customBodyCode) {
      injectScripts([settings.customBodyCode], document.body);
    }

  }, [settings]);

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
      <div className="min-h-screen flex flex-col font-cairo bg-slate-50 dark:bg-darkest text-slate-900 dark:text-slate-100 transition-colors duration-300">
        
        {/* WhatsApp Button Floating */}
        <a 
          href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 left-8 z-[100] group"
        >
          <div className="absolute -inset-2 bg-green-500/20 rounded-full blur group-hover:bg-green-500/40 transition duration-500"></div>
          <div className="relative bg-brand-600 text-white p-5 rounded-full shadow-2xl transition-all transform group-hover:scale-110 active:scale-95">
            <MessageCircle size={32} fill="white" />
          </div>
        </a>

        {/* Premium Header */}
        <nav className="glass-nav border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-20 md:h-24 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl transition-colors">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="flex items-center gap-3 group">
                <div className="bg-brand-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-brand-500/20">
                  <Zap className="text-white w-6 h-6 md:w-8 md:h-8" />
                </div>
                <span className="text-2xl md:text-3xl font-black tracking-tighter">berrima<span className="text-brand-600">.store</span></span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-reverse space-x-12">
              <Link to="/" className="text-lg font-black hover:text-brand-600 transition">الرئيسية</Link>
              <Link to="/category/electronics" className="text-lg font-black hover:text-brand-600 transition">الاشتراكات</Link>
              <Link to="/privacy-policy" className="text-lg font-black hover:text-brand-600 transition">سياسة التفعيل</Link>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleDarkMode} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl transition-all hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-90">
                {isDarkMode ? <Sun className="text-amber-400" /> : <Moon className="text-slate-600" />}
              </button>
              <Link to="/dashboard" className="hidden sm:flex items-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-black/10">
                <LayoutDashboard size={18} /> لوحة التحكم
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-slate-900 p-6 flex flex-col font-black border-t dark:border-slate-800 text-right space-y-4 shadow-2xl">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">الرئيسية</Link>
              <Link to="/category/electronics" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">الخدمات الرقمية</Link>
              <Link to="/privacy-policy" onClick={() => setIsMenuOpen(false)} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">سياسة التفعيل</Link>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="p-4 bg-brand-600 text-white rounded-2xl text-center shadow-lg">لوحة الإدارة</Link>
            </div>
          )}
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/category/:type" element={<CategoryPage products={products} />} />
            <Route path="/product/:id" element={<ProductDetailPage products={products} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/dashboard/*" element={
              isAuthenticated ? (
                <DashboardPage orders={orders} settings={settings} setSettings={setSettings} products={products} setProducts={setProducts} setOrders={setOrders} />
              ) : (
                <div className="min-h-[70vh] flex items-center justify-center p-6">
                  <div className="bg-white dark:bg-slate-900 p-12 rounded-[45px] shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-md text-center">
                    <div className="bg-brand-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-500/30">
                      <Lock className="text-white" size={48} />
                    </div>
                    <h2 className="text-3xl font-black mb-4">دخول المسؤولين</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 font-bold">يرجى إدخال كلمة المرور للوصول إلى لوحة التحكم</p>
                    <form onSubmit={handleLogin} className="space-y-6">
                      {loginError && <p className="text-red-500 font-black bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl animate-pulse">⚠️ كلمة السر غير صحيحة</p>}
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-5 ltr focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-center font-bold text-lg"
                          placeholder="كلمة المرور"
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                          {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                        </button>
                      </div>
                      <button className="w-full bg-slate-900 dark:bg-brand-600 text-white py-5 rounded-2xl font-black text-xl hover:shadow-2xl transform active:scale-95 transition-all">تحقق ودخول</button>
                    </form>
                  </div>
                </div>
              )
            } />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-white py-20 border-t-8 border-brand-600">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-right">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="flex items-center justify-center md:justify-start gap-3 mb-8">
                <Zap className="text-brand-500 w-10 h-10" />
                <span className="text-4xl font-black tracking-tighter">berrima<span className="text-brand-500">.store</span></span>
              </Link>
              <p className="text-slate-400 font-bold leading-relaxed text-lg">المنصة الأولى بالمغرب المتخصصة في تفعيل الاشتراكات الرقمية والخدمات البريميوم بضمان رسمي 100%.</p>
            </div>
            <div>
              <h3 className="text-xl font-black mb-8 text-brand-500 uppercase tracking-widest">تصفح المتجر</h3>
              <ul className="text-slate-300 space-y-4 font-bold text-lg">
                <li><Link to="/" className="hover:text-brand-500 transition">الرئيسية</Link></li>
                <li><Link to="/category/electronics" className="hover:text-brand-500 transition">الخدمات الرقمية</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-brand-500 transition">سياسة التفعيل</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black mb-8 text-brand-500 uppercase tracking-widest">خدمة العملاء</h3>
              <div className="space-y-6">
                <a href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`} className="flex items-center justify-center md:justify-start gap-3 text-slate-300 font-bold hover:text-brand-500 transition text-lg">
                  <MessageCircle size={24} className="text-brand-500" /> واتساب: {STORE_WHATSAPP_NUMBER}
                </a>
                <div className="flex items-center justify-center md:justify-start gap-3 text-slate-300 font-bold text-lg">
                  <ShieldCheck size={24} className="text-brand-500" /> تفعيل فوري وآمن
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start justify-center">
               <div className="bg-slate-800 p-8 rounded-[35px] border border-slate-700 w-full shadow-inner">
                  <span className="text-brand-500 font-black block mb-3 text-lg">حالة الخوادم</span>
                  <div className="flex items-center gap-3 text-green-400 font-black text-xl">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(74,222,128,0.5)]"></div>
                    جميع الخدمات مفعلة
                  </div>
               </div>
               <p className="text-sm text-slate-500 mt-6 font-black uppercase tracking-widest">v5.0 WhatsApp Edition | 2024</p>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-slate-800 text-center text-slate-500 font-bold">
            <p>© {new Date().getFullYear()} berrima.store. جميع الطلبات تتم مباشرة عبر الواتساب.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
