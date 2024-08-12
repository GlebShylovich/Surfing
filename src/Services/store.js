import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userSlice from "./slices/user";
import filterSlice from "./slices/filter";
import modalSlice from "./slices/modal"

export const store = configureStore({
  reducer: {
    user: userSlice,
    filter: filterSlice,
    modal: modalSlice
  },
});

setupListeners(store.dispatch);
