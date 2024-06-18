import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SortedSubject } from "types";

export const sortedSubject = createSlice({
   name: '@@sortedSubject',
   initialState: 'Выберите предмет',
   reducers: {
      setSorted: (state, action: PayloadAction<string>) => {
         return action.payload
      }
   }
});

export const { setSorted } = sortedSubject.actions;
export const sortedReduce = sortedSubject.reducer;