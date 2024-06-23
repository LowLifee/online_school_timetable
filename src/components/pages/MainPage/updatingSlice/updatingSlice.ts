import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const updatingSlice = createSlice({
   name: '@@updating',
   initialState: false,
   reducers: {
      setUpdating: (_, action: PayloadAction<boolean>) => action.payload
   }
});

export const { setUpdating } = updatingSlice.actions;
export const updatingReducer = updatingSlice.reducer;