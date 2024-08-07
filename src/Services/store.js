import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userSlice from "./slices/user";
import filterSlice from "./slices/filter"

export const store = configureStore({
  reducer: {
    user: userSlice,
    filter: filterSlice
  },
});

setupListeners(store.dispatch);
