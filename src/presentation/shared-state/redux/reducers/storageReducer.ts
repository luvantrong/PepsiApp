import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { firebaseConfig } from "@core";

export let storage: firebase.storage.Storage;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  storage = firebase.storage();
}

export interface StorageState {
  storage: string[];
  loading: boolean;
}

const initialState: StorageState = {
  storage: [],
  loading: false,
};

export const getAllImageUrls = createAsyncThunk(
  "storage/getAllImageUrls",
  async () => {
    const result = await storage.ref().listAll();
    const imageRefs = result.items;
    const imageUrls = await Promise.all(
      imageRefs.map(async (imageRef) => {
        const imageUrl = await imageRef.getDownloadURL();
        return imageUrl;
      })
    );
    return imageUrls;
  }
);

const StorageSlice = createSlice({
  name: "storage",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllImageUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.storage = action.payload;
      })
      .addCase(getAllImageUrls.rejected, (state) => {
        state.loading = false;
        state.storage = [];
      })
      .addCase(getAllImageUrls.pending, (state) => {
        state.loading = true;
      });
  },
});

export const {} = StorageSlice.actions;
export const storageReducer = StorageSlice.reducer;
