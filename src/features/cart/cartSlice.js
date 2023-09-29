import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // cart: [],

  cart: [
    {
      pizzaId: 12,
      name: 'Meditteranean',
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
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
