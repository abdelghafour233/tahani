
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Menu, X, Moon, Sun } from 'lucide-react';
import { Product, Order, SiteSettings } from './types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from './constants';

// Pages
import HomePage from './pages/Home';
import CategoryPage from './pages/Category';
import ProductDetailPage from './pages/ProductDetail';
import CheckoutPage from './pages/Checkout';
import DashboardPage from './pages/Dashboard';

const App: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('site_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

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

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-cairo bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Navigation */}
        <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 dark:text-gray-300">
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
                <Link to="/" className="text-2xl font-black text-green-600 flex items-center gap-2">
                  <ShoppingBag className="w-8 h-8" />
                  <span className="hidden sm:inline">متجر النخبة</span>
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
                  aria-label="تبديل الوضع الليلي"
                >
                  {isDarkMode ? <Sun className="text-yellow-500 w-6 h-6" /> : <Moon className="text-slate-600 w-6 h-6" />}
                </button>
                
                <Link to="/dashboard" className="p-3 bg-gray-100 dark:bg-slate-800 rounded-2xl hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all shadow-sm">
                  <LayoutDashboard className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 p-4 space-y-4 shadow-lg animate-in slide-in-from-top">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg font-bold">الرئيسية</Link>
              <Link to="/category/electronics" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg font-bold">إلكترونيات</Link>
            </div>
          )}
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/category/:type" element={<CategoryPage products={products} />} />
            <Route path="/product/:id" element={<ProductDetailPage products={products} />} />
            <Route path="/checkout/:productId" element={<CheckoutPage products={products} placeOrder={placeOrder} />} />
            <Route 
              path="/dashboard/*" 
              element={
                <DashboardPage 
                  orders={orders} 
                  settings={settings} 
                  setSettings={setSettings} 
                  products={products}
                  setProducts={setProducts}
                  setOrders={setOrders}
                />
              } 
            />
          </Routes>
        </main>

        <footer className="bg-gray-900 dark:bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-right">
            <div>
              <h3 className="text-2xl font-black mb-6 flex items-center justify-center md:justify-start gap-2">
                <ShoppingBag className="text-green-500" /> متجر النخبة
              </h3>
              <p className="text-gray-400 text-lg">وجهتكم الموثوقة للتسوق في المغرب. نوفر لكم أجود المنتجات مع خدمة الدفع عند الاستلام.</p>
            </div>
            <div>
              <h3 className="text-xl font-black mb-6 border-r-4 border-green-500 pr-4">روابط سريعة</h3>
              <ul className="space-y-3 text-gray-400 font-bold">
                <li><Link to="/category/electronics" className="hover:text-green-400 transition">إلكترونيات</Link></li>
                <li><Link to="/" className="hover:text-green-400 transition">الرئيسية</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-black mb-6 border-r-4 border-green-500 pr-4">تواصل معنا</h3>
              <p className="text-gray-400 font-bold mb-2">اتصل بنا: 0612345678</p>
              <p className="text-green-400 font-bold italic">توصيل مجاني لجميع المدن المغربية</p>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-slate-900 mt-12 pt-8 text-center text-gray-500 font-bold">
            <p>© 2024 متجر النخبة المغربي. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
