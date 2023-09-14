import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { storageReducer, exchangeGiftReducer, userReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    storage: storageReducer,
    exchangeGift: exchangeGiftReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
