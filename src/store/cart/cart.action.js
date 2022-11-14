import { createAction } from '../../utils/reducer/reducer.util';
import { CART_ACTION_TYPES } from './cart.types';

// CART ACTION HELPER FUNCTIONS
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

// CART ACTIONS
export const setIsCartOpen = (isCartOpen) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);
};

export const addProductToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeProductFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearProductFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
