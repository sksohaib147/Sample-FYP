import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';

const getCartFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    return [];
  }
};

const setCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const Checkout = () => {
  const [cart, setCart] = useState(getCartFromStorage());
  const [form, setForm] = useState({
    firstName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [payment, setPayment] = useState('cod');
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shipping: form,
          items: cart,
          total: subtotal,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Order failed');
      setSuccess(true);
      setCart([]);
      setCartToStorage([]);
      setTimeout(() => navigate('/order-success'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="text-xs text-gray-500 mb-6">
          <ol className="flex space-x-2">
            <li><a href="#" className="hover:underline text-primary">Home</a></li>
            <li>/</li>
            <li><a href="#" className="hover:underline text-primary">My account</a></li>
            <li>/</li>
            <li><a href="#" className="hover:underline text-primary">Product</a></li>
            <li>/</li>
            <li><a href="#" className="hover:underline text-primary">Checkout</a></li>
          </ol>
        </nav>
        <h2 className="text-2xl font-semibold mb-8">Billing Details</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
          {/* Billing Form */}
          <div className="flex-1 space-y-4">
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name*" className="w-full border border-gray-200 rounded px-4 py-2 bg-gray-50 focus:outline-primary" required />
            <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company Name" className="w-full border border-gray-200 rounded px-4 py-2 bg-gray-50 focus:outline-primary" />
            <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Street Address*" className="w-full border border-gray-200 rounded px-4 py-2 bg-gray-50 focus:outline-primary" required />
            <input type="text" name="apartment" value={form.apartment} onChange={handleChange} placeholder="Apartment, floor, etc. (optional)" className="w-full border border-gray-200 rounded px-4 py-2 bg-gray-50 focus:outline-primary" />
            <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Town/City*" className="w-full border border-gray-200 rounded px-4 py-2 bg-gray-50 focus:outline-primary" required />
            <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number*" className="w-full border border-gray-200 rounded px-4 py-2 bg-gray-50 focus:outline-primary" required />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address*" className="w-full border border-gray-200 rounded px-4 py-2 bg-gray-50 focus:outline-primary" required />
            <label className="flex items-center mt-2">
              <input type="checkbox" checked={saveInfo} onChange={() => setSaveInfo(!saveInfo)} className="accent-primary mr-2" />
              <span className="text-sm text-gray-700">Save this information for faster check-out next time</span>
            </label>
          </div>
          {/* Order Summary */}
          <div className="w-full md:w-[350px] bg-white rounded-xl shadow p-6">
            <div className="font-semibold mb-4">Cart Total</div>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-2">Payment</div>
              <label className="flex items-center mb-1">
                <input type="radio" name="payment" value="bank" checked={payment === 'bank'} onChange={() => setPayment('bank')} className="accent-primary mr-2" />
                <span className="mr-2">Bank</span>
                <FaCcVisa className="inline text-xl mr-1 text-blue-600" />
                <FaCcMastercard className="inline text-xl text-yellow-600" />
              </label>
              <label className="flex items-center">
                <input type="radio" name="payment" value="cod" checked={payment === 'cod'} onChange={() => setPayment('cod')} className="accent-primary mr-2" />
                <span>Cash on delivery</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition disabled:opacity-60"
            >
              {loading ? 'Placing Order...' : 'Proceed to Checkout'}
            </button>
            {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center mt-2">Order placed! Redirecting...</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 