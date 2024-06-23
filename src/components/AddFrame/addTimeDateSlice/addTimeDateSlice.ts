import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const addTimeDateSlice = createSlice({
   name: '@@add-time',
   initialState: '',
   reducers: {
      setAddTimeDate: (_, action: PayloadAction<string>) => action.payload
   }
});

export const { setAddTimeDate } = addTimeDateSlice.actions;
export const addTimeDateReducer = addTimeDateSlice.reducer;