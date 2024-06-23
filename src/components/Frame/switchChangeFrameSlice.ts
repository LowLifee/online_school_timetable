import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const switchChangeFrameSlice = createSlice({
   name: '@@switch-change-frame',
   initialState: false,
   reducers: {
      setSwitchChangeFrame: (state, action: PayloadAction<boolean>) => action.payload
   }
})

export const { setSwitchChangeFrame } = switchChangeFrameSlice.actions;
export const switchChangeFrameReducer = switchChangeFrameSlice.reducer;