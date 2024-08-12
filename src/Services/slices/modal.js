import { createSlice } from "@reduxjs/toolkit";
const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalData: null,
  },
  reducers: {
    setModal(state, action) {
      state.modalData = action.payload;
    },
    clearModal(state) {
      state.modalData = {};
    },
  },
});
export const { setModal, clearModal } = modalSlice.actions;
export default modalSlice.reducer;
