import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: null,
        id: null,
        username: null
    },
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.username = action.payload.username;
        },
        removeUser(state) {
            state.email = null;
            state.id = null;
            state.username = null;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;