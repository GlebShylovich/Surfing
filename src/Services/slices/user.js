import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        name: null,
        id: null
    },
    reducers: {
        setUser(state, action) {
            return { ...state, ...action.payload };
        },
        removeUser(state) {
            state.email = null;
            state.name = null;
            state.id = null;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
