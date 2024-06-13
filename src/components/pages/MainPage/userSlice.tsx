import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Status, UserEmails } from "types";



export const loadUsers = createAsyncThunk(
   'users/load-users',
   async (_, {
      rejectWithValue
   }) => {
      try {
         const res = (await fetch('http://localhost:3001/emails'))
         return await res.json();
      }
      catch (error) {
         if (error instanceof Error)
            return rejectWithValue(error.message);
         return rejectWithValue('Unknown error');

      }
   }
);


export type UserInfo = {
   status: Status,
   error: string | null,
   list: UserEmails[]
};

const initialState: UserInfo = {
   status: 'idle',
   error: null,
   list: [
      {
         email: 'mixail@mail.ru',
         password: 'admin',
         id: '1',
         name: 'Михайл',
         img: 'assets/img/user_avatar.png',
         message_quantity: '0',
         lessons: [
            {
               subject: '',
               date: '2024-12-12',
               time: '',
               teacher: '',
               payed: false,
               missed: false,
               cancelled: false
            }
         ]
      }
   ]
}

export const userSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(loadUsers.pending, (state) => {
            state.status = 'loading';
            state.error = null;
         })
         .addCase(loadUsers.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = 'Cannot load data';
         })
         .addCase(loadUsers.fulfilled, (state, action) => {
            return { ...state, status: 'received', list: action.payload }
         })
   }
})

export const userReducer = userSlice.reducer;

