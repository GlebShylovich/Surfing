import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from "@reduxjs/toolkit/query/react";
import user from './slices/user';

export const store = configureStore({
    reducer: {
        user: user,
    },
})

setupListeners(store.dispatch);