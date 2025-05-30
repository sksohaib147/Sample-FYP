import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => (
  <div className="bg-white min-h-screen flex items-center justify-center py-8">
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow text-center">
      <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-6">Thank you for your purchase. Your order is being processed and you will receive an email confirmation soon.</p>
      <div className="flex flex-col gap-2">
        <Link to="/profile" className="w-full bg-primary text-white font-semibold py-2 rounded hover:bg-red-600 transition">View My Orders</Link>
        <Link to="/products" className="w-full border border-primary text-primary font-semibold py-2 rounded hover:bg-primary hover:text-white transition">Continue Shopping</Link>
      </div>
    </div>
  </div>
);

export default OrderSuccess; 