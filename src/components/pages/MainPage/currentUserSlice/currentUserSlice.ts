import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrUser } from "types";

const currentUserSlice = createSlice({
   name: '@@currentUser',
   initialState: '' as CurrUser,
   reducers: {
      setActiveUser: (state, action: PayloadAction<CurrUser>) => action.payload
   }
})

export const { setActiveUser } = currentUserSlice.actions;
export const currUserReducer = currentUserSlice.reducer;