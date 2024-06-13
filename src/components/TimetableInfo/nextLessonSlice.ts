import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export const nextLessonSlice = createSlice({
   name: '@@nextLesson',
   initialState: '',
   reducers: {
      setNextLesson: (state, action: PayloadAction<string>) => {
         return action.payload
      }
   }
})

export const { setNextLesson } = nextLessonSlice.actions;
export const nextLessonReducer = nextLessonSlice.reducer;