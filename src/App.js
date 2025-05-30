import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Pets from './pages/Pets';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import FeatureHighlights from './components/FeatureHighlights';
import Footer from './components/Footer';
import { Box } from '@mui/material';
import AnnouncementBar from './components/AnnouncementBar';
import DogFoodDropdown from './pages/DogFoodDropdown';
import CatFoodDropdown from './pages/CatFoodDropdown';
import RabbitFoodDropdown from './pages/RabbitFoodDropdown';
import ToysDropdown from './pages/ToysDropdown';
import BeltsAndCagesDropdown from './pages/BeltsAndCagesDropdown';
import DashboardLayout from './components/DashboardLayout';
import BuyerDashboardHome from './pages/dashboard/BuyerDashboardHome';
import SellerDashboardHome from './pages/dashboard/SellerDashboardHome';
import AdminDashboardHome from './pages/dashboard/AdminDashboardHome';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B', // Coral red from Figma
      light: '#FF8E8E',
      dark: '#E64A4A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4ECDC4', // Turquoise from Figma
      light: '#71D7D0',
      dark: '#2BB3A9',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7F7F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <AnnouncementBar />
                <Navbar />
                <Box sx={{ minHeight: '80vh' }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/pets" element={<Pets />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/dog-food" element={<DogFoodDropdown />} />
                    <Route path="/cat-food" element={<CatFoodDropdown />} />
                    <Route path="/rabbit-food" element={<RabbitFoodDropdown />} />
                    <Route path="/toys" element={<ToysDropdown />} />
                    <Route path="/belts-and-cages" element={<BeltsAndCagesDropdown />} />
                    <Route path="/dashboard" element={<DashboardLayout />}>
                      <Route index element={<BuyerDashboardHome />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="orders" element={<div>Orders Page</div>} />
                      <Route path="users" element={<AdminDashboardHome />} />
                    </Route>
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="orders" element={<div>Orders Management</div>} />
                      <Route path="products" element={<div>Products Management</div>} />
                      <Route path="users" element={<div>Users Management</div>} />
                      <Route path="analytics" element={<div>Analytics</div>} />
                      <Route path="settings" element={<div>Settings</div>} />
                    </Route>
                  </Routes>
                </Box>
                <FeatureHighlights />
                <Footer />
              </Router>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
