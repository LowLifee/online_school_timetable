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
   list: UserEmails[] | null
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
   list: null
}

export const deleteSubject = createAsyncThunk<UserInfo, { userId: string }>(
   'users/delete-user',
   async (datas) => {
      try {
         const res = await fetch(`http://localhost:3001/emails/${datas.userId}`, {
            method: "DELETE",
            headers: { 'Content-type': 'application/json' },
         });
         if (!res.ok) {
            throw new Error('Ошибка при удалении пользователя')
         }
         return await res.json();
      }
      catch (error) {
         console.log(error);
      }
   }
)


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
         .addCase(deleteSubject.pending, (state) => {
            state.status = 'loading';
            state.error = null;
         })
         .addCase(deleteSubject.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = 'Ошибка при удалении пользователя';
         })
         .addCase(deleteSubject.fulfilled, (state, action) => {
            console.log(action.payload);
            state.status = 'received';
         })
   }
})

export const userReducer = userSlice.reducer;




//{
//   "emails": [
//     {
//       "email": "mixail@mail.ru",
//       "password": "admin",
//       "id": "1",
//       "name": "Михайл",
//       "img": "src/assets/img/user_avatar.png",
//       "message_quantity": "1",
//       "lessons": [
//         {
//           "subject": "Программирование",
//           "date": "2024.05.14",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": false,
//           "cancelled": false,
//           "id": "1"
//         },
//         {
//           "subject": "Программирование",
//           "date": "2024.06.09",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": true,
//           "cancelled": false,
//           "id": "11"
//         },
//         {
//           "subject": "Программирование",
//           "date": "2024.06.25",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": false,
//           "cancelled": false,
//           "id": "12"
//         },
//         {
//           "subject": "Программирование",
//           "date": "2024.06.06",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": false,
//           "cancelled": false,
//           "id": "2"
//         },
//         {
//           "subject": "Программирование",
//           "date": "2024.06.06",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": false,
//           "cancelled": false,
//           "id": "3"
//         },
//         {
//           "subject": "Скорочтение",
//           "date": "2024.06.08",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": true,
//           "cancelled": false,
//           "id": "4"
//         },
//         {
//           "subject": "Скорочтение",
//           "date": "2024.06.27",
//           "time": "11:00-11:11",
//           "teacher": "Козлова Алиса",
//           "payed": false,
//           "missed": false,
//           "cancelled": false,
//           "id": "5"
//         },
//         {
//           "subject": "Ментальная Арифметика",
//           "date": "2024.08.20",
//           "time": "09:00-09:45",
//           "teacher": "Ким Александр",
//           "payed": false,
//           "missed": false,
//           "cancelled": false,
//           "id": "6"
//         },
//         {
//           "subject": "Ментальная Арифметика",
//           "date": "2024.09.26",
//           "time": "01:00-01:45",
//           "teacher": "Ким Александр",
//           "payed": false,
//           "missed": false,
//           "cancelled": false,
//           "id": "7"
//         }
//       ]
//     },
//     {
//       "email": "anna@mail.ru",
//       "password": "admin",
//       "id": "2",
//       "name": "Анна",
//       "img": "src/assets/img/user_avatar.png",
//       "message_quantity": "1",
//       "lessons": [
//         {
//           "subject": "Программирование",
//           "date": "2024.05.14",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": false,
//           "cancelled": false,
//           "id": "1"
//         },
//         {
//           "subject": "Программирование",
//           "date": "2024.06.30",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": true,
//           "cancelled": false,
//           "id": "11"
//         },
//         {
//           "subject": "Программирование",
//           "date": "2024.06.18",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": false,
//           "cancelled": false,
//           "id": "12"
//         },
//         {
//           "subject": "Программирование",
//           "date": "2024.06.22",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": false,
//           "cancelled": false,
//           "id": "2"
//         },
//         {
//           "subject": "Программирование",
//           "date": "2024.06.27",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": false,
//           "cancelled": false,
//           "id": "3"
//         },
//         {
//           "subject": "Скорочтение",
//           "date": "2024.06.29",
//           "time": "14:00-14:25",
//           "teacher": "Львова Василиса",
//           "payed": true,
//           "missed": true,
//           "cancelled": false,
//           "id": "4"
//         },
//         {
//           "subject": "Скорочтение",
//           "date": "2024.06.18",
//           "time": "11:00-11:11",
//           "teacher": "Козлова Алиса",
//           "payed": false,
//           "missed": false,
//           "cancelled": false,
//           "id": "5"
//         },
//         {
//           "subject": "Ментальная Арифметика",
//           "date": "2024.08.13",
//           "time": "09:00-09:45",
//           "teacher": "Ким Александр",
//           "payed": false,
//           "missed": false,
//           "cancelled": false,
//           "id": "6"
//         },
//         {
//           "subject": "Ментальная Арифметика",
//           "date": "2024.09.26",
//           "time": "01:00-01:45",
//           "teacher": "Ким Александр",
//           "payed": false,
//           "missed": false,
//           "cancelled": false,
//           "id": "7"
//         }
//       ]
//     }
//   ]
// }