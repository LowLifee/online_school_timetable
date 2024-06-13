import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Enter = boolean | null;

const authSlice = createSlice({
   name: '@@authSlice',
   initialState: null as Enter,
   reducers: {
      switchEnter: (state, action: PayloadAction<Enter>) => action.payload
   }
});


export const { switchEnter } = authSlice.actions;
export const authReducer = authSlice.reducer;