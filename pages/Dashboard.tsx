
import React, { useState } from 'react';
import { Order, SiteSettings, Product, Category } from '../types';
import { 
  BarChart3, 
  Package, 
  Settings, 
  Globe, 
  Database, 
  Activity, 
  Users, 
  ShoppingBag, 
  Trash2, 
  Edit2, 
  Plus, 
  ExternalLink,
  Save,
  CheckCircle2,
  Clock,
  XCircle,
  Hash,
  MessageSquare
} from 'lucide-react';

interface DashboardProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Dashboard: React.FC<DashboardProps> = ({ orders, setOrders, settings, setSettings, products, setProducts }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'orders' | 'products' | 'pixels' | 'settings'>('stats');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('site_settings', JSON.stringify(settings));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem('site_orders', JSON.stringify(updated));
  };

  const deleteProduct = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('site_products', JSON.stringify(updated));
    }
  };

  const SidebarItem = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-200 border-l-4 font-bold ${
        activeTab === id 
          ? 'bg-green-50 dark:bg-green-900/10 border-green-600 text-green-700 dark:text-green-400' 
          : 'border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white dark:bg-slate-900 border-l border-gray-100 dark:border-slate-800 py-8">
          <div className="px-6 mb-10">
            <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">إدارة المتجر</h2>
          </div>
          <nav className="space-y-1">
            <SidebarItem id="stats" label="الإحصائيات" icon={BarChart3} />
            <SidebarItem id="orders" label="إدارة الطلبات" icon={ShoppingBag} />
            <SidebarItem id="products" label="المنتجات" icon={Package} />
            <SidebarItem id="pixels" label="التتبع (Pixels)" icon={Activity} />
            <SidebarItem id="settings" label="إعدادات الموقع" icon={Settings} />
          </nav>
        </div>

        {/* Content */}
        <div className="flex-grow p-8 bg-gray-50 dark:bg-slate-950/30">
          {activeTab === 'stats' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">نظرة عامة</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-6">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 p-4 rounded-2xl">
                    <Database size={32} />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase mb-1">إجمالي المبيعات</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{totalRevenue.toLocaleString()} <span className="text-sm font-normal">درهم</span></p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-4 rounded-2xl">
                    <ShoppingBag size={32} />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase mb-1">الطلبات الكلية</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{orders.length}</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-6">
                  <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 p-4 rounded-2xl">
                    <Clock size={32} />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase mb-1">طلبات قيد الانتظار</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white">{pendingOrders}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold mb-6">آخر الطلبات</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-right text-gray-400 dark:text-gray-500 text-sm border-b dark:border-slate-800">
                        <th className="pb-4 font-bold">العميل</th>
                        <th className="pb-4 font-bold">المدينة</th>
                        <th className="pb-4 font-bold">المبلغ</th>
                        <th className="pb-4 font-bold">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-slate-800">
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="text-sm">
                          <td className="py-4 font-bold">{order.customerName}</td>
                          <td className="py-4">{order.city}</td>
                          <td className="py-4">{order.total.toLocaleString()} درهم</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                              order.status === 'pending' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {order.status === 'completed' ? 'تم التوصيل' : order.status === 'pending' ? 'قيد المراجعة' : 'ملغي'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">إدارة الطلبات</h2>
              </div>
              {orders.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 p-20 rounded-3xl text-center border-2 border-dashed border-gray-200 dark:border-slate-800">
                  <ShoppingBag size={64} className="mx-auto text-gray-200 dark:text-slate-800 mb-4" />
                  <p className="text-gray-500">لا توجد طلبات حالياً.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-gray-100 dark:bg-slate-800 p-3 rounded-xl">
                            <Users className="text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{order.customerName} <span className="text-sm font-normal text-gray-500">({order.id})</span></h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.date} • {order.city} • {order.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="bg-gray-50 dark:bg-slate-800 border-transparent dark:border-slate-700 border-2 rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-white"
                          >
                            <option value="pending">قيد المراجعة</option>
                            <option value="completed">تم التوصيل</option>
                            <option value="cancelled">ملغي</option>
                          </select>
                          <span className="text-xl font-black text-green-700 dark:text-green-400">{order.total.toLocaleString()} درهم</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-slate-950/30 p-4 rounded-xl">
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">المنتجات:</p>
                        <ul className="text-sm space-y-1">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between">
                              <span>{item.name} × {item.quantity}</span>
                              <span className="font-bold">{(item.price * item.quantity).toLocaleString()} درهم</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">إدارة المنتجات</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                    <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                    <div className="p-4 flex-grow">
                      <h3 className="font-bold mb-1">{product.name}</h3>
                      <p className="text-green-600 dark:text-green-400 font-bold mb-4">{product.price.toLocaleString()} درهم</p>
                      <div className="flex gap-2">
                        <button className="flex-grow bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition">
                          <Edit2 size={16} /> تعديل
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pixels' && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-600 p-3 rounded-2xl text-white">
                  <Activity size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black">إعدادات البيكسل</h2>
                  <p className="text-gray-400 font-bold">تتبع زوارك ومبيعاتك باحترافية</p>
                </div>
              </div>

              <form onSubmit={handleSettingsSave} className="bg-white dark:bg-slate-900 p-8 rounded-[35px] shadow-sm border border-gray-100 dark:border-slate-800 space-y-8">
                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800/30">
                  <h3 className="text-lg font-black text-blue-900 dark:text-blue-400 flex items-center gap-2 mb-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="FB" className="w-6" /> Facebook Pixel Settings
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <Hash size={18} className="text-blue-500" /> Facebook Pixel ID
                      </label>
                      <input 
                        type="text" 
                        placeholder="أدخل كود البيكسل (مثال: 123456789)"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 focus:border-blue-500 focus:outline-none transition bg-white dark:bg-slate-800 dark:text-white"
                        value={settings.pixels.facebookPixelId}
                        onChange={e => setSettings({...settings, pixels: {...settings.pixels, facebookPixelId: e.target.value}})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <MessageSquare size={18} className="text-purple-500" /> TEXT EVENT (اسم الحدث)
                      </label>
                      <input 
                        type="text" 
                        placeholder="مثل: Purchase أو Lead"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 focus:border-purple-500 focus:outline-none transition bg-white dark:bg-slate-800 dark:text-white"
                        value={settings.pixels.textEvent}
                        onChange={e => setSettings({...settings, pixels: {...settings.pixels, textEvent: e.target.value}})}
                      />
                      <p className="text-[11px] text-gray-400 font-bold">هذا الاسم سيظهر في مدير الإعلانات عند نجاح الطلب.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Google_Analytics_logo.png" alt="GA" className="w-5" /> Google Analytics ID
                    </label>
                    <input 
                      type="text" 
                      placeholder="G-XXXXXXXXXX"
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 focus:border-green-500 focus:outline-none transition bg-white dark:bg-slate-800 dark:text-white"
                      value={settings.pixels.googleAnalyticsId}
                      onChange={e => setSettings({...settings, pixels: {...settings.pixels, googleAnalyticsId: e.target.value}})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <img src="https://seeklogo.com/images/T/tiktok-share-icon-logo-E8064F90F2-seeklogo.com.png" alt="TikTok" className="w-5" /> TikTok Pixel ID
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter TikTok ID..."
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 focus:border-pink-500 focus:outline-none transition bg-white dark:bg-slate-800 dark:text-white"
                      value={settings.pixels.tiktokPixelId}
                      onChange={e => setSettings({...settings, pixels: {...settings.pixels, tiktokPixelId: e.target.value}})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-xl shadow-blue-100 dark:shadow-none"
                >
                  <Save size={24} /> حفظ إعدادات التتبع
                </button>
                {saveSuccess && <p className="text-green-600 text-center font-bold animate-pulse">تم الحفظ بنجاح!</p>}
              </form>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">إعدادات الموقع المتقدمة</h2>
              <form onSubmit={handleSettingsSave} className="bg-white dark:bg-slate-900 p-8 rounded-[35px] shadow-sm border border-gray-100 dark:border-slate-800 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Globe size={18} className="text-blue-500" /> رابط الدومين
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800 dark:text-white focus:border-green-500 focus:outline-none"
                      value={settings.domain}
                      onChange={e => setSettings({...settings, domain: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Lock size={18} className="text-red-500" /> تغيير كلمة سر اللوحة
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800 dark:text-white focus:border-red-500 focus:outline-none font-mono"
                      value={settings.adminPassword}
                      onChange={e => setSettings({...settings, adminPassword: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2 p-6 bg-green-50 dark:bg-green-900/10 rounded-3xl border border-green-100 dark:border-green-800/30">
                  <label className="text-sm font-bold text-green-800 dark:text-green-400 flex items-center gap-2">
                    <ExternalLink size={18} /> ربط Google Sheets (Webhook)
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://script.google.com/macros/s/..."
                    className="w-full px-5 py-4 rounded-2xl border-2 border-green-200 dark:border-slate-800 focus:border-green-500 focus:outline-none transition bg-white dark:bg-slate-800 dark:text-white"
                    value={settings.googleSheetsUrl}
                    onChange={e => setSettings({...settings, googleSheetsUrl: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-black dark:bg-white dark:text-black text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
                >
                  <Save size={24} /> تحديث الإعدادات الفنية
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
