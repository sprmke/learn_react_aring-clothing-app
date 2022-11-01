import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addProductToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartTotalCount = cartItems.reduce(
      (totalCount, cartItem) => totalCount + cartItem?.quantity,
      0
    );

    setCartCount(cartTotalCount);
  }, [cartItems]);

  const addProductToCart = (productToAdd) => {
    const productIndex = cartItems.findIndex(
      (item) => item.id === productToAdd.id
    );

    if (productIndex < 0) {
      // add product to cartItems if doesn't exist
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...productToAdd, quantity: 1 },
      ]);
    } else {
      // if product exists, increase quantity
      setCartItems((prevCartItems) => {
        return prevCartItems.map((cartItem) =>
          cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      });
    }
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addProductToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
