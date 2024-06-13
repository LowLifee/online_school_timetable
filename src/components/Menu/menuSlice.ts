import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Menu } from "types";

export const menuSlice = createSlice({
   name: '@@menu',
   initialState: 'Home' as Menu,
   reducers: {
      setMenu: (state, action: PayloadAction<Menu>) => {
         return action.payload
      }
   }
});

export const { setMenu } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;