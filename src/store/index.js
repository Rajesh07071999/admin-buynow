import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './slices/adminSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice'
export const store = configureStore({
  reducer: {
    admin: adminReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    users : userReducer
  },
});
