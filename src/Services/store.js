import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userSlice from './slices/user';

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
})

setupListeners(store.dispatch);