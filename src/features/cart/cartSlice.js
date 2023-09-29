import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  // cart: [],

  cart: [
    // {
    //   pizzaId: 12,
    //   name: 'Meditteranean',
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      const updateItem = state.cart.find(
        (pizza) => pizza.id === action.payload,
      );
      updateItem.quantity += 1;
      updateItem.totalPrice = updateItem.quantity * updateItem.unitPrice;
    },
    decreaseQuantity(state, action) {
      const updateItem = state.cart.find(
        (pizza) => pizza.id === action.payload,
      );
      if (updateItem.quantity !== 0) updateItem.quantity -= 1;
      updateItem.totalPrice = updateItem.quantity * updateItem.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  clearCart,
  deleteItem,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = createSelector(
  (store) => store.cart.cart,
  (cart) => cart,
);

export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

/**
 * Retrieves the current quantity of a pizza in the cart by its ID.
 *
 * @param {number} id - The ID of the pizza.
 * @returns {(store: typeof initialState) => number|undefined} - The quantity of the pizza with the specified ID,
 *   or undefined if the pizza is not found in the cart.
 */
export const getQuantityById = (id) => (store) =>
  store.cart.cart.find((pizza) => pizza.pizzaId === id)?.quantity;
