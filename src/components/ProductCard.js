import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaTag } from 'react-icons/fa';
import { formatCondition, calculateDiscount } from '../utils/ecommerce';
import { formatPKR } from '../utils/currency';

const ProductCard = ({ product }) => {
  const hasDiscount = product.originalPricePKR && product.originalPricePKR > product.pricePKR;
  const discountPercentage = hasDiscount 
    ? calculateDiscount(product.originalPricePKR, product.pricePKR)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.slug || product._id}`}>
        <div className="relative h-48">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.status === 'sold' && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded">
              Sold
            </div>
          )}
          {hasDiscount && (
            <div className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1 m-2 rounded">
              {discountPercentage}% OFF
            </div>
          )}
          {product.shipping?.freeShipping && (
            <div className="absolute bottom-0 left-0 bg-blue-500 text-white px-2 py-1 m-2 rounded">
              Free Shipping
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
          
          <div className="flex flex-col space-y-1">
            {hasDiscount ? (
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-red-600">{formatPKR(product.pricePKR)}</span>
                <span className="text-sm text-gray-400 line-through">{formatPKR(product.originalPricePKR)}</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-red-600">{formatPKR(product.pricePKR)}</span>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">{product.category}</span>
            <span className="text-sm text-gray-500">{formatCondition(product.condition)}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mt-2">
            <FaMapMarkerAlt className="mr-1" />
            <span>{product.location}</span>
          </div>

          {product.ratings?.average > 0 && (
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <FaStar className="text-yellow-400 mr-1" />
              <span>{product.ratings.average.toFixed(1)}</span>
              <span className="ml-1">({product.ratings.count})</span>
            </div>
          )}

          {product.tags && product.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 