import React from 'react';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const dogFoodProducts = [
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

const DogFoodDropdown = () => {
  return (
    <div className="py-6">
      <div className="mb-2">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-red-500 font-semibold text-lg mb-4">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {dogFoodProducts.map(product => (
          <div key={product.id} className="relative min-w-[220px] bg-white rounded-xl shadow p-2 flex flex-col">
            {/* SALE badge */}
            {product.sale && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
            )}
            {/* Sold Out overlay */}
            {product.soldOut && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg z-10 rounded-xl">Sold Out</div>
            )}
            <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded-t-xl" />
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
        ))}
      </div>
    </div>
  );
};

export default DogFoodDropdown; 