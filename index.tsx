
// Add global declarations for external libraries and window extensions
export {};

declare const lucide: any;

declare global {
  interface Window {
    saveSettings: () => void;
    addToCart: (id: string, redirect?: boolean) => void;
    deleteProduct: (id: string) => void;
    handleImageUpload: (event: Event, targetId: string) => void;
    handleMultipleImagesUpload: (event: Event) => void;
    addNewProduct: (event: Event) => void;
    setMainImage: (src: string) => void;
  }
}

// --- قائمة المدن المغربية ---
const MOROCCAN_CITIES = [
    "الدار البيضاء", "الرباط", "مراكش", "طنجة", "فاس", "أكادير", "مكناس", "وجدة", 
    "القنيطرة", "تطوان", "تمارة", "آسفي", "العيون", "المحمدية", "بني ملال", 
    "الجديدة", "تازة", "الناظور", "سطات", "القصر الكبير", "العرائش", "الخميسات", 
    "تزنيت", "برشيد", "وادي زم", "الفقيه بن صالح", "تاوريرت", "بركان", "سيدي سليمان"
];

// --- إدارة البيانات (تخزين محلي) ---
const INITIAL_PRODUCTS = [
    { id: 'e1', name: 'هاتف ذكي ألترا 2024', category: 'electronics', price: 4500, image: 'https://picsum.photos/seed/phone/600/400', images: [], desc: 'أحدث هاتف ذكي بمواصفات عالمية وكاميرا احترافية.' },
    { id: 'h1', name: 'ماكينة تحضير القهوة', category: 'home', price: 1200, image: 'https://picsum.photos/seed/coffee/600/400', images: [], desc: 'استمتع بأفضل كوب قهوة في منزلك كل صباح.' },
    { id: 'c1', name: 'سيارة سيدان اقتصادية', category: 'cars', price: 185000, image: 'https://picsum.photos/seed/car1/600/400', images: [], desc: 'سيارة عائلية مثالية باستهلاك وقود منخفض جداً.' }
];

let products = JSON.parse(localStorage.getItem('elite_products') || JSON.stringify(INITIAL_PRODUCTS));
let cart = JSON.parse(localStorage.getItem('elite_cart') || '[]');
let orders = JSON.parse(localStorage.getItem('elite_orders') || '[]');
let settings = JSON.parse(localStorage.getItem('elite_settings') || JSON.stringify({
    domain: 'myshop.ma',
    ns: 'ns1.example.com',
    pixels: { fb: '', ga: '', tt: '' },
    sheets: ''
}));

// متغيرات مؤقتة للصور المرفوعة في لوحة التحكم
let tempMainImage = '';
let tempAdditionalImages: string[] = [];

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

const saveProducts = () => {
    localStorage.setItem('elite_products', JSON.stringify(products));
};

const addToCart = (id: string, redirect: boolean = false) => {
    const product = products.find((p: any) => p.id === id);
    const existing = cart.find((item: any) => item.id === id);
    if (existing) { existing.qty += 1; }
    else { cart.push({ ...product, qty: 1 }); }
    saveCart();
    if (redirect) {
        window.location.hash = '#/checkout';
    } else {
        alert('تمت إضافة المنتج إلى السلة!');
    }
};

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
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
    
    lucide.createIcons();
    window.scrollTo(0,0);
};

// --- واجهات الصفحات ---

function renderHome(container: HTMLElement) {
    container.innerHTML = `
        <section class="relative h-[450px] bg-green-700 text-white flex items-center justify-center text-center px-4 overflow-hidden">
            <div class="absolute inset-0 opacity-20 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200')"></div>
            <div class="z-10 animate-in fade-in zoom-in duration-700">
                <h1 class="text-6xl font-black mb-6 drop-shadow-lg">متجر النخبة المغربي</h1>
                <p class="text-2xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">جودة عالية، أفضل الأسعار، وتوصيل مجاني لجميع المدن المغربية والدفع عند الاستلام</p>
                <div class="flex flex-wrap justify-center gap-4">
                    <a href="#/category/electronics" class="bg-white text-green-700 px-12 py-4 rounded-full font-black text-xl shadow-2xl hover:bg-gray-100 transition transform hover:scale-105">ابدأ التسوق الآن</a>
                </div>
            </div>
        </section>
        
        <div class="max-w-7xl mx-auto px-4 py-20">
            <h2 class="text-4xl font-black mb-16 text-center text-gray-800 relative inline-block w-full">
                تصفح أقسامنا
                <span class="block w-24 h-2 bg-green-500 mx-auto mt-4 rounded-full"></span>
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
                <a href="#/category/electronics" class="group bg-white p-12 rounded-[40px] text-center shadow-sm border border-gray-100 hover:shadow-2xl hover:border-blue-500 transition-all duration-500">
                    <div class="bg-blue-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500"><i data-lucide="laptop" class="w-12 h-12"></i></div>
                    <h3 class="text-3xl font-black text-gray-800 mb-2">إلكترونيات</h3>
                    <p class="text-gray-500 font-bold">أحدث الأجهزة التقنية</p>
                </a>
                <a href="#/category/home" class="group bg-white p-12 rounded-[40px] text-center shadow-sm border border-gray-100 hover:shadow-2xl hover:border-orange-500 transition-all duration-500">
                    <div class="bg-orange-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500"><i data-lucide="home" class="w-12 h-12"></i></div>
                    <h3 class="text-3xl font-black text-gray-800 mb-2">منزلية</h3>
                    <p class="text-gray-500 font-bold">أناقة وراحة لمنزلك</p>
                </a>
                <a href="#/category/cars" class="group bg-white p-12 rounded-[40px] text-center shadow-sm border border-gray-100 hover:shadow-2xl hover:border-indigo-500 transition-all duration-500">
                    <div class="bg-indigo-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500"><i data-lucide="car" class="w-12 h-12"></i></div>
                    <h3 class="text-3xl font-black text-gray-800 mb-2">سيارات</h3>
                    <p class="text-gray-500 font-bold">عروض حصرية للسيارات</p>
                </a>
            </div>
            
            <h2 class="text-3xl font-black mb-10 text-gray-800">أحدث المنتجات المضافة</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                ${products.slice(-4).reverse().map((p: any) => `
                    <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 product-card flex flex-col group">
                        <div class="relative overflow-hidden aspect-square">
                            <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                            <div class="absolute top-4 right-4 bg-green-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">جديد</div>
                        </div>
                        <div class="p-6 flex flex-col flex-grow text-center">
                            <h3 class="font-black text-xl mb-3 text-gray-800 line-clamp-1">${p.name}</h3>
                            <div class="mt-auto">
                                <span class="text-green-700 text-2xl font-black block mb-4">${p.price.toLocaleString()} MAD</span>
                                <a href="#/product/${p.id}" class="inline-block w-full bg-gray-900 text-white py-3 rounded-2xl font-black hover:bg-black transition">عرض المنتج</a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderCategory(container: HTMLElement, cat: string) {
    const filtered = products.filter((p: any) => p.category === cat);
    const catName = cat === 'electronics' ? 'الإلكترونيات' : cat === 'home' ? 'المنزل' : 'السيارات';
    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-16">
            <h2 class="text-5xl font-black mb-12 text-center text-gray-900">قسم ${catName}</h2>
            ${filtered.length === 0 ? `
                <div class="text-center py-32 bg-white rounded-[40px] border shadow-sm">
                    <i data-lucide="package-search" class="w-24 h-24 mx-auto text-gray-200 mb-6"></i>
                    <p class="text-gray-400 text-2xl font-bold">لا توجد منتجات حالياً في هذا القسم.</p>
                </div>
            ` : `
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    ${filtered.map((p: any) => `
                        <div class="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 product-card group">
                            <div class="relative overflow-hidden aspect-square">
                                <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                            </div>
                            <div class="p-8 text-center">
                                <h3 class="text-2xl font-black mb-4 text-gray-800">${p.name}</h3>
                                <p class="text-green-700 text-3xl font-black mb-6">${p.price.toLocaleString()} <span class="text-sm font-bold">درهم</span></p>
                                <div class="flex gap-3">
                                    <a href="#/product/${p.id}" class="flex-grow bg-gray-900 text-white text-center py-4 rounded-2xl font-black hover:bg-black transition shadow-lg">التفاصيل</a>
                                    <button onclick="window.addToCart('${p.id}')" class="bg-green-600 text-white px-5 py-4 rounded-2xl hover:bg-green-700 transition shadow-lg"><i data-lucide="shopping-cart"></i></button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}

window.setMainImage = (src: string) => {
    const mainImg = document.getElementById('main-product-img') as HTMLImageElement;
    if (mainImg) mainImg.src = src;
};

function renderProduct(container: HTMLElement, id: string) {
    const p = products.find((prod: any) => prod.id === id);
    if (!p) return;
    
    const allImages = [p.image, ...(p.images || [])];

    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-16">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                <div class="space-y-6">
                    <div class="rounded-[50px] overflow-hidden shadow-2xl border-8 border-white bg-white aspect-square">
                        <img id="main-product-img" src="${p.image}" class="w-full h-full object-cover transition-all duration-500">
                    </div>
                    ${allImages.length > 1 ? `
                        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            ${allImages.map(img => `
                                <img src="${img}" onclick="window.setMainImage('${img}')" class="w-24 h-24 object-cover rounded-3xl border-4 border-white shadow-md cursor-pointer hover:scale-105 transition flex-shrink-0">
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="flex flex-col py-4">
                    <span class="bg-green-100 text-green-700 px-6 py-2 rounded-full text-sm font-black w-fit mb-6 uppercase tracking-widest">${p.category}</span>
                    <h1 class="text-5xl md:text-6xl font-black mb-8 text-gray-900 leading-tight">${p.name}</h1>
                    <div class="bg-green-50 p-8 rounded-[40px] mb-10 border border-green-100 shadow-inner">
                        <div class="text-5xl font-black text-green-700 mb-2">${p.price.toLocaleString()} MAD</div>
                        <p class="text-green-600 font-bold flex items-center gap-2"><i data-lucide="truck" class="w-5 h-5"></i> توصيل مجاني + الدفع عند الاستلام</p>
                    </div>
                    <div class="prose prose-xl mb-12">
                        <h4 class="text-xl font-black mb-4 text-gray-800">وصف المنتج:</h4>
                        <p class="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">${p.desc}</p>
                    </div>
                    <div class="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button onclick="window.addToCart('${p.id}', true)" class="bg-green-600 text-white py-6 rounded-3xl text-3xl font-black shadow-2xl hover:bg-green-700 transform active:scale-95 transition flex items-center justify-center gap-3">
                            <i data-lucide="zap" class="w-8 h-8"></i> اشتري الآن
                        </button>
                        <button onclick="window.addToCart('${p.id}')" class="bg-gray-100 text-gray-900 py-6 rounded-3xl text-2xl font-black shadow-lg hover:bg-gray-200 transform active:scale-95 transition">أضف للسلة</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCart(container: HTMLElement) {
    const subtotal = cart.reduce((s: any, i: any) => s + (i.price * i.qty), 0);
    container.innerHTML = `
        <div class="max-w-4xl mx-auto px-4 py-16">
            <h1 class="text-5xl font-black mb-12">سلة المشتريات</h1>
            ${cart.length === 0 ? `
                <div class="text-center py-32 bg-white rounded-[50px] border shadow-xl">
                    <div class="bg-gray-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200"><i data-lucide="shopping-bag" class="w-16 h-16"></i></div>
                    <p class="text-gray-400 text-2xl font-bold mb-10">السلة فارغة حالياً</p>
                    <a href="#/" class="bg-green-600 text-white px-12 py-5 rounded-3xl font-black text-xl shadow-xl hover:bg-green-700 transition">ابدأ التسوق الآن</a>
                </div>
            ` : `
                <div class="space-y-6 mb-12">
                    ${cart.map((item: any) => `
                        <div class="flex items-center gap-8 bg-white p-8 rounded-[40px] border shadow-sm relative group">
                            <img src="${item.image}" class="w-28 h-28 rounded-[30px] object-cover border shadow-sm">
                            <div class="flex-grow">
                                <h3 class="font-black text-2xl mb-2 text-gray-800">${item.name}</h3>
                                <div class="text-green-600 font-black text-xl">${item.price.toLocaleString()} MAD</div>
                            </div>
                            <div class="text-gray-900 font-black text-3xl bg-gray-100 w-16 h-16 flex items-center justify-center rounded-2xl">x${item.qty}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="bg-white p-12 rounded-[50px] border shadow-2xl text-center border-t-8 border-t-green-600">
                    <div class="flex justify-between items-center mb-10 text-3xl font-black px-4">
                        <span class="text-gray-500">الإجمالي:</span>
                        <span class="text-green-700 underline decoration-green-200 decoration-8 underline-offset-8">${subtotal.toLocaleString()} MAD</span>
                    </div>
                    <a href="#/checkout" class="block w-full bg-green-600 text-white py-6 rounded-3xl font-black text-3xl hover:bg-green-700 shadow-2xl transition transform hover:scale-[1.02]">إتمام الطلب</a>
                </div>
            `}
        </div>
    `;
}

function renderCheckout(container: HTMLElement) {
    const total = cart.reduce((s: any, i: any) => s + (i.price * i.qty), 0);
    container.innerHTML = `
        <div class="max-w-xl mx-auto px-4 py-16">
            <h1 class="text-4xl font-black mb-4 text-center text-gray-900">إتمام الطلب</h1>
            <p class="text-center text-gray-500 mb-12 font-bold italic">املأ معلوماتك لنتواصل معك وتأكيد التوصيل المجاني</p>
            
            <form id="checkout-form" class="space-y-8 bg-white p-12 rounded-[50px] border shadow-2xl relative overflow-hidden">
                <div class="absolute top-0 right-0 left-0 h-2 bg-green-600"></div>
                
                <div>
                    <label class="block font-black text-gray-800 mb-3 text-lg">الاسم الكامل</label>
                    <input type="text" id="cust-name" required placeholder="مثال: أحمد العلمي" class="w-full border-2 border-gray-100 rounded-3xl p-5 text-xl font-bold focus:border-green-500 focus:outline-none bg-gray-50 transition-all">
                </div>
                
                <div>
                    <label class="block font-black text-gray-800 mb-3 text-lg">رقم الهاتف</label>
                    <input type="tel" id="cust-phone" required placeholder="06XXXXXXXX" class="w-full border-2 border-gray-100 rounded-3xl p-5 text-xl font-bold focus:border-green-500 focus:outline-none bg-gray-50 transition-all">
                </div>
                
                <div>
                    <label class="block font-black text-gray-800 mb-3 text-lg">المدينة</label>
                    <select id="cust-city" required class="w-full border-2 border-gray-100 rounded-3xl p-5 text-xl font-bold focus:border-green-500 focus:outline-none bg-gray-50 transition-all appearance-none">
                        <option value="" disabled selected>اختر مدينتك</option>
                        ${MOROCCAN_CITIES.map(city => `<option value="${city}">${city}</option>`).join('')}
                    </select>
                </div>
                
                <div class="bg-green-50 p-6 rounded-3xl text-green-800 text-lg font-black border border-green-100 flex items-center gap-4">
                    <div class="bg-green-200 p-2 rounded-xl text-green-700"><i data-lucide="truck" class="w-6 h-6"></i></div>
                    تنبيه: التوصيل مجاني لجميع هذه المدن
                </div>

                <div class="border-t-2 border-dashed pt-8 mb-4">
                    <div class="flex justify-between items-center text-2xl font-black text-gray-900 px-2">
                        <span>المبلغ المستحق:</span>
                        <span class="text-green-700">${total.toLocaleString()} MAD</span>
                    </div>
                </div>
                
                <button type="submit" class="w-full bg-green-600 text-white py-6 rounded-3xl font-black text-4xl shadow-2xl hover:bg-green-700 transform active:scale-95 transition-all flex items-center justify-center gap-4">
                    اشتري الآن
                </button>
            </form>
            
            <p class="mt-10 text-center text-gray-400 font-bold text-sm">عملية شراء آمنة 100% - الدفع عند الاستلام</p>
        </div>
    `;

    const form = document.getElementById('checkout-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const order = {
                id: 'ORD-' + Date.now(),
                name: (document.getElementById('cust-name') as HTMLInputElement).value,
                city: (document.getElementById('cust-city') as HTMLSelectElement).value,
                phone: (document.getElementById('cust-phone') as HTMLInputElement).value,
                total: total,
                date: new Date().toLocaleDateString('ar-MA')
            };
            orders.unshift(order);
            localStorage.setItem('elite_orders', JSON.stringify(orders));
            cart = [];
            saveCart();
            alert('شكراً لثقتك! تم تسجيل طلبك بنجاح. سنتصل بك قريباً عبر الهاتف لتأكيد التوصيل.');
            window.location.hash = '#/';
        };
    }
}

function renderDashboard(container: HTMLElement) {
    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-16">
            <h1 class="text-5xl font-black mb-12">لوحة التحكم</h1>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <div class="lg:col-span-1 space-y-3">
                    <button id="tab-products" class="w-full text-right p-5 bg-green-600 text-white rounded-[30px] font-black shadow-lg">إدارة المنتجات</button>
                    <button id="tab-orders" class="w-full text-right p-5 bg-white border rounded-[30px] font-black hover:bg-gray-50 transition">الطلبات الواردة (${orders.length})</button>
                    <button id="tab-settings" class="w-full text-right p-5 bg-white border rounded-[30px] font-black hover:bg-gray-50 transition">إعدادات المتجر</button>
                </div>
                
                <div class="lg:col-span-3 space-y-10" id="dash-content">
                    <div class="bg-white p-12 rounded-[50px] border shadow-xl border-t-8 border-t-green-600">
                        <h2 class="text-3xl font-black mb-10 flex items-center gap-4"><i data-lucide="plus-circle" class="text-green-600 w-10 h-10"></i> إضافة منتج جديد</h2>
                        <form id="add-product-form" onsubmit="window.addNewProduct(event)" class="space-y-8">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label class="block font-black mb-3 text-gray-700">اسم المنتج</label>
                                    <input type="text" id="new-p-name" required class="w-full border-2 border-gray-100 rounded-3xl p-5 font-bold focus:border-green-500 focus:outline-none bg-gray-50">
                                </div>
                                <div>
                                    <label class="block font-black mb-3 text-gray-700">السعر (MAD)</label>
                                    <input type="number" id="new-p-price" required class="w-full border-2 border-gray-100 rounded-3xl p-5 font-bold focus:border-green-500 focus:outline-none bg-gray-50">
                                </div>
                            </div>
                            <div>
                                <label class="block font-black mb-3 text-gray-700">القسم</label>
                                <select id="new-p-cat" class="w-full border-2 border-gray-100 rounded-3xl p-5 font-bold focus:border-green-500 focus:outline-none bg-white">
                                    <option value="electronics">إلكترونيات</option>
                                    <option value="home">منزلية</option>
                                    <option value="cars">سيارات</option>
                                </select>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label class="block font-black mb-3 text-gray-700 text-lg">الصورة الرئيسية</label>
                                    <label class="flex flex-col items-center justify-center w-full h-40 border-4 border-gray-100 border-dashed rounded-[40px] cursor-pointer bg-gray-50 hover:bg-green-50 transition relative overflow-hidden group">
                                        <div id="main-preview" class="flex flex-col items-center justify-center p-4 text-center">
                                            <i data-lucide="image" class="w-12 h-12 text-gray-300 mb-2 group-hover:text-green-400 transition"></i>
                                            <p class="text-sm text-gray-400 font-black">رفع الصورة الرئيسية</p>
                                        </div>
                                        <input type="file" id="main-image-input" class="hidden" accept="image/*" onchange="window.handleImageUpload(event, 'main-preview')">
                                    </label>
                                </div>
                                <div>
                                    <label class="block font-black mb-3 text-gray-700 text-lg">صور المعرض (متعددة)</label>
                                    <label class="flex flex-col items-center justify-center w-full h-40 border-4 border-gray-100 border-dashed rounded-[40px] cursor-pointer bg-gray-50 hover:bg-green-50 transition group overflow-hidden">
                                        <div id="multi-preview" class="flex flex-wrap gap-2 p-4 justify-center items-center overflow-auto max-h-full">
                                            <i data-lucide="camera" class="w-12 h-12 text-gray-300 mb-2 group-hover:text-green-400 transition"></i>
                                            <p class="text-sm text-gray-400 font-black w-full text-center">رفع صور إضافية</p>
                                        </div>
                                        <input type="file" id="multi-image-input" multiple class="hidden" accept="image/*" onchange="window.handleMultipleImagesUpload(event)">
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label class="block font-black mb-3 text-gray-700">وصف المنتج (مميزاته، مواصفاته)</label>
                                <textarea id="new-p-desc" rows="6" required class="w-full border-2 border-gray-100 rounded-[40px] p-8 font-bold focus:border-green-500 focus:outline-none bg-gray-50" placeholder="اشرح المنتج هنا..."></textarea>
                            </div>
                            <button type="submit" class="w-full bg-black text-white py-6 rounded-3xl font-black text-2xl hover:bg-gray-800 shadow-2xl transition transform hover:scale-[1.01]">حفظ وعرض المنتج في المتجر</button>
                        </form>
                    </div>

                    <div class="bg-white p-12 rounded-[50px] border shadow-sm">
                        <h2 class="text-3xl font-black mb-10">إدارة المعروضات الحالية</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            ${products.map((p: any) => `
                                <div class="flex items-center gap-6 border-2 border-gray-50 p-6 rounded-[35px] bg-gray-50 hover:border-red-100 transition relative group">
                                    <img src="${p.image}" class="w-20 h-20 object-cover rounded-[20px] shadow-sm border-2 border-white">
                                    <div class="flex-grow">
                                        <div class="font-black text-xl text-gray-900 mb-1 line-clamp-1">${p.name}</div>
                                        <div class="text-green-600 font-black">${p.price.toLocaleString()} MAD</div>
                                    </div>
                                    <button onclick="window.deleteProduct('${p.id}')" class="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white p-4 rounded-2xl transition shadow-sm"><i data-lucide="trash-2" class="w-6 h-6"></i></button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}

// --- وظائف لوحة التحكم ---

window.handleImageUpload = async (event: Event, targetId: string) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const b64 = await fileToBase64(file);
        tempMainImage = b64;
        const preview = document.getElementById(targetId);
        if (preview) {
            preview.innerHTML = `<img src="${b64}" class="w-full h-full object-cover rounded-[30px]">`;
        }
    }
};

window.handleMultipleImagesUpload = async (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
        tempAdditionalImages = [];
        const preview = document.getElementById('multi-preview');
        if (preview) preview.innerHTML = '';
        
        for (let i = 0; i < files.length; i++) {
            const b64 = await fileToBase64(files[i]);
            tempAdditionalImages.push(b64);
            const img = document.createElement('img');
            img.src = b64;
            img.className = 'w-12 h-12 object-cover rounded-xl border-2 border-white shadow-sm';
            if (preview) preview.appendChild(img);
        }
        
        if (preview && files.length > 0) {
           const info = document.createElement('p');
           info.className = 'w-full text-center text-xs text-green-600 font-black mt-1';
           info.innerText = `تم رفع ${files.length} صور`;
           preview.appendChild(info);
        }
    }
};

window.addNewProduct = (event: Event) => {
    event.preventDefault();
    const name = (document.getElementById('new-p-name') as HTMLInputElement).value;
    const price = parseInt((document.getElementById('new-p-price') as HTMLInputElement).value);
    const cat = (document.getElementById('new-p-cat') as HTMLSelectElement).value;
    const desc = (document.getElementById('new-p-desc') as HTMLTextAreaElement).value;

    if (!tempMainImage) {
        alert('يرجى تحميل صورة رئيسية للمنتج أولاً');
        return;
    }

    const newProduct = {
        id: 'P-' + Date.now(),
        name,
        price,
        category: cat,
        image: tempMainImage,
        images: tempAdditionalImages,
        desc
    };

    products.push(newProduct);
    saveProducts();
    alert('تمت إضافة المنتج بنجاح وهو متاح للزوار الآن!');
    
    // إفراغ الحقول والذاكرة المؤقتة
    tempMainImage = '';
    tempAdditionalImages = [];
    (document.getElementById('add-product-form') as HTMLFormElement).reset();
    renderDashboard(document.getElementById('app')!);
};

window.deleteProduct = (id: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً من المتجر؟')) {
        products = products.filter((p: any) => p.id !== id);
        saveProducts();
        renderDashboard(document.getElementById('app')!);
    }
};

window.saveSettings = () => {
    settings.pixels.fb = (document.getElementById('fb-px') as HTMLInputElement).value;
    settings.pixels.ga = (document.getElementById('ga-px') as HTMLInputElement).value;
    settings.pixels.tt = (document.getElementById('tt-px') as HTMLInputElement).value;
    localStorage.setItem('elite_settings', JSON.stringify(settings));
    alert('تم حفظ إعدادات التتبع بنجاح!');
};

// --- التهيئة عند التحميل ---
window.addToCart = addToCart;
window.onhashchange = navigate;
document.addEventListener('DOMContentLoaded', () => {
    navigate();
    updateCartCount();
});
