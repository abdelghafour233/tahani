
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Laptop, Home as HomeIcon, Car, ChevronLeft } from 'lucide-react';

interface HomeProps {
  products: Product[];
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-green-600 to-green-800 text-white flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/tech/1200/600" alt="Hero background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">أفضل العروض في المغرب</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">تسوق الإلكترونيات، مستلزمات المنزل، والسيارات في مكان واحد</p>
          <div className="flex justify-center gap-4">
            <Link to="/category/electronics" className="bg-white text-green-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
              ابدأ التسوق
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">تصفح الفئات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/category/electronics" className="group bg-blue-50 p-8 rounded-2xl flex flex-col items-center hover:bg-blue-100 transition transform hover:-translate-y-1 shadow-sm">
            <div className="bg-blue-600 text-white p-4 rounded-full mb-4 group-hover:scale-110 transition">
              <Laptop size={48} />
            </div>
            <h3 className="text-2xl font-bold">إلكترونيات</h3>
            <p className="text-gray-600 mt-2">جوالات، لابتوبات، وإكسسوارات</p>
          </Link>
          
          <Link to="/category/home" className="group bg-orange-50 p-8 rounded-2xl flex flex-col items-center hover:bg-orange-100 transition transform hover:-translate-y-1 shadow-sm">
            <div className="bg-orange-600 text-white p-4 rounded-full mb-4 group-hover:scale-110 transition">
              <HomeIcon size={48} />
            </div>
            <h3 className="text-2xl font-bold">منزلية</h3>
            <p className="text-gray-600 mt-2">أثاث، ديكور، وأدوات مطبخ</p>
          </Link>
          
          <Link to="/category/cars" className="group bg-indigo-50 p-8 rounded-2xl flex flex-col items-center hover:bg-indigo-100 transition transform hover:-translate-y-1 shadow-sm">
            <div className="bg-indigo-600 text-white p-4 rounded-full mb-4 group-hover:scale-110 transition">
              <Car size={48} />
            </div>
            <h3 className="text-2xl font-bold">سيارات</h3>
            <p className="text-gray-600 mt-2">سيارات جديدة ومستعملة</p>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">أحدث المنتجات</h2>
          <Link to="/category/electronics" className="text-green-600 font-bold flex items-center gap-1 hover:underline">
            عرض الكل <ChevronLeft size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition flex flex-col">
              <div className="relative h-64">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  جديد
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-lg mb-1 group-hover:text-green-600 transition">{product.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xl font-bold text-green-700">{product.price.toLocaleString()} درهم</span>
                  <span className="bg-gray-100 px-3 py-1 rounded text-xs text-gray-600">MAD</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
