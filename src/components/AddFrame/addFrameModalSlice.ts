import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const addFrameModalSlice = createSlice({
   name: '@@add-modal',
   initialState: false,
   reducers: {
      setAddModalFrame: (state, action: PayloadAction<boolean>) => {
         return action.payload
      }
   }
})

export const { setAddModalFrame } = addFrameModalSlice.actions;
export const addModalReducer = addFrameModalSlice.reducer;