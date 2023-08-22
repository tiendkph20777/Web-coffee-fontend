import { configureStore } from '@reduxjs/toolkit';
import { categoryAPI } from './services/category.service';
import { productAPI } from './services/product.service'; // Assuming you already have this imported
import { userAPI } from './services/user.service';
import cartApi from './services/cart.service';
import paymentReducer from '../src/pages/reducers/paymentSlice';



export const store = configureStore({
  reducer: {

    products: productAPI.reducer,
    categories: categoryAPI.reducer,
    users: userAPI.reducer,
    cart: cartApi.reducer,
    payment: paymentReducer,


  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(productAPI.middleware, categoryAPI.middleware, userAPI.middleware, cartApi.middleware),

},
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
