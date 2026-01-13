
// Add global declarations for external libraries and window extensions
// Fix for Error: Cannot find name 'lucide'.
declare const lucide: any;

declare global {
  interface Window {
    saveSettings: () => void;
    addToCart: (id: string) => void;
  }
}

// --- بيانات المنتجات ---
const PRODUCTS = [
    { id: 'e1', name: 'هاتف ذكي ألترا 2024', category: 'electronics', price: 4500, image: 'https://picsum.photos/seed/phone/600/400', desc: 'أحدث هاتف ذكي بمواصفات عالمية.' },
    { id: 'e2', name: 'سماعات لاسلكية برو', category: 'electronics', price: 850, image: 'https://picsum.photos/seed/headphone/600/400', desc: 'عزل ضوضاء فائق وصوت نقي.' },
    { id: 'h1', name: 'ماكينة تحضير القهوة', category: 'home', price: 1200, image: 'https://picsum.photos/seed/coffee/600/400', desc: 'استمتع بأفضل كوب قهوة في منزلك.' },
    { id: 'h2', name: 'مكنسة كهربائية ذكية', category: 'home', price: 2100, image: 'https://picsum.photos/seed/vacuum/600/400', desc: 'تنظيف ذكي لجميع أنواع الأرضيات.' },
    { id: 'c1', name: 'سيارة سيدان اقتصادية', category: 'cars', price: 185000, image: 'https://picsum.photos/seed/car1/600/400', desc: 'سيارة عائلية مثالية باستهلاك منخفض.' },
    { id: 'c2', name: 'سيارة دفع رباعي فاخرة', category: 'cars', price: 420000, image: 'https://picsum.photos/seed/car2/600/400', desc: 'القوة والرفاهية في سيارة واحدة.' }
];

// --- إدارة الحالة (State) ---
let cart = JSON.parse(localStorage.getItem('elite_cart') || '[]');
let orders = JSON.parse(localStorage.getItem('elite_orders') || '[]');
let settings = JSON.parse(localStorage.getItem('elite_settings') || JSON.stringify({
    domain: 'myshop.ma',
    ns: 'ns1.example.com',
    pixels: { fb: '', ga: '', tt: '' },
    sheets: ''
}));

// --- وظائف المساعدة ---
const updateCartCount = () => {
    const countEl = document.getElementById('cart-count');
    const total = cart.reduce((sum: any, item: any) => sum + item.qty, 0);
    if (countEl) {
        if (total > 0) {
            countEl.innerText = total.toString();
            countEl.classList.remove('hidden');
        } else {
            countEl.classList.add('hidden');
        }
    }
};

const saveCart = () => {
    localStorage.setItem('elite_cart', JSON.stringify(cart));
    updateCartCount();
};

const addToCart = (id: string) => {
    const product = PRODUCTS.find(p => p.id === id);
    const existing = cart.find((item: any) => item.id === id);
    if (existing) { existing.qty += 1; }
    else { cart.push({ ...product, qty: 1 }); }
    saveCart();
    alert('تمت إضافة المنتج إلى السلة!');
};

// --- الموجه (Router) ---
const navigate = () => {
    const hash = window.location.hash || '#/';
    const app = document.getElementById('app');
    if (!app) return;
    
    if (hash === '#/') renderHome(app);
    else if (hash.startsWith('#/category/')) renderCategory(app, hash.split('/')[2]);
    else if (hash.startsWith('#/product/')) renderProduct(app, hash.split('/')[2]);
    else if (hash === '#/cart') renderCart(app);
    else if (hash === '#/checkout') renderCheckout(app);
    else if (hash === '#/dashboard') renderDashboard(app);
    
    // Fix for Error: Cannot find name 'lucide'.
    lucide.createIcons();
    window.scrollTo(0,0);
};

// --- واجهات الصفحات ---

function renderHome(container: HTMLElement) {
    container.innerHTML = `
        <section class="relative h-[400px] bg-green-700 text-white flex items-center justify-center text-center px-4">
            <div class="z-10">
                <h1 class="text-5xl font-black mb-4">متجر النخبة المغربي</h1>
                <p class="text-xl opacity-90 mb-8">أفضل المنتجات بأفضل الأسعار مع توصيل سريع</p>
                <a href="#/category/electronics" class="bg-white text-green-700 px-8 py-3 rounded-full font-bold text-lg shadow-lg">تسوق الآن</a>
            </div>
        </section>
        <div class="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="#/category/electronics" class="bg-blue-50 p-10 rounded-3xl text-center border hover:shadow-xl transition">
                <i data-lucide="laptop" class="w-16 h-16 mx-auto mb-4 text-blue-600"></i>
                <h3 class="text-2xl font-bold">إلكترونيات</h3>
            </a>
            <a href="#/category/home" class="bg-orange-50 p-10 rounded-3xl text-center border hover:shadow-xl transition">
                <i data-lucide="home" class="w-16 h-16 mx-auto mb-4 text-orange-600"></i>
                <h3 class="text-2xl font-bold">منزلية</h3>
            </a>
            <a href="#/category/cars" class="bg-indigo-50 p-10 rounded-3xl text-center border hover:shadow-xl transition">
                <i data-lucide="car" class="w-16 h-16 mx-auto mb-4 text-indigo-600"></i>
                <h3 class="text-2xl font-bold">سيارات</h3>
            </a>
        </div>
    `;
}

function renderCategory(container: HTMLElement, cat: string) {
    const filtered = PRODUCTS.filter(p => p.category === cat);
    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-12">
            <h2 class="text-4xl font-black mb-10 text-center">قسم ${cat === 'electronics' ? 'الإلكترونيات' : cat === 'home' ? 'المنزل' : 'السيارات'}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                ${filtered.map(p => `
                    <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 product-card">
                        <img src="${p.image}" class="w-full h-64 object-cover">
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-2">${p.name}</h3>
                            <p class="text-green-700 text-2xl font-black mb-4">${p.price.toLocaleString()} درهم</p>
                            <div class="flex gap-2">
                                <a href="#/product/${p.id}" class="flex-grow bg-gray-100 text-center py-3 rounded-xl font-bold">التفاصيل</a>
                                <button onclick="window.addToCart('${p.id}')" class="bg-green-600 text-white px-4 py-3 rounded-xl"><i data-lucide="shopping-cart"></i></button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderProduct(container: HTMLElement, id: string) {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return;
    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <img src="${p.image}" class="w-full rounded-3xl shadow-2xl">
            <div>
                <h1 class="text-5xl font-black mb-4">${p.name}</h1>
                <p class="text-3xl font-bold text-green-600 mb-6">${p.price.toLocaleString()} درهم</p>
                <p class="text-gray-600 text-xl leading-relaxed mb-10">${p.desc}</p>
                <button onclick="window.addToCart('${p.id}')" class="w-full bg-green-600 text-white py-5 rounded-2xl text-2xl font-black shadow-xl">أضف إلى السلة</button>
            </div>
        </div>
    `;
}

function renderCart(container: HTMLElement) {
    const subtotal = cart.reduce((s: any, i: any) => s + (i.price * i.qty), 0);
    container.innerHTML = `
        <div class="max-w-4xl mx-auto px-4 py-12">
            <h1 class="text-3xl font-black mb-8">سلة المشتريات</h1>
            ${cart.length === 0 ? '<p class="text-center py-20 text-gray-400">السلة فارغة</p>' : `
                <div class="space-y-4 mb-8">
                    ${cart.map((item: any) => `
                        <div class="flex items-center gap-4 bg-white p-4 rounded-2xl border">
                            <img src="${item.image}" class="w-20 h-20 rounded-lg">
                            <div class="flex-grow font-bold">${item.name}</div>
                            <div class="text-green-600 font-black">${(item.price * item.qty).toLocaleString()} درهم</div>
                        </div>
                    `).join('')}
                </div>
                <div class="bg-white p-8 rounded-3xl border shadow-lg text-center">
                    <div class="text-2xl mb-6">المجموع: <span class="font-black">${subtotal.toLocaleString()} درهم</span></div>
                    <a href="#/checkout" class="block w-full bg-green-600 text-white py-4 rounded-xl font-bold text-xl">إتمام الطلب</a>
                </div>
            `}
        </div>
    `;
}

function renderCheckout(container: HTMLElement) {
    container.innerHTML = `
        <div class="max-w-xl mx-auto px-4 py-12">
            <h1 class="text-3xl font-black mb-8 text-center">معلومات الطلب</h1>
            <form id="checkout-form" class="space-y-6 bg-white p-8 rounded-3xl border shadow-xl">
                <div>
                    <label class="block font-bold mb-2">الاسم الكامل</label>
                    <input type="text" id="cust-name" required class="w-full border-2 rounded-xl p-4">
                </div>
                <div>
                    <label class="block font-bold mb-2">المدينة</label>
                    <input type="text" id="cust-city" required class="w-full border-2 rounded-xl p-4">
                </div>
                <div>
                    <label class="block font-bold mb-2">رقم الهاتف</label>
                    <input type="tel" id="cust-phone" required class="w-full border-2 rounded-xl p-4">
                </div>
                <div class="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm font-bold">الدفع عند الاستلام متاح</div>
                <button type="submit" class="w-full bg-green-600 text-white py-4 rounded-xl font-black text-xl">تأكيد الطلب الآن</button>
            </form>
        </div>
    `;

    const form = document.getElementById('checkout-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            // Fix for Errors on lines 182, 183, 184: Property 'value' does not exist on type 'HTMLElement'.
            const order = {
                id: 'ORD-' + Date.now(),
                name: (document.getElementById('cust-name') as HTMLInputElement).value,
                city: (document.getElementById('cust-city') as HTMLInputElement).value,
                phone: (document.getElementById('cust-phone') as HTMLInputElement).value,
                total: cart.reduce((s: any, i: any) => s + (i.price * i.qty), 0),
                date: new Date().toLocaleDateString('ar-MA')
            };
            orders.push(order);
            localStorage.setItem('elite_orders', JSON.stringify(orders));
            cart = [];
            saveCart();
            alert('شكراً لطلبك! سيتم التواصل معك قريباً.');
            window.location.hash = '#/';
        };
    }
}

function renderDashboard(container: HTMLElement) {
    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-12">
            <h1 class="text-4xl font-black mb-10">لوحة التحكم</h1>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div class="lg:col-span-1 space-y-2">
                    <button class="w-full text-right p-4 bg-green-600 text-white rounded-xl font-bold">الإعدادات والبيكسل</button>
                    <button class="w-full text-right p-4 bg-gray-100 rounded-xl font-bold">إدارة الطلبات (${orders.length})</button>
                </div>
                <div class="lg:col-span-3 space-y-8">
                    <div class="bg-white p-8 rounded-3xl border shadow-sm">
                        <h2 class="text-xl font-bold mb-6">أكواد التتبع (Pixel IDs)</h2>
                        <div class="space-y-4">
                            <input id="fb-px" placeholder="Facebook Pixel ID" class="w-full border p-3 rounded-lg" value="${settings.pixels.fb}">
                            <input id="ga-px" placeholder="Google Analytics ID" class="w-full border p-3 rounded-lg" value="${settings.pixels.ga}">
                            <input id="tt-px" placeholder="TikTok Pixel ID" class="w-full border p-3 rounded-lg" value="${settings.pixels.tt}">
                            <button onclick="window.saveSettings()" class="bg-black text-white px-8 py-3 rounded-xl font-bold">حفظ الإعدادات</button>
                        </div>
                    </div>
                    <div class="bg-white p-8 rounded-3xl border shadow-sm">
                        <h2 class="text-xl font-bold mb-6">الطلبات الأخيرة</h2>
                        <div class="overflow-x-auto">
                            <table class="w-full text-right">
                                <thead class="border-b"><tr><th class="py-2">الاسم</th><th>المدينة</th><th>الهاتف</th><th>المبلغ</th></tr></thead>
                                <tbody>
                                    ${orders.map((o: any) => `
                                        <tr class="border-b"><td class="py-3">${o.name}</td><td>${o.city}</td><td>${o.phone}</td><td class="font-bold">${o.total} درهم</td></tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fix for Error on line 235: Property 'saveSettings' does not exist on type 'Window & typeof globalThis'.
window.saveSettings = () => {
    // Fix for Errors on lines 236, 237, 238: Property 'value' does not exist on type 'HTMLElement'.
    settings.pixels.fb = (document.getElementById('fb-px') as HTMLInputElement).value;
    settings.pixels.ga = (document.getElementById('ga-px') as HTMLInputElement).value;
    settings.pixels.tt = (document.getElementById('tt-px') as HTMLInputElement).value;
    localStorage.setItem('elite_settings', JSON.stringify(settings));
    alert('تم حفظ الإعدادات!');
};

// --- التهيئة عند التحميل ---
// Fix for Error on line 244: Property 'addToCart' does not exist on type 'Window & typeof globalThis'.
window.addToCart = addToCart;
window.onhashchange = navigate;
document.addEventListener('DOMContentLoaded', () => {
    navigate();
    updateCartCount();
});
