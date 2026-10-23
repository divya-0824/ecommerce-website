
import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
} from 'redux-persist';

import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';

const storage = {
  getItem: (key) =>
    Promise.resolve(window.localStorage.getItem(key)),

  setItem: (key, value) =>
    Promise.resolve(window.localStorage.setItem(key, value)),

  removeItem: (key) =>
    Promise.resolve(window.localStorage.removeItem(key)),
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'wishlist'],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
