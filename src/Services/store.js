import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const store = configureStore({
    reducer: {},
})

setupListeners(store.dispatch);