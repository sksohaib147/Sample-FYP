import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../logo.svg';
import { useLanguage, translations } from '../contexts/LanguageContext';

const Navbar = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <nav className="w-full bg-white shadow flex items-center px-4 py-2">
      {/* Logo */}
      <div className="flex items-center mr-8">
        <img src={logo} alt="Paws and Claws" className="h-10 w-auto mr-2" />
        <span className="font-bold text-lg tracking-wide">Paws and Claws</span>
      </div>
      {/* Nav Links */}
      <div className="flex-1 flex justify-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-primary font-medium">{t.home}</Link>
        <Link to="/pets" className="text-gray-700 hover:text-primary font-medium">{t.pets}</Link>
        <Link to="/products" className="text-gray-700 hover:text-primary font-medium">{t.products}</Link>
        <Link to="/signup" className="text-gray-700 hover:text-primary font-medium">{t.signup}</Link>
        <Link to="/about" className="text-gray-700 hover:text-primary font-medium">About</Link>
      </div>
      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        <Link to="/wishlist" className="text-gray-700 hover:text-primary"><FaHeart size={18} /></Link>
        <Link to="/cart" className="text-gray-700 hover:text-primary"><FaShoppingCart size={18} /></Link>
        <Link to="/profile" className="text-gray-700 hover:text-primary"><FaUser size={18} /></Link>
      </div>
    </nav>
  );
};

export default Navbar; 