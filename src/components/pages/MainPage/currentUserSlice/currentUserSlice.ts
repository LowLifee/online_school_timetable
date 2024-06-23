import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
   name: '@@currentUser',
   initialState: '',
   reducers: {
      setActiveUser: (state, action: PayloadAction<string>) => action.payload
   }
})

export const { setActiveUser } = currentUserSlice.actions;
export const currUserReducer = currentUserSlice.reducer;