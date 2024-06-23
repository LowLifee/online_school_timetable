import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserEmails } from "types";


export type UserInfo = {
   status: 'idle' | 'loading' | 'error' | 'received';
   users: UserEmails[] | null
};

const initialState: UserInfo = {
   status:'idle',
   users: null
}

type UpdateProps = {
   id: string;
   updateField: UserEmails[]
}

export const userSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      setUser: (state, aciton: PayloadAction<UserEmails[]>) => {
         return { ...state,users: aciton.payload }
      }
   },
})

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;