import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { storageReducer, exchangeGiftReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    storage: storageReducer,
    exchangeGift: exchangeGiftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
