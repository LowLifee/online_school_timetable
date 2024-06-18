import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { error } from "console";
import { Status, UserEmails, Lessons } from "types";



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

export const updateUsers = createAsyncThunk<UserInfo, { userId: string, updateFields: UserEmails }>(
   'users/update-users',
   async (datas) => {
      try {
         const res = (await fetch(`http://localhost:3001/emails/${datas.userId}`, {
            method: "PATCH",
            headers: {
               'Content-type': 'application/json',
            },
            body: JSON.stringify(datas.updateFields)
         }));
         if (!res.ok) {
            throw new Error('Ошибка при обновлении пользователя');
         }
         return await res.json();
      }
      catch (error) {
         console.log(error);
      }
   }
);


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
               cancelled: false,
               id: '1'
            }
         ]
      }
   ]
}

//export type Updated = {
//   users: [];
//   status: 'idle' | 'loading' | 'rejected' | 'received';
//   error: null | 'Cannot load data'
//}

//const initial: Updated = {
//   users: [],
//   status: 'idle',
//   error: null,
//}

//export const userUpdateSlice = createSlice({
//   name: 'updated-users',
//   initialState: initial,
//   reducers: {},
//   extraReducers: (builder) => {
//      builder
//         .addCase(updateUsers.pending, (state) => {
//            state.status = 'loading';
//            error: null;
//         })
//         .addCase(updateUsers.rejected, (state) => {
//            state.status = 'rejected';
//            state.error = 'Cannot load data'
//         })
//         .addCase(updateUsers.fulfilled, (state, action) => {
//            state.status = 'received';
//            state.users = action.payload
//         })
//   }
//})




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

