import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  clearProductFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  // if product exists, increase quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // add product to cartItems if doesn't exist
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // remove the product from cartItems if quantity = 1
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(({ id }) => cartItemToRemove.id !== id);
  }

  // decrease product quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(({ id }) => cartItemToClear.id !== id);
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // compute cart total quantity
  useEffect(() => {
    const cartTotalCount = cartItems.reduce(
      (totalCount, cartItem) => totalCount + cartItem.quantity,
      0
    );

    setCartCount(cartTotalCount);
  }, [cartItems]);

  // compute cart total price
  useEffect(() => {
    const cartTotalPrice = cartItems.reduce(
      (totalCount, cartItem) => totalCount + cartItem.quantity * cartItem.price,
      0
    );

    setCartTotal(cartTotalPrice);
  }, [cartItems]);

  const addProductToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeProductFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearProductFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartCount,
    cartTotal,
    addProductToCart,
    removeProductFromCart,
    clearProductFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
