import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Gift, Present } from "@domain";
import { firestore } from "./storageReducer";

export interface ExchangeGiftState {
  exchangeGifts: Gift[];
  loading: boolean;
}

const initialState: ExchangeGiftState = {
  exchangeGifts: [],
  loading: false,
};

export const getAllExchangeGift = createAsyncThunk(
  "exchangeGift/getAllExchangeGift",
  async () => {
    let exchangeGifts: Gift[] = [];
    try {
      const snapshot = await firestore.collection("exchangeGift").get();
      exchangeGifts = snapshot.docs.map((doc) => {
        const data = doc.data() as Gift;
        const key = doc.id;
        return { ...data, key };
      });
      return exchangeGifts;
    } catch (error) {
      console.log("Error Get Exchange: ", error);
      return exchangeGifts;
    }
  }
);

const exchangeGiftSlice = createSlice({
  name: "exchangeGift",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllExchangeGift.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllExchangeGift.fulfilled, (state, action) => {
      state.loading = false;
      state.exchangeGifts = action.payload;
    });
    builder.addCase(getAllExchangeGift.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {} = exchangeGiftSlice.actions;
export const exchangeGiftReducer = exchangeGiftSlice.reducer;
