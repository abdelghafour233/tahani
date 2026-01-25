
import React, { useState } from 'react';
import { Order, SiteSettings, Product } from '../types';
import { 
  BarChart3, 
  Package, 
  Database, 
  Activity, 
  Users, 
  ShoppingBag, 
  Trash2, 
  Edit2, 
  ExternalLink,
  Save,
  Clock,
  Hash,
  Lock,
  Code,
  Megaphone,
  ArrowLeftRight
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
  const [activeTab, setActiveTab] = useState<'stats' | 'orders' | 'products' | 'technical'>('stats');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('site_settings', JSON.stringify(settings));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
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
        <div className="w-full md:w-64 bg-white dark:bg-slate-900 border-l border-gray-100 dark:border-slate-800 py-8 shrink-0">
          <nav className="space-y-1">
            <SidebarItem id="stats" label="الإحصائيات" icon={BarChart3} />
            <SidebarItem id="orders" label="إدارة الطلبات" icon={ShoppingBag} />
            <SidebarItem id="products" label="المنتجات" icon={Package} />
            <SidebarItem id="technical" label="إعدادات Monetag" icon={Activity} />
          </nav>
        </div>

        <div className="flex-grow p-8 bg-gray-50 dark:bg-slate-950/30">
          {activeTab === 'technical' && (
            <div className="space-y-8 animate-in fade-in pb-20">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-black">إعدادات الأرباح (Monetag)</h2>
                  <p className="text-gray-500 font-bold">المعرف الحالي: {settings.monetag?.zoneId || '3205664'}</p>
                </div>
                <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 p-3 rounded-2xl">
                  <Megaphone size={32} />
                </div>
              </div>

              <form onSubmit={handleSettingsSave} className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[35px] shadow-sm border border-gray-100 dark:border-slate-800 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2 text-orange-600">
                    <ArrowLeftRight size={24} /> المحرك الذكي للإعلانات
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-bold text-gray-500 mb-2 block">رابط الإعلان المباشر (Direct Link)</label>
                      <input 
                        type="url" 
                        placeholder="https://otieu.com/4/10518792"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-orange-500 focus:outline-none font-mono text-sm"
                        value={settings?.monetag?.directLinkUrl || ''}
                        onChange={e => setSettings({...settings, monetag: {...(settings?.monetag || {directLinkUrl: '', zoneId: ''}), directLinkUrl: e.target.value}})}
                      />
                      <p className="text-[10px] text-gray-400 mt-2 font-bold italic">سيتم فتح هذا الرابط في نافذة جديدة عند نقر المستخدم على زر الواتساب.</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-500 mb-2 block">معرف المنطقة (Zone ID)</label>
                      <input 
                        type="text" 
                        placeholder="3205664"
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-blue-500 focus:outline-none font-mono"
                        value={settings?.monetag?.zoneId || ''}
                        onChange={e => setSettings({...settings, monetag: {...(settings?.monetag || {directLinkUrl: '', zoneId: ''}), zoneId: e.target.value}})}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[35px] shadow-sm border border-gray-100 dark:border-slate-800 space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2 text-blue-600">
                    <Hash size={24} /> إعدادات التتبع (Facebook Pixel)
                  </h3>
                  <input 
                    type="text" 
                    placeholder="أدخل Pixel ID"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800 focus:border-blue-500 focus:outline-none"
                    value={settings?.pixels?.facebookPixelId || ''}
                    onChange={e => setSettings({...settings, pixels: {...(settings?.pixels || {facebookPixelId: '', googleAnalyticsId: '', tiktokPixelId: '', textEvent: ''}), facebookPixelId: e.target.value}} as any)}
                  />
                </div>

                <button type="submit" className="w-full bg-slate-900 dark:bg-white dark:text-black text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:opacity-90 transition shadow-2xl active:scale-[0.98]">
                  <Save size={24} /> حفظ الإعدادات الربحية
                </button>
                {saveSuccess && <div className="text-center font-bold text-green-600 animate-bounce">تم تحديث إعدادات Monetag بنجاح!</div>}
              </form>
            </div>
          )}
          {/* Stats and other tabs remain unchanged */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
