import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Modal = boolean;

const modalSwitchSlice = createSlice({
   name: '@@modalSwitch',
   initialState: false as Modal,
   reducers: {
      switchModal: (state, action: PayloadAction<Modal>) => action.payload
   }
});

export const { switchModal } = modalSwitchSlice.actions;
export const modalSwitchReducer = modalSwitchSlice.reducer;