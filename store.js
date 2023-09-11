import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "../redux/features/auth/AuthSlice";
import sellerSlice from "./sellerSlice";
import orderSlice from "./orderSlice";
import wishlistSlice from "./wishlistSlice";
import eventSlice from "./eventSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


const allReducers = combineReducers({
  authReducer,
  sellerSlice,
  productSlice,
  eventSlice,
  cartSlice,
  wishlistSlice,
  orderSlice,
});

const mainStores = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const makeStore = () => {
  //  Check to confirm if we are on client side to persist, because we don't need to persist on server side
  const isServer = typeof window === "undefined";

  if (isServer) {
    return mainStores;
  } else {
    // We need to persist on client side

    const persistConfig = {
      key: "EmdoEmployer",
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, allReducers);

    let store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });

    store._persistor = persistStore(store);

    return store;
  }
};


const store = makeStore();
export default store;
