import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: []
    },
    reducers: {
        setUser(state, action) {
            state.users.push(action.payload);
        },
        removeUser(state) {
            state.users = state.users.filter(user => user.id !== action.payload)
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;