import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { firebaseConfig } from "@core";

export let storage: firebase.storage.Storage;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  storage = firebase.storage();
}

export interface StorageState {}

const initialState: StorageState = {};

const StorageSlice = createSlice({
  name: "storage",
  initialState: initialState,
  reducers: {},
});

export const {} = StorageSlice.actions;
export const storageReducer = StorageSlice.reducer;
