import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userSlice from "./slices/user";
import { loadState, saveState } from "../Common/localStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

setupListeners(store.dispatch);
