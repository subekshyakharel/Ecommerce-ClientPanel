import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/category/categorySlice.js";
import productReducer from "../features/product/productSlice.js";
import userReducer from "../features/user/userSlice.js";
import cartReducer from "../features/cart/Cartslice.js";
import wishlistReducer from "../features/wishlist/wishlistSlice.js";
import orderReducer from "../features/order/orderSlice.js";
import systemReducer from "../features/system/systemSlice.js";
import reviewReducer from "../features/review/reviewSlice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const orderPersistConfig = {
  key: "order",
  storage,
};

const rootReducer = combineReducers({
  userInfo: userReducer,
  categoryInfo: categoryReducer,
  productInfo: productReducer,
  systemInfo: systemReducer,
  reviewInfo: reviewReducer,
  orderInfo: persistReducer(orderPersistConfig, orderReducer),
  cartInfo: persistReducer(cartPersistConfig, cartReducer),
  wishlistInfo: persistReducer(wishlistPersistConfig, wishlistReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
