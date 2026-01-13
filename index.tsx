
// Add global declarations for external libraries and window extensions
export {};

declare const lucide: any;

declare global {
  interface Window {
    saveSettings: () => void;
    addToCart: (id: string) => void;
    deleteProduct: (id: string) => void;
    handleImageUpload: (event: Event, targetId: string) => void;
    handleMultipleImagesUpload: (event: Event) => void;
    addNewProduct: (event: Event) => void;
  }
}

// --- إدارة البيانات (تخزين محلي) ---
const INITIAL_PRODUCTS = [
    { id: 'e1', name: 'هاتف ذكي ألترا 2024', category: 'electronics', price: 4500, image: 'https://picsum.photos/seed/phone/600/400', images: [], desc: 'أحدث هاتف ذكي بمواصفات عالمية.' },
    { id: 'h1', name: 'ماكينة تحضير القهوة', category: 'home', price: 1200, image: 'https://picsum.photos/seed/coffee/600/400', images: [], desc: 'استمتع بأفضل كوب قهوة في منزلك.' },
    { id: 'c1', name: 'سيارة سيدان اقتصادية', category: 'cars', price: 185000, image: 'https://picsum.photos/seed/car1/600/400', images: [], desc: 'سيارة عائلية مثالية باستهلاك منخفض.' }
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

// متغيرات مؤقتة للصور المرفوعة
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

const addToCart = (id: string) => {
    const product = products.find((p: any) => p.id === id);
    const existing = cart.find((item: any) => item.id === id);
    if (existing) { existing.qty += 1; }
    else { cart.push({ ...product, qty: 1 }); }
    saveCart();
    alert('تمت إضافة المنتج إلى السلة!');
};

// تحويل الصورة إلى Base64
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
        <section class="relative h-[400px] bg-green-700 text-white flex items-center justify-center text-center px-4 overflow-hidden">
            <div class="absolute inset-0 opacity-20 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200')"></div>
            <div class="z-10">
                <h1 class="text-5xl font-black mb-4 animate-bounce">متجر النخبة المغربي</h1>
                <p class="text-xl opacity-90 mb-8">أفضل المنتجات بأفضل الأسعار مع توصيل سريع لجميع المدن</p>
                <a href="#/category/electronics" class="bg-white text-green-700 px-10 py-4 rounded-full font-bold text-xl shadow-2xl hover:bg-gray-100 transition">ابدأ التسوق</a>
            </div>
        </section>
        <div class="max-w-7xl mx-auto px-4 py-16">
            <h2 class="text-3xl font-black mb-10 text-center">تصفح حسب الفئة</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <a href="#/category/electronics" class="bg-white p-10 rounded-3xl text-center border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition group">
                    <div class="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition"><i data-lucide="laptop" class="text-blue-600 w-10 h-10"></i></div>
                    <h3 class="text-2xl font-bold text-gray-800">إلكترونيات</h3>
                </a>
                <a href="#/category/home" class="bg-white p-10 rounded-3xl text-center border-2 border-transparent hover:border-orange-500 hover:shadow-2xl transition group">
                    <div class="bg-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition"><i data-lucide="home" class="text-orange-600 w-10 h-10"></i></div>
                    <h3 class="text-2xl font-bold text-gray-800">منزلية</h3>
                </a>
                <a href="#/category/cars" class="bg-white p-10 rounded-3xl text-center border-2 border-transparent hover:border-indigo-500 hover:shadow-2xl transition group">
                    <div class="bg-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition"><i data-lucide="car" class="text-indigo-600 w-10 h-10"></i></div>
                    <h3 class="text-2xl font-bold text-gray-800">سيارات</h3>
                </a>
            </div>
            
            <h2 class="text-3xl font-black mb-10">وصلنا حديثاً</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                ${products.slice(-4).reverse().map((p: any) => `
                    <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 product-card flex flex-col">
                        <img src="${p.image}" class="w-full h-48 object-cover">
                        <div class="p-5 flex flex-col flex-grow">
                            <h3 class="font-bold text-lg mb-2 line-clamp-1">${p.name}</h3>
                            <p class="text-green-600 text-xl font-black mb-4">${p.price.toLocaleString()} درهم</p>
                            <a href="#/product/${p.id}" class="mt-auto bg-gray-900 text-white text-center py-3 rounded-xl font-bold hover:bg-black transition">عرض المنتج</a>
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
        <div class="max-w-7xl mx-auto px-4 py-12">
            <h2 class="text-4xl font-black mb-10 text-center">قسم ${catName}</h2>
            ${filtered.length === 0 ? '<p class="text-center py-20 text-gray-400">لا توجد منتجات حالياً في هذا القسم.</p>' : `
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    ${filtered.map((p: any) => `
                        <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 product-card">
                            <img src="${p.image}" class="w-full h-64 object-cover">
                            <div class="p-6">
                                <h3 class="text-xl font-bold mb-2">${p.name}</h3>
                                <p class="text-green-700 text-2xl font-black mb-4">${p.price.toLocaleString()} درهم</p>
                                <div class="flex gap-2">
                                    <a href="#/product/${p.id}" class="flex-grow bg-gray-100 text-center py-3 rounded-xl font-bold">التفاصيل</a>
                                    <button onclick="window.addToCart('${p.id}')" class="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition"><i data-lucide="shopping-cart"></i></button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}

function renderProduct(container: HTMLElement, id: string) {
    const p = products.find((prod: any) => prod.id === id);
    if (!p) return;
    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                <div class="space-y-4">
                    <img src="${p.image}" class="w-full rounded-3xl shadow-2xl border bg-white">
                    <div class="grid grid-cols-4 gap-2">
                        ${(p.images || []).map((img: string) => `<img src="${img}" class="w-full h-20 object-cover rounded-xl border cursor-pointer hover:opacity-80 transition">`).join('')}
                    </div>
                </div>
                <div class="flex flex-col">
                    <span class="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold w-fit mb-4 uppercase tracking-widest">${p.category}</span>
                    <h1 class="text-5xl font-black mb-6 text-gray-900">${p.name}</h1>
                    <div class="bg-green-50 p-6 rounded-3xl mb-8">
                        <div class="text-4xl font-black text-green-700 mb-1">${p.price.toLocaleString()} درهم</div>
                        <p class="text-green-600 font-bold">توصيل مجاني + الدفع عند الاستلام</p>
                    </div>
                    <p class="text-gray-600 text-xl leading-relaxed mb-10 whitespace-pre-wrap">${p.desc}</p>
                    <div class="mt-auto flex gap-4">
                        <button onclick="window.addToCart('${p.id}')" class="flex-grow bg-green-600 text-white py-5 rounded-2xl text-2xl font-black shadow-xl hover:bg-green-700 transform active:scale-95 transition">أضف إلى السلة</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCart(container: HTMLElement) {
    const subtotal = cart.reduce((s: any, i: any) => s + (i.price * i.qty), 0);
    container.innerHTML = `
        <div class="max-w-4xl mx-auto px-4 py-12">
            <h1 class="text-4xl font-black mb-10">سلة المشتريات</h1>
            ${cart.length === 0 ? `
                <div class="text-center py-20 bg-white rounded-3xl border shadow-sm">
                    <i data-lucide="shopping-bag" class="w-20 h-20 mx-auto text-gray-200 mb-6"></i>
                    <p class="text-gray-400 text-xl mb-8">السلة فارغة حالياً</p>
                    <a href="#/" class="bg-green-600 text-white px-10 py-4 rounded-xl font-bold">ابدأ التسوق</a>
                </div>
            ` : `
                <div class="space-y-4 mb-8">
                    ${cart.map((item: any) => `
                        <div class="flex items-center gap-6 bg-white p-6 rounded-3xl border shadow-sm">
                            <img src="${item.image}" class="w-24 h-24 rounded-2xl object-cover border">
                            <div class="flex-grow">
                                <h3 class="font-black text-xl mb-1">${item.name}</h3>
                                <div class="text-green-600 font-bold text-lg">${item.price.toLocaleString()} درهم</div>
                            </div>
                            <div class="text-gray-900 font-black text-xl">x${item.qty}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="bg-white p-10 rounded-3xl border shadow-xl text-center">
                    <div class="flex justify-between items-center mb-8 text-2xl">
                        <span class="text-gray-500">الإجمالي الكلي:</span>
                        <span class="font-black text-green-700">${subtotal.toLocaleString()} درهم</span>
                    </div>
                    <a href="#/checkout" class="block w-full bg-green-600 text-white py-5 rounded-2xl font-black text-2xl hover:bg-green-700 transition">إتمام الطلب</a>
                </div>
            `}
        </div>
    `;
}

function renderCheckout(container: HTMLElement) {
    container.innerHTML = `
        <div class="max-w-xl mx-auto px-4 py-12">
            <h1 class="text-3xl font-black mb-8 text-center">إكمال عملية الشراء</h1>
            <form id="checkout-form" class="space-y-6 bg-white p-10 rounded-3xl border shadow-2xl">
                <div>
                    <label class="block font-bold text-gray-700 mb-2">الاسم الكامل</label>
                    <input type="text" id="cust-name" required placeholder="أدخل اسمك الكامل" class="w-full border-2 rounded-2xl p-4 focus:border-green-500 focus:outline-none">
                </div>
                <div>
                    <label class="block font-bold text-gray-700 mb-2">المدينة</label>
                    <input type="text" id="cust-city" required placeholder="مثلاً: الدار البيضاء" class="w-full border-2 rounded-2xl p-4 focus:border-green-500 focus:outline-none">
                </div>
                <div>
                    <label class="block font-bold text-gray-700 mb-2">رقم الهاتف</label>
                    <input type="tel" id="cust-phone" required placeholder="06XXXXXXXX" class="w-full border-2 rounded-2xl p-4 focus:border-green-500 focus:outline-none">
                </div>
                <div class="bg-green-50 p-6 rounded-2xl text-green-800 text-sm font-bold border border-green-100">
                    <i data-lucide="check-circle" class="inline-block w-4 h-4 mr-1"></i> الدفع عند الاستلام متاح لجميع المدن المغربية.
                </div>
                <button type="submit" class="w-full bg-green-600 text-white py-5 rounded-2xl font-black text-2xl hover:bg-green-700 transition">تأكيد الطلب</button>
            </form>
        </div>
    `;

    const form = document.getElementById('checkout-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const order = {
                id: 'ORD-' + Date.now(),
                name: (document.getElementById('cust-name') as HTMLInputElement).value,
                city: (document.getElementById('cust-city') as HTMLInputElement).value,
                phone: (document.getElementById('cust-phone') as HTMLInputElement).value,
                total: cart.reduce((s: any, i: any) => s + (i.price * i.qty), 0),
                date: new Date().toLocaleDateString('ar-MA')
            };
            orders.unshift(order);
            localStorage.setItem('elite_orders', JSON.stringify(orders));
            cart = [];
            saveCart();
            alert('تم تسجيل طلبك بنجاح! سنتصل بك للتأكيد.');
            window.location.hash = '#/';
        };
    }
}

function renderDashboard(container: HTMLElement) {
    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 py-12">
            <h1 class="text-4xl font-black mb-10">لوحة التحكم الإدارية</h1>
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Sidebar Menu -->
                <div class="lg:col-span-1 space-y-2">
                    <button id="tab-orders" class="w-full text-right p-4 bg-gray-100 hover:bg-green-50 rounded-xl font-bold transition">إدارة الطلبات (${orders.length})</button>
                    <button id="tab-add-product" class="w-full text-right p-4 bg-green-600 text-white rounded-xl font-bold">إضافة منتج جديد</button>
                    <button id="tab-settings" class="w-full text-right p-4 bg-gray-100 hover:bg-green-50 rounded-xl font-bold transition">إعدادات الموقع</button>
                </div>
                
                <!-- Main Content Area -->
                <div class="lg:col-span-3 space-y-8" id="dash-content">
                    <!-- نموذج إضافة منتج -->
                    <div class="bg-white p-10 rounded-3xl border shadow-xl">
                        <h2 class="text-2xl font-black mb-8 flex items-center gap-2"><i data-lucide="plus-circle" class="text-green-600"></i> إضافة منتج جديد</h2>
                        <form onsubmit="window.addNewProduct(event)" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block font-bold mb-2 text-gray-700">اسم المنتج</label>
                                    <input type="text" id="new-p-name" required class="w-full border-2 rounded-xl p-3 focus:border-green-500 focus:outline-none">
                                </div>
                                <div>
                                    <label class="block font-bold mb-2 text-gray-700">السعر (MAD)</label>
                                    <input type="number" id="new-p-price" required class="w-full border-2 rounded-xl p-3 focus:border-green-500 focus:outline-none">
                                </div>
                            </div>
                            <div>
                                <label class="block font-bold mb-2 text-gray-700">الفئة</label>
                                <select id="new-p-cat" class="w-full border-2 rounded-xl p-3 focus:border-green-500 focus:outline-none bg-white">
                                    <option value="electronics">إلكترونيات</option>
                                    <option value="home">منزلية</option>
                                    <option value="cars">سيارات</option>
                                </select>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block font-bold mb-2 text-gray-700">الصورة الرئيسية للمنتج</label>
                                    <div class="flex items-center justify-center w-full">
                                        <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden relative">
                                            <div id="main-preview" class="flex flex-col items-center justify-center pt-5 pb-6">
                                                <i data-lucide="image" class="w-8 h-8 text-gray-400 mb-2"></i>
                                                <p class="text-sm text-gray-400 font-bold">اضغط لرفع الصورة</p>
                                            </div>
                                            <input type="file" class="hidden" accept="image/*" onchange="window.handleImageUpload(event, 'main-preview')">
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label class="block font-bold mb-2 text-gray-700">صور إضافية للمنتج (اختياري)</label>
                                    <div class="flex items-center justify-center w-full">
                                        <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden">
                                            <div id="multi-preview" class="flex flex-wrap gap-1 p-2 justify-center overflow-auto max-h-full">
                                                <i data-lucide="upload-cloud" class="w-8 h-8 text-gray-400 mb-2"></i>
                                                <p class="text-xs text-gray-400 font-bold w-full text-center">رفع عدة صور</p>
                                            </div>
                                            <input type="file" multiple class="hidden" accept="image/*" onchange="window.handleMultipleImagesUpload(event)">
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label class="block font-bold mb-2 text-gray-700">وصف المنتج الكامل</label>
                                <textarea id="new-p-desc" rows="5" required class="w-full border-2 rounded-xl p-3 focus:border-green-500 focus:outline-none" placeholder="اكتب تفاصيل المنتج ومميزاته..."></textarea>
                            </div>
                            <button type="submit" class="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-xl hover:bg-green-700 shadow-lg transition">إضافة المنتج للمتجر</button>
                        </form>
                    </div>

                    <!-- قائمة المنتجات الحالية -->
                    <div class="bg-white p-10 rounded-3xl border shadow-sm">
                        <h2 class="text-2xl font-black mb-8">إدارة المنتجات المعروضة</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            ${products.map((p: any) => `
                                <div class="flex items-center gap-4 border p-4 rounded-2xl bg-gray-50 relative group">
                                    <img src="${p.image}" class="w-16 h-16 object-cover rounded-xl border">
                                    <div class="flex-grow">
                                        <div class="font-bold text-gray-900">${p.name}</div>
                                        <div class="text-green-600 font-black text-sm">${p.price.toLocaleString()} درهم</div>
                                    </div>
                                    <button onclick="window.deleteProduct('${p.id}')" class="text-red-400 hover:text-red-600 p-2 transition"><i data-lucide="trash-2"></i></button>
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

// Assigning handlers directly to the window object to satisfy the augmented Window interface
window.handleImageUpload = async (event: Event, targetId: string) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        tempMainImage = await fileToBase64(file);
        const preview = document.getElementById(targetId);
        if (preview) {
            preview.innerHTML = `<img src="${tempMainImage}" class="w-full h-full object-cover">`;
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
            img.className = 'w-10 h-10 object-cover rounded border';
            if (preview) preview.appendChild(img);
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
        alert('يرجى اختيار صورة رئيسية للمنتج');
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
    alert('تمت إضافة المنتج بنجاح!');
    
    // إعادة تعيين الحالة والواجهة
    tempMainImage = '';
    tempAdditionalImages = [];
    renderDashboard(document.getElementById('app')!);
};

window.deleteProduct = (id: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج من المتجر؟')) {
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
    alert('تم حفظ الإعدادات بنجاح!');
};

// --- التهيئة عند التحميل ---
window.addToCart = addToCart;
window.onhashchange = navigate;
document.addEventListener('DOMContentLoaded', () => {
    navigate();
    updateCartCount();
});
