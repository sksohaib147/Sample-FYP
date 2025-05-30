import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Avatar,
  TextField,
  Divider,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

// Sidebar menu component (styled & interactive)
const AccountSidebar = ({ activeSection, setActiveSection }) => (
  <div className="w-full max-w-xs mb-8">
    <div className="text-xs mb-4">
      <Link to="/" className="text-gray-400 hover:underline">Home</Link>
      <span className="mx-1 text-gray-400">/</span>
      <span className="text-black font-bold">My Account</span>
    </div>
    <div className="mb-6">
      <div className="font-bold text-black mb-2">Manage My Account</div>
      <ul className="space-y-1 ml-2">
        <li
          className={
            activeSection === 'profile'
              ? 'text-red-500 font-semibold cursor-pointer'
              : 'text-gray-700 hover:text-red-500 cursor-pointer'
          }
          onClick={() => setActiveSection('profile')}
        >
          My Profile
        </li>
        <li
          className={
            activeSection === 'payment'
              ? 'text-red-500 font-semibold cursor-pointer'
              : 'text-gray-700 hover:text-red-500 cursor-pointer'
          }
          onClick={() => setActiveSection('payment')}
        >
          My Payment Options
        </li>
      </ul>
    </div>
    <div className="mb-6">
      <div className="font-bold text-black mb-2">My Orders</div>
      <ul className="space-y-1 ml-2">
        <li className="text-gray-400 cursor-not-allowed">My Returns</li>
        <li className="text-gray-400 cursor-not-allowed">My Cancellations</li>
      </ul>
    </div>
  </div>
);

// Profile Edit Form (controlled, styled)
const ProfileEditForm = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/users/me', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete account');
      logout();
      navigate('/');
    } catch (err) {
      alert(err.message || 'Failed to delete account');
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading user...</div>;
  if (!user) return <div className="text-center text-gray-500">Please log in to view your profile.</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4 text-red-500">Edit Your Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1">First Name</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500" />
        </div>
        <div>
          <label className="block font-medium mb-1">Last Name</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500" />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500" />
        </div>
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500" />
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-2">Password Changes</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="password" name="currentPassword" placeholder="Current Password" disabled className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-100" />
          <input type="password" name="newPassword" placeholder="New Password" disabled className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-100" />
          <input type="password" name="confirmNewPassword" placeholder="Confirm New Password" disabled className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-100" />
        </div>
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
      <div className="flex justify-between items-center mt-8">
        <div>
          <button type="button" onClick={handleDeleteAccount} className="px-4 py-2 rounded bg-gray-200 text-red-600 font-semibold hover:bg-red-300 transition">
            Delete Account
          </button>
        </div>
        <div className="flex gap-2">
          <button type="button" className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</button>
          <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </form>
  );
};

// My Payment Options Form (styled)
const MyPaymentOptionsForm = () => {
  const { user, loading } = useAuth();
  const [form, setForm] = useState({
    cardholder: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!user) return;
    // Fetch current user's payment option
    const fetchPaymentOption = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/payment-options/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setForm({
              cardholder: data.cardholder || '',
              cardNumber: data.cardNumber || '',
              expiry: data.expiry || '',
              cvv: data.cvv || ''
            });
          }
        }
      } catch (err) {
        // ignore fetch error
      }
    };
    fetchPaymentOption();
  }, [user]);

  const validate = () => {
    const errors = {};
    // Cardholder: required, only letters and spaces
    if (!form.cardholder.trim()) {
      errors.cardholder = 'Cardholder name is required';
    } else if (!/^[A-Za-z ]+$/.test(form.cardholder.trim())) {
      errors.cardholder = 'Cardholder name must contain only letters and spaces';
    }
    // Card Number: required, 16 digits
    if (!form.cardNumber.trim()) {
      errors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(form.cardNumber.trim())) {
      errors.cardNumber = 'Card number must be 16 digits';
    }
    // Expiry: required, MM/YY, not in the past
    if (!form.expiry.trim()) {
      errors.expiry = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(form.expiry.trim())) {
      errors.expiry = 'Expiry must be in MM/YY format';
    } else {
      // Check not in the past
      const [mm, yy] = form.expiry.split('/');
      const now = new Date();
      const expDate = new Date(2000 + parseInt(yy, 10), parseInt(mm, 10) - 1, 1);
      if (expDate < new Date(now.getFullYear(), now.getMonth(), 1)) {
        errors.expiry = 'Expiry date cannot be in the past';
      }
    }
    // CVV: required, 3 or 4 digits
    if (!form.cvv.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(form.cvv.trim())) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }
    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/payment-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save payment option');
      setSuccess('Payment option saved!');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading user...</div>;
  if (!user) return <div className="text-center text-gray-500">Please log in to view your payment options.</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4 text-red-500">My Payment Options</h3>
      <div className="mb-4">
        <label className="block font-medium mb-1">Cardholder Name</label>
        <input type="text" name="cardholder" value={form.cardholder} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500" />
        {fieldErrors.cardholder && <div className="text-red-500 text-sm mt-1">{fieldErrors.cardholder}</div>}
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Card Number</label>
        <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500" />
        {fieldErrors.cardNumber && <div className="text-red-500 text-sm mt-1">{fieldErrors.cardNumber}</div>}
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block font-medium mb-1">Expiry Date</label>
          <input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500" />
          {fieldErrors.expiry && <div className="text-red-500 text-sm mt-1">{fieldErrors.expiry}</div>}
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-1">CVV</label>
          <input type="password" name="cvv" value={form.cvv} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500" />
          {fieldErrors.cvv && <div className="text-red-500 text-sm mt-1">{fieldErrors.cvv}</div>}
        </div>
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      {success && <div className="text-green-600 text-sm mb-2">{success}</div>}
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-60">
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

const getToken = () => localStorage.getItem('token');

const Profile = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [pets, setPets] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    fetchUserListings();
    fetchOrders();
  }, [activeTab]);

  const fetchUserListings = async () => {
    try {
      if (!user) return;
      if (activeTab === 0) {
        const response = await fetch(`http://localhost:5000/api/pets?seller=${user._id}`);
        const data = await response.json();
        setPets(data);
      } else {
        const response = await fetch(`http://localhost:5000/api/products?seller=${user._id}`);
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const fetchOrders = async () => {
    setError('');
    try {
      if (!user) return;
      const res = await fetch('/api/orders?user=' + user._id, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');
      // TODO: Update user context with new data
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteListing = async (id, type) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        fetchUserListings();
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading user...</div>;
  if (!user) return <div className="text-center text-gray-500">Please log in to view your account.</div>;

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Sidebar menu */}
        <AccountSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        {/* Conditionally render Edit Profile section */}
        {activeSection === 'profile' && <ProfileEditForm />}
        {/* My Payment Options Form */}
        {activeSection === 'payment' && <MyPaymentOptionsForm />}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}
        {user && (
          <div className="bg-gray-50 rounded-xl shadow p-6 mb-8">
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="flex gap-4">
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} disabled={!isEditing} placeholder="First Name" className="w-1/2 border border-gray-200 rounded px-4 py-2 bg-white focus:outline-primary" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} disabled={!isEditing} placeholder="Last Name" className="w-1/2 border border-gray-200 rounded px-4 py-2 bg-white focus:outline-primary" />
              </div>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={!isEditing} placeholder="Email" className="w-full border border-gray-200 rounded px-4 py-2 bg-white focus:outline-primary" />
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} placeholder="Phone" className="w-full border border-gray-200 rounded px-4 py-2 bg-white focus:outline-primary" />
              <div className="flex gap-2 mt-2">
                {isEditing ? (
                  <>
                    <button type="submit" disabled={saving} className="bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="border border-primary text-primary font-semibold py-2 px-4 rounded hover:bg-primary hover:text-white transition">Cancel</button>
                  </>
                ) : (
                  <button type="button" onClick={() => setIsEditing(true)} className="bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition">Edit Profile</button>
                )}
              </div>
            </form>
          </div>
        )}
        {/* Order History */}
        <div className="bg-gray-50 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Order History</h3>
          {orders.length === 0 ? (
            <div className="text-gray-500">No orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 text-left">Order ID</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Total</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} className="border-b">
                      <td className="py-2 px-4">{order._id}</td>
                      <td className="py-2 px-4">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}</td>
                      <td className="py-2 px-4">${order.total}</td>
                      <td className="py-2 px-4">{order.status || 'Processing'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 