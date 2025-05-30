import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch product');
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {loading && <div className="text-center text-gray-500">Loading product...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {product && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex items-center justify-center">
              <img src={product.images && product.images[0]} alt={product.name} className="h-80 w-full object-cover rounded-xl" />
            </div>
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <div className="text-gray-500 text-sm mb-2">{product.category}</div>
              <div className="font-bold text-primary text-2xl mb-4">${product.price}</div>
              <div className="mb-4 text-gray-700">{product.description}</div>
              <button className="bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition w-full md:w-1/2">Add to Cart</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail; 