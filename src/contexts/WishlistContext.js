import React, { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

const getWishlistFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
  } catch {
    return [];
  }
};

const setWishlistToStorage = (wishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(getWishlistFromStorage());

  useEffect(() => {
    setWishlistToStorage(wishlist);
  }, [wishlist]);

  const addToWishlist = (item) => {
    if (!wishlist.find((w) => w._id === item._id && w.type === item.type)) {
      setWishlist([...wishlist, item]);
    }
  };

  const removeFromWishlist = (id, type) => {
    setWishlist(wishlist.filter((w) => !(w._id === id && w.type === type)));
  };

  const toggleWishlist = (item) => {
    if (wishlist.find((w) => w._id === item._id && w.type === item.type)) {
      removeFromWishlist(item._id, item.type);
    } else {
      addToWishlist(item);
    }
  };

  const isInWishlist = (id, type) => {
    return wishlist.some((w) => w._id === id && w.type === type);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}; 