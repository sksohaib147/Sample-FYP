import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const initialForm = {
  name: '',
  price: '',
  oldPrice: '', // for discount
  description: '',
  category: 'food',
  stock: '',
  images: '',
};

const PLACEHOLDER_RATING = 4.5;
const PLACEHOLDER_REVIEWS = 35;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();

    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
      const res = await fetch('/api/products');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      const body = {
        ...form,
        price: parseFloat(form.price),
        oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : undefined,
        stock: parseInt(form.stock, 10),
        images: form.images.split(',').map(url => url.trim()).filter(Boolean),
      };
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error('Server returned an invalid response.');
      }
      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.map(e => e.msg).join(' | '));
        }
        throw new Error(data.error || 'Failed to add product');
      }
      setForm(initialForm);
      fetchProducts();
    } catch (err) {
      setFormError(err.message || 'An unknown error occurred.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (err) {
      alert(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Explore Our Products</h2>
        {/* Product Add Form (admin only) */}
        {user && user.isAdmin && (
          <div className="bg-white rounded-xl shadow p-6 mb-10">
            <h3 className="text-lg font-bold mb-4">Add New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name
                  <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                </label>
              </div>
              <div>
                <label className="block font-medium mb-1">Price
                  <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                </label>
              </div>
              <div>
                <label className="block font-medium mb-1">Old Price (optional)
                  <input name="oldPrice" type="number" step="0.01" value={form.oldPrice} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                </label>
              </div>
              <div>
                <label className="block font-medium mb-1">Description
                  <input name="description" value={form.description} onChange={handleChange} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                </label>
              </div>
              <div>
                <label className="block font-medium mb-1">Category
                  <select name="category" value={form.category} onChange={handleChange} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="food">Food</option>
                    <option value="toys">Toys</option>
                    <option value="accessories">Accessories</option>
                    <option value="health">Health</option>
                    <option value="grooming">Grooming</option>
                  </select>
                </label>
              </div>
              <div>
                <label className="block font-medium mb-1">Stock
                  <input name="stock" type="number" value={form.stock} onChange={handleChange} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                </label>
              </div>
              <div>
                <label className="block font-medium mb-1">Images (comma-separated URLs)
                  <input name="images" value={form.images} onChange={handleChange} required className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
                </label>
              </div>
              <button type="submit" disabled={formLoading} className="bg-primary text-white font-semibold px-6 py-2 rounded hover:bg-red-600 transition disabled:opacity-50">
                {formLoading ? 'Adding...' : 'Add Product'}
              </button>
              {formError && <div className="text-red-500 font-medium mt-2">{formError}</div>}
            </form>
          </div>
        )}
        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length === 0 && <div className="col-span-full text-center text-gray-500">No products found.</div>}
            {products.map(product => {
              const hasDiscount = product.oldPrice && product.oldPrice > product.price;
              const discountPercent = hasDiscount ? Math.round(100 * (product.oldPrice - product.price) / product.oldPrice) : 0;
              return (
                <div key={product._id} className="relative bg-white rounded-xl shadow p-4 flex flex-col group">
                  {/* Discount badge */}
                  {hasDiscount && (
                    <span className="absolute top-3 left-3 bg-red-100 text-red-500 text-xs font-bold px-2 py-1 rounded">-{discountPercent}%</span>
                  )}
                  {/* Delete icon (admin only) */}
                  {user && user.isAdmin && (
                    <button
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl focus:outline-none z-10"
                      onClick={() => handleDelete(product._id)}
                      aria-label="Delete product"
                    >
                      <FaTrash />
                    </button>
                  )}
                  {/* Product Image */}
                  {product.images && product.images.length > 0 && (
                    <img src={product.images[0]} alt={product.name} className="h-40 w-full object-cover rounded-t-xl mb-4" />
                  )}
                  {/* Add to Cart Button */}
              <button
                    className="w-full bg-black text-white font-semibold py-2 rounded shadow flex items-center justify-center gap-2 mb-2 hover:bg-gray-800 transition"
                    onClick={() => addToCart(product)}
              >
                    <FaShoppingCart /> Add To Cart
              </button>
                  {/* Product Info */}
                  <div className="font-semibold text-base mb-1 truncate mt-2">{product.name}</div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-500 font-bold text-lg">${product.price}</span>
                    {hasDiscount && (
                      <span className="text-gray-400 line-through text-sm">${product.oldPrice}</span>
                    )}
                  </div>
            </div>
              );
            })}
        </div>
        )}
      </div>
    </div>
  );
};

export default Products; 