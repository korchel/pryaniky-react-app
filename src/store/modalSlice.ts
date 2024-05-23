import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from ".";

interface IState {
  type: null | "edit" | "add" | "delete";
  id: null | string;
  open: boolean;
}

const initialState: IState = {
  type: null,
  id: null,
  open: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.id = payload.id;
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const getModalType = (state: RootStateType): string | null =>
  state.modalSlice.type;
export const getModalOpen = (state: RootStateType): boolean =>
  state.modalSlice.open;
export const getCurrentDataId = (state: RootStateType): string | null =>
  state.modalSlice.id;

export default modalSlice.reducer;
