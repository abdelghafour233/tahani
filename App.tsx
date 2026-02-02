
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Command, ArrowRight } from 'lucide-react';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    // Force dark mode logic for this design
    document.documentElement.classList.add('dark');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === (settings.adminPassword || INITIAL_SETTINGS.adminPassword)) {
      setIsAuthenticated(true);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-dark-900 text-white font-cairo">
        
        {/* Modern Glass Navbar */}
        <nav className="fixed w-full z-50 glass h-16 md:h-20 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-6 flex justify-between items-center">
            
            <Link to="/" className="flex items-center gap-2 z-50">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-lg font-bold">
                B
              </div>
              <span className="text-xl font-bold tracking-tight">berrima<span className="text-brand-500">.ai</span></span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-reverse space-x-8 text-sm font-medium text-zinc-400">
              <Link to="/" className="hover:text-white transition-colors">الاستوديو</Link>
              <Link to="/category/anime" className="hover:text-white transition-colors">النماذج</Link>
              <Link to="/dashboard" className="hover:text-white transition-colors">المطورين</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/category/anime" className="bg-white text-black hover:bg-zinc-200 px-5 py-2 rounded-full text-xs font-bold transition-colors">
                جرب الآن
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Full Screen Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-dark-900 z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in md:hidden">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold">الرئيسية</Link>
            <Link to="/category/anime" onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold">النماذج</Link>
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-zinc-500">لوحة التحكم</Link>
          </div>
        )}

        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/category/:type" element={<CategoryPage products={products} />} />
            <Route path="/product/:id" element={<ProductDetailPage products={products} settings={settings} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/dashboard/*" element={
              isAuthenticated ? (
                <DashboardPage orders={orders} settings={settings} setSettings={setSettings} products={products} setProducts={setProducts} setOrders={setOrders} />
              ) : (
                <div className="min-h-[80vh] flex items-center justify-center px-4">
                  <div className="w-full max-w-md bg-dark-800 p-8 rounded-2xl border border-dark-700">
                    <div className="flex justify-center mb-6">
                      <Command size={40} className="text-brand-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-8">Access Terminal</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <input 
                        type="password"
                        className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-center focus:border-brand-500 outline-none transition font-mono text-sm"
                        placeholder="ACCESS CODE"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                      />
                      <button className="w-full bg-brand-600 hover:bg-brand-500 text-white py-3 rounded-lg font-bold text-sm transition-all">
                        AUTHENTICATE
                      </button>
                    </form>
                  </div>
                </div>
              )
            } />
          </Routes>
        </main>

        <footer className="border-t border-dark-800 py-12 mt-20 bg-dark-900">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
                <p>&copy; 2025 berrima.ai Inc.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <Link to="/privacy-policy" className="hover:text-white">الخصوصية</Link>
                  <a href="#" className="hover:text-white">تويتر</a>
                  <a href="#" className="hover:text-white">انستغرام</a>
                </div>
            </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
