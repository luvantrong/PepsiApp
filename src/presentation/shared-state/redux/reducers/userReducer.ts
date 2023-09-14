import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Gift, Present, User } from "@domain";
import { firestore } from "./storageReducer";
import React from "react";

export interface UserState {
  users: User[];
  loading: boolean;
  updateCoins: boolean;
  dataUsers: User;
}

const initialState: UserState = {
  users: [],
  loading: false,
  updateCoins: false,
  dataUsers: {} as User,
};

export const signUp = createAsyncThunk(
  "user/signUp",
  async (user: Omit<User, "key">) => {
    const docRef = await firestore.collection("users").add(user);
  }
);

export const getDataUserRedux = createAsyncThunk(
  "user/getDataUserRedux",
  async (phone: string) => {
    let userWithKey: User = {} as User;
    const docRef = await firestore
      .collection("users")
      .where("phone", "==", phone)
      .get();
    if (!docRef.empty) {
      const userDoc = docRef.docs[0];
      const user = userDoc.data();
      const key = userDoc.id;
      userWithKey = {
        key: key,
        name: user.name,
        phone: user.phone,
        coins: user.coins,
      };
    }
    return userWithKey;
  }
);

export interface DataUpdateCoins {
  key: string;
  coins: number;
}

export const updateCoins = createAsyncThunk(
  "user/updateCoins",
  async (dataUpdateCoins: DataUpdateCoins) => {
    const { key, coins } = dataUpdateCoins;
    const docRef = await firestore
      .collection("users")
      .doc(key)
      .update({ coins });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCoins.pending, (state, action) => {
        state.updateCoins = false;
      })
      .addCase(updateCoins.fulfilled, (state, action) => {
        state.updateCoins = true;
      })
      .addCase(updateCoins.rejected, (state, action) => {
        state.updateCoins = false;
      })
      .addCase(getDataUserRedux.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDataUserRedux.fulfilled, (state, action) => {
        state.loading = false;
        state.dataUsers = action.payload;
      })
      .addCase(getDataUserRedux.rejected, (state, action) => {
        state.loading = true;
      });
  },
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
