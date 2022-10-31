import { createContext, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addProductToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[productIndex].quantity++;
        return updatedCartItems;
      });
    }
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addProductToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
