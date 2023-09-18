import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Cans, Gift, GiftOfMe, Present, Turn, User } from "@domain";
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
  dataUsers: {
    key: "",
    name: "",
    phone: "",
    coins: 0,
    cans: {
      blue: 0,
      green: 0,
      orange: 0,
    },
    turn: {
      free: 0,
      exchange: 0,
    },
    giftOfMe: [] as GiftOfMe[],
  },
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
        cans: {
          blue: user.cans.blue,
          green: user.cans.green,
          orange: user.cans.orange,
        },
        turn: {
          free: user.turn.free,
          exchange: user.turn.exchange,
        },
        giftOfMe: user.giftOfMe,
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
    return coins;
  }
);

export interface DataUpdateCansAndCoins {
  key: string;
  coins: number;
  cans: Cans;
}

export const updateCansAndCoins = createAsyncThunk(
  "user/updateCansAndCoins",
  async (dataUpdateCansAndCoins: DataUpdateCansAndCoins) => {
    const { key, coins, cans } = dataUpdateCansAndCoins;
    const docRef = await firestore
      .collection("users")
      .doc(key)
      .update({ coins, cans });
    return { cans, coins };
  }
);

export interface DataUpdateTurn {
  key: string;
  turn: Turn;
}

export const updateTurn = createAsyncThunk(
  "user/updateTurn",
  async (dataUpdateTurn: DataUpdateTurn) => {
    const { key, turn } = dataUpdateTurn;
    const docRef = await firestore
      .collection("users")
      .doc(key)
      .update({ turn });
    return turn;
  }
);

export interface DataUpdateGiftOfMe {
  key: string;
  data: User;
}

export const DataUpdateGiftOfMe = createAsyncThunk(
  "user/updateGiftOfMe",
  async (dataUpdateGiftOfMe: DataUpdateGiftOfMe) => {
    const { key, data } = dataUpdateGiftOfMe;
    const docRef = await firestore.collection("users").doc(key).update(data);
    return data;
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
        state.dataUsers.coins = action.payload;
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
      })
      .addCase(updateCansAndCoins.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCansAndCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.dataUsers.coins = action.payload.coins;
        state.dataUsers.cans = action.payload.cans;
      })
      .addCase(updateCansAndCoins.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateTurn.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateTurn.fulfilled, (state, action) => {
        state.loading = false;
        state.dataUsers.turn = action.payload;
      })
      .addCase(updateTurn.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(DataUpdateGiftOfMe.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(DataUpdateGiftOfMe.fulfilled, (state, action) => {
        state.loading = false;
        state.dataUsers = action.payload;
      })
      .addCase(DataUpdateGiftOfMe.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
