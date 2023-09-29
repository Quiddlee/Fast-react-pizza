import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './features/cart/cartSlice.js';
import userReducer from './features/user/userSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
