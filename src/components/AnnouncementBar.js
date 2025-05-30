import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const AnnouncementBar = () => {
  const { language, toggleLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    if (e.target.value === 'ur' && language === 'en') {
      toggleLanguage();
    } else if (e.target.value === 'en' && language === 'ur') {
      toggleLanguage();
    }
  };

  return (
    <div className="w-full bg-black text-white text-xs py-2 px-4 flex items-center justify-between">
      <div className="flex-1 flex justify-center">
        <span className="text-center">
          Winter Sale On Pet Products With Free Express Delivery - OFF 25%{' '}
          <Link to="/products" className="font-bold underline ml-1">ShopNow</Link>
        </span>
      </div>
      <div className="flex items-center ml-4">
        <select 
          className="bg-black text-white text-xs border-none focus:ring-0 cursor-pointer"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="ur">اردو</option>
        </select>
      </div>
    </div>
  );
};

export default AnnouncementBar; 