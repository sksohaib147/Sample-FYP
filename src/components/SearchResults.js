import React from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import ProductCard from './ProductCard';

const SearchResults = ({ results, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <FaSpinner className="animate-spin text-4xl text-red-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No results found</p>
        <p className="text-sm text-gray-400 mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {results.map((item) => (
        <Link
          key={item._id}
          to={`/${item.type === 'pet' ? 'pets' : 'products'}/${item._id}`}
          className="transform transition-transform hover:scale-105"
        >
          <ProductCard
            name={item.name}
            pricePKR={item.pricePKR}
            priceUSD={item.priceUSD}
            image={item.images[0]}
            category={item.category}
            condition={item.condition}
            location={item.location}
            rating={item.ratings?.average || 0}
            reviewCount={item.ratings?.count || 0}
            isSold={item.status === 'sold'}
            discount={item.discountPercentage}
            freeShipping={item.shipping?.freeShipping}
            originalPricePKR={item.originalPricePKR}
            originalPriceUSD={item.originalPriceUSD}
          />
        </Link>
      ))}
    </div>
  );
};

export default SearchResults; 