
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
  XCircle
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
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const SidebarItem = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-200 border-l-4 font-bold ${
        activeTab === id 
          ? 'bg-green-50 border-green-600 text-green-700' 
          : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white border-l border-gray-100 py-8">
          <div className="px-6 mb-10">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">قائمة التحكم</h2>
          </div>
          <nav className="space-y-1">
            <SidebarItem id="stats" label="الإحصائيات" icon={BarChart3} />
            <SidebarItem id="orders" label="إدارة الطلبات" icon={ShoppingBag} />
            <SidebarItem id="products" label="المنتجات" icon={Package} />
            <SidebarItem id="pixels" label="أكواد التتبع (Pixels)" icon={Activity} />
            <SidebarItem id="settings" label="إعدادات الموقع" icon={Settings} />
          </nav>
        </div>

        {/* Content */}
        <div className="flex-grow p-8 bg-gray-50">
          {activeTab === 'stats' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">نظرة عامة</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                  <div className="bg-green-100 text-green-600 p-4 rounded-2xl">
                    <Database size={32} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase mb-1">إجمالي المبيعات</p>
                    <p className="text-3xl font-black text-gray-900">{totalRevenue.toLocaleString()} <span className="text-sm font-normal">درهم</span></p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                  <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">
                    <ShoppingBag size={32} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase mb-1">الطلبات الكلية</p>
                    <p className="text-3xl font-black text-gray-900">{orders.length}</p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                  <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl">
                    <Clock size={32} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-bold uppercase mb-1">طلبات قيد الانتظار</p>
                    <p className="text-3xl font-black text-gray-900">{pendingOrders}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6">آخر الطلبات</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-right text-gray-400 text-sm border-b">
                        <th className="pb-4 font-bold">العميل</th>
                        <th className="pb-4 font-bold">المدينة</th>
                        <th className="pb-4 font-bold">المبلغ</th>
                        <th className="pb-4 font-bold">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="text-sm">
                          <td className="py-4 font-bold">{order.customerName}</td>
                          <td className="py-4">{order.city}</td>
                          <td className="py-4">{order.total.toLocaleString()} درهم</td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === 'completed' ? 'bg-green-100 text-green-700' :
                              order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                              'bg-red-100 text-red-700'
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
                <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-green-700 transition">تصدير للـ Excel</button>
              </div>
              {orders.length === 0 ? (
                <div className="bg-white p-20 rounded-3xl text-center border-2 border-dashed border-gray-200">
                  <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-500">لا توجد طلبات حالياً.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-gray-100 p-3 rounded-xl">
                            <Users className="text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{order.customerName} <span className="text-sm font-normal text-gray-500">({order.id})</span></h3>
                            <p className="text-sm text-gray-500">{order.date} • {order.city} • {order.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="bg-gray-50 border rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="pending">قيد المراجعة</option>
                            <option value="completed">تم التوصيل</option>
                            <option value="cancelled">ملغي</option>
                          </select>
                          <span className="text-xl font-black text-green-700">{order.total.toLocaleString()} درهم</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">المنتجات:</p>
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
                <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition">
                  <Plus size={18} /> إضافة منتج جديد
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                    <div className="p-4 flex-grow">
                      <h3 className="font-bold mb-1">{product.name}</h3>
                      <p className="text-green-600 font-bold mb-4">{product.price.toLocaleString()} درهم</p>
                      <div className="flex gap-2">
                        <button className="flex-grow bg-gray-50 text-gray-600 p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                          <Edit2 size={16} /> تعديل
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition"
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
              <h2 className="text-3xl font-bold mb-8">إدارة أكواد التتبع (Pixels)</h2>
              <form onSubmit={handleSettingsSave} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="FB" className="w-5" /> Facebook Pixel ID
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter Pixel ID..."
                    className="w-full px-4 py-3 rounded-xl border focus:border-green-500 focus:outline-none transition"
                    value={settings.pixels.facebookPixelId}
                    onChange={e => setSettings({...settings, pixels: {...settings.pixels, facebookPixelId: e.target.value}})}
                  />
                  <p className="text-xs text-gray-400">سيتم تتبع أحداث: ViewContent, AddToCart, Purchase تلقائياً.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Google_Analytics_logo.png" alt="GA" className="w-5" /> Google Analytics ID (G-XXXXX)
                  </label>
                  <input 
                    type="text" 
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl border focus:border-green-500 focus:outline-none transition"
                    value={settings.pixels.googleAnalyticsId}
                    onChange={e => setSettings({...settings, pixels: {...settings.pixels, googleAnalyticsId: e.target.value}})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <img src="https://seeklogo.com/images/T/tiktok-share-icon-logo-E8064F90F2-seeklogo.com.png" alt="TikTok" className="w-5" /> TikTok Pixel ID
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter Pixel ID..."
                    className="w-full px-4 py-3 rounded-xl border focus:border-green-500 focus:outline-none transition"
                    value={settings.pixels.tiktokPixelId}
                    onChange={e => setSettings({...settings, pixels: {...settings.pixels, tiktokPixelId: e.target.value}})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition"
                >
                  <Save size={20} /> حفظ التغييرات
                </button>
                {saveSuccess && <p className="text-green-600 text-center font-bold">تم حفظ الإعدادات بنجاح!</p>}
              </form>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">إعدادات الموقع المتقدمة</h2>
              <form onSubmit={handleSettingsSave} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Globe size={18} className="text-blue-500" /> رابط الدومين (Domain)</label>
                    <input 
                      type="text" 
                      placeholder="example.com"
                      className="w-full px-4 py-3 rounded-xl border focus:border-green-500 focus:outline-none transition"
                      value={settings.domain}
                      onChange={e => setSettings({...settings, domain: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2"><Database size={18} className="text-orange-500" /> Name Server (NS)</label>
                    <input 
                      type="text" 
                      placeholder="ns1.provider.com"
                      className="w-full px-4 py-3 rounded-xl border focus:border-green-500 focus:outline-none transition"
                      value={settings.nameServer}
                      onChange={e => setSettings({...settings, nameServer: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2 p-6 bg-green-50 rounded-2xl border border-green-100">
                  <label className="text-sm font-bold text-green-800 flex items-center gap-2">
                    <ExternalLink size={18} /> ربط Google Sheets تلقائياً
                  </label>
                  <p className="text-xs text-green-700 mb-3">الصق رابط Webhook الخاص بـ Google Apps Script هنا ليتم إرسال الطلبات تلقائياً للملف.</p>
                  <input 
                    type="url" 
                    placeholder="https://script.google.com/macros/s/..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none transition bg-white"
                    value={settings.googleSheetsUrl}
                    onChange={e => setSettings({...settings, googleSheetsUrl: e.target.value})}
                  />
                </div>

                <div className="pt-4 border-t">
                  <button 
                    type="submit"
                    className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition"
                  >
                    <Save size={20} /> تحديث الإعدادات الفنية
                  </button>
                  {saveSuccess && <p className="text-green-600 text-center mt-4 font-bold">تم تحديث جميع الإعدادات!</p>}
                </div>
              </form>
              
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-orange-900 flex items-center gap-2 mb-2">
                  <Database size={20} /> النسخ الاحتياطي وتصدير البيانات
                </h4>
                <p className="text-orange-800 text-sm mb-4">يمكنك تحميل جميع الطلبات والمنتجات كملف JSON لرفعها في استضافة أخرى أو للاحتفاظ بنسخة.</p>
                <button 
                  onClick={() => {
                    const data = { products, orders, settings };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `backup-${new Date().toISOString()}.json`;
                    a.click();
                  }}
                  className="bg-white border border-orange-200 text-orange-700 px-6 py-2 rounded-xl font-bold text-sm hover:bg-orange-100 transition shadow-sm"
                >
                  تصدير البيانات الآن
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
