import { createContext, useEffect, useState } from 'react';
import SHOP_DATA from '../shop-data';
import { addCollectionAndDocuments } from '../utils/firebase/firebase.util';

export const ProductContext = createContext({
  products: [],
  setProducts: (products) => null,
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // save our shop dummy data to firebase fitrestore
    // addCollectionAndDocuments('categories', SHOP_DATA);
  }, []);

  const value = {
    products,
    setProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
