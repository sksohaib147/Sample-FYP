import React, { useState } from 'react';
import { FaShippingFast, FaHeadset, FaPaw, FaStar, FaChevronLeft, FaChevronRight, FaDog, FaCat, FaBone, FaGamepad, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage, translations } from '../contexts/LanguageContext';


// Sidebar categories
const categories = [
  {
    name: 'Dogs Food',
    icon: <FaDog className="w-5 h-5" />,
    color: 'hover:bg-red-50',
    borderColor: 'border-gray-100',
    textColor: 'text-gray-700',
    bgColor: 'bg-white'
  },
  {
    name: 'Cat Food',
    icon: <FaCat className="w-5 h-5" />,
    color: 'hover:bg-red-50',
    borderColor: 'border-gray-100',
    textColor: 'text-gray-700',
    bgColor: 'bg-white'
  },
  {
    name: 'Rabbit Food',
    icon: <FaBone className="w-5 h-5" />,
    color: 'hover:bg-red-50',
    borderColor: 'border-gray-100',
    textColor: 'text-gray-700',
    bgColor: 'bg-white'
  },
  {
    name: 'Toys',
    icon: <FaGamepad className="w-5 h-5" />,
    color: 'hover:bg-red-50',
    borderColor: 'border-gray-100',
    textColor: 'text-gray-700',
    bgColor: 'bg-white'
  },
  {
    name: 'Belts and Cages',
    icon: <FaHome className="w-5 h-5" />,
    color: 'hover:bg-red-50',
    borderColor: 'border-gray-100',
    textColor: 'text-gray-700',
    bgColor: 'bg-white'
  },
];

// Banner images (carousel)
const banners = [
  {
    img: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80',
    alt: 'Voucher Banner',
    text: 'Up to 10% off Voucher',
    sub: 'Shop now >',
  },
  {
    img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
    alt: 'Promo Banner',
    text: 'Best Deals for Your Pets',
    sub: 'Discover >',
  },
];

// Flash sales products (placeholder)
const flashSales = [
  {
    id: 1,
    name: 'Profeed+ 15KG',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80',
    sale: true,
    soldOut: false,
    rating: 4.8,
    reviews: 1052,
  },
  {
    id: 2,
    name: 'Cat Scratcher',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80',
    sale: true,
    soldOut: true,
    rating: 4.7,
    reviews: 711,
  },
  {
    id: 3,
    name: 'Dog Food 5KG',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80',
    sale: true,
    soldOut: false,
    rating: 4.6,
    reviews: 891,
  },
  {
    id: 4,
    name: 'Cat Litter',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    sale: true,
    soldOut: false,
    rating: 4.5,
    reviews: 496,
  },
  {
    id: 5,
    name: 'Cat Box',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=400&q=80',
    sale: true,
    soldOut: false,
    rating: 4.4,
    reviews: 320,
  },
];

// Best selling pets (placeholder)
const bestSellingPets = [
  {
    id: 1,
    name: 'German Shepherd',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 102,
  },
  { id: 2 },
  { id: 3 },
  { id: 4 },
];

function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const handlePrev = () => setIndex((i) => (i === 0 ? banners.length - 1 : i - 1));
  const handleNext = () => setIndex((i) => (i === banners.length - 1 ? 0 : i + 1));
  return (
    <div className="relative w-full min-h-[220px] mb-6">
      <div className="flex items-center h-[220px] border-2 border-primary rounded-xl overflow-hidden bg-white">
        <img src={banners[index].img} alt={banners[index].alt} className="w-[260px] h-[220px] object-cover flex-shrink-0" />
        <div className="pl-8">
          <h2 className="text-2xl font-bold mb-2">{banners[index].text}</h2>
          <p className="text-primary font-medium">{banners[index].sub}</p>
        </div>
      </div>
      <button onClick={handlePrev} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white shadow p-1 rounded-full"><FaChevronLeft /></button>
      <button onClick={handleNext} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white shadow p-1 rounded-full"><FaChevronRight /></button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full ${i === index ? 'bg-primary' : 'bg-gray-300'}`}></div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="relative w-48 mx-2 bg-white rounded-xl shadow hover:-translate-y-2 transition-transform">
      <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded-t-xl" />
      {product.sale && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
      )}
      {product.soldOut && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg z-10 rounded-xl">Sold Out</div>
      )}
      <div className="p-3 pb-2">
        <div className="font-semibold truncate">{product.name}</div>
        <div className="text-gray-500 text-sm mb-1">${product.price}</div>
        <div className="flex items-center gap-1 text-yellow-400 text-xs">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.round(product.rating) ? '' : 'text-gray-300'} />
          ))}
          <span className="text-gray-400 ml-1">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
}

function PetCard({ pet }) {
  if (!pet.name) {
    return <div className="w-48 h-56 mx-2 bg-gray-100 rounded-xl" />;
  }
  return (
    <div className="w-48 mx-2 bg-white rounded-xl shadow">
      <img src={pet.image} alt={pet.name} className="h-32 w-full object-cover rounded-t-xl" />
      <div className="p-3 pb-2">
        <div className="font-semibold truncate">{pet.name}</div>
        <div className="text-gray-500 text-sm mb-1">${pet.price}</div>
        <div className="flex items-center gap-1 text-yellow-400 text-xs">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.round(pet.rating || 0) ? '' : 'text-gray-300'} />
          ))}
          <span className="text-gray-400 ml-1">({pet.reviews || 0})</span>
        </div>
      </div>
    </div>
  );
}

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6 min-h-[400px]">
            <div className="relative mb-8">
              <h3 className="text-2xl font-bold text-gray-800 inline-block">
                {t.categories}
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-red-500 rounded-full"></div>
              </h3>
            </div>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.name}>
                  {cat.name === 'Dogs Food' ? (
                    <Link
                      to="/dog-food"
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-gray-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors">{t.dogsFood}</span>
                      </div>
                    </Link>
                  ) : cat.name === 'Cat Food' ? (
                    <Link
                      to="/cat-food"
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-gray-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors">{t.catFood}</span>
                      </div>
                    </Link>
                  ) : cat.name === 'Rabbit Food' ? (
                    <Link
                      to="/rabbit-food"
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-gray-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors">{t.rabbitFood}</span>
                      </div>
                    </Link>
                  ) : cat.name === 'Toys' ? (
                    <Link
                      to="/toys"
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-gray-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors">{t.toys}</span>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to="/belts-and-cages"
                      className={`w-full block text-left p-4 rounded-lg border ${cat.color} ${cat.borderColor} ${cat.textColor} ${cat.bgColor} transition-all duration-200 hover:border-red-200 hover:shadow-md group`}
                    >
                      <div className="flex items-center">
                        <span className="mr-4 text-gray-500 group-hover:text-red-500 transition-colors">{cat.icon}</span>
                        <span className="font-medium group-hover:text-red-500 transition-colors">{t.beltsAndCages}</span>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </aside>
          {/* Main Content */}
          <main className="flex-1">
            <BannerCarousel />
            {/* Flash Sales Section */}
            <section className="mt-8">
              <div className="flex items-center mb-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">{t.today}</span>
                <h4 className="text-xl font-bold">{t.flashSales}</h4>
              </div>
              <hr className="mb-4" />
              <div className="flex overflow-x-auto pb-2">
                {flashSales.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
            {/* Best Selling Pets Section */}
            <section className="mt-12">
              <div className="flex items-center mb-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mr-2">{t.topRated}</span>
                <h4 className="text-xl font-bold">{t.bestSellingPets}</h4>
                <div className="flex-1" />
                <button className="border border-red-500 text-red-500 font-bold px-4 py-2 rounded hover:bg-red-50 transition">{t.viewAll}</button>
              </div>
              <hr className="mb-4" />
              <div className="flex overflow-x-auto pb-2">
                {bestSellingPets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home; 