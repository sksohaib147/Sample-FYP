import React, { useEffect, useState } from 'react';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BeltsAndCagesDropdown = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/products?category=Belts%20and%20Cages');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="py-6">
      <div className="mb-2">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-red-500 font-semibold text-lg mb-4">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map(product => (
          <div key={product._id} className="w-64 h-64 bg-white rounded-lg shadow-md p-4">
            {/* Product card content */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeltsAndCagesDropdown; 