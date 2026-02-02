
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Lock, Wand2 } from 'lucide-react';
import { Product, Order, SiteSettings } from './types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from './constants';

// Pages
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import ProductDetailPage from './pages/ProductDetail';
import DashboardPage from './pages/Dashboard';
import PrivacyPolicyPage from './pages/PrivacyPolicy';

const ScrollToTop: React.FC = () => {
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
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-cairo bg-white dark:bg-darkest text-slate-900 dark:text-slate-100">
        
        <nav className="glass-nav border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-1.5 rounded-lg">
                  <Wand2 size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight">berrima<span className="text-slate-400">.ai</span></span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-reverse space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">الرئيسية</Link>
              <Link to="/category/anime" className="hover:text-slate-900 dark:hover:text-white transition-colors">الأدوات</Link>
              <Link to="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">عن الخدمة</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button onClick={toggleDarkMode} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link to="/dashboard" className="hidden sm:flex items-center px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-xs hover:opacity-90 transition-opacity">
                دخول المطورين
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-darkest border-b border-slate-100 dark:border-slate-800 px-6 py-4 space-y-4">
            <Link to="/" className="block py-2 font-medium" onClick={() => setIsMenuOpen(false)}>الرئيسية</Link>
            <Link to="/category/anime" className="block py-2 font-medium" onClick={() => setIsMenuOpen(false)}>الأدوات</Link>
            <Link to="/privacy-policy" className="block py-2 font-medium" onClick={() => setIsMenuOpen(false)}>الخصوصية</Link>
          </div>
        )}

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
                <div className="min-h-[70vh] flex items-center justify-center p-6">
                  <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 mb-4">
                        <Lock size={20} className="text-slate-500" />
                      </div>
                      <h2 className="text-xl font-bold">تسجيل الدخول</h2>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <input 
                        type={showPassword ? "text" : "password"}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 outline-none transition text-center"
                        placeholder="كلمة المرور"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                      />
                      <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">دخول</button>
                    </form>
                  </div>
                </div>
              )
            } />
          </Routes>
        </main>

        <footer className="border-t border-slate-100 dark:border-slate-800 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} berrima.ai. جميع الحقوق محفوظة.</p>
            </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
