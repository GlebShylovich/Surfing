import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        initialMinPrice: null,
        initialMaxPrice: null,
        minPrice: null,
        maxPrice: null
    },
    reducers: {
        setFilterParams(state, action) {
            return { ...state, ...action.payload };
        }
    }
})

export const { setFilterParams } = filterSlice.actions;
export default filterSlice.reducer;
