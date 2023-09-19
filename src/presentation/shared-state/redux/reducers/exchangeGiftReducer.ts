import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Gift } from "@domain";
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

export interface DataUpdateGift {
  key: string;
  quantity: number;
}

export const updateGift = createAsyncThunk(
  "exchangeGift/updateGift",
  async (dataUpdateGift: DataUpdateGift) => {
    const { key, quantity } = dataUpdateGift;
    const docRef = await firestore
      .collection("exchangeGift")
      .doc(key)
      .update({ quantity });
    return { quantity, key };
  }
);

const exchangeGiftSlice = createSlice({
  name: "exchangeGift",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllExchangeGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllExchangeGift.fulfilled, (state, action) => {
        state.loading = false;
        state.exchangeGifts = action.payload;
      })
      .addCase(getAllExchangeGift.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateGift.fulfilled, (state, action) => {
        state.loading = false;
        const { quantity, key } = action.payload;
        const index = state.exchangeGifts.findIndex((item) => item.key === key);
        if (index !== -1) {
          state.exchangeGifts[index].quantity = quantity;
        }
      })
      .addCase(updateGift.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = exchangeGiftSlice.actions;
export const exchangeGiftReducer = exchangeGiftSlice.reducer;
