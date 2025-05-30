import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  IconButton,
  TextField,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

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

const Cart = () => {
  const [cart, setCart] = useState(getCartFromStorage());
  const navigate = useNavigate();
  const { updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    setCartToStorage(cart);
  }, [cart]);

  const handleQuantityChange = (index, value) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, Number(value));
    setCart(newCart);
  };

  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // TODO: Implement checkout process
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">Shopping Cart</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 border-b py-4">
                <img src={item.images && item.images[0]} alt={item.name} className="h-20 w-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-lg">{item.name}</div>
                  <div className="text-gray-500 text-sm">${item.price}</div>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e => handleQuantityChange(idx, e.target.value)}
                  className="w-16 border rounded px-2 py-1 text-center"
                />
                <button
                  onClick={() => handleRemove(idx)}
                  className="ml-2 text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {/* Summary */}
          <div className="w-full md:w-80 bg-gray-50 rounded-xl shadow p-6 h-fit">
            <div className="font-semibold text-lg mb-4">Order Summary</div>
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
            <button
              onClick={handleCheckout}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => clearCart()}
              className="w-full mt-2 text-gray-500 hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 