import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userReducer } from "components/pages/MainPage/userSlice";
import { menuReducer } from "components/Menu/menuSlice";

import { modalSwitchReducer } from "./components/ModalUserList/modalSwitchSlice";
import { authReducer } from "components/pages/AuthPage/authSlice";
import { currUserReducer } from "components/pages/MainPage/currentUserSlice/currentUserSlice";
import { nextLessonReducer } from "components/TimetableInfo/nextLessonSlice";
import { sortedReduce } from "components/TimetableSubjectsSelect/sortSubject";


export const store = configureStore({
   reducer: {
      modalSwitch: modalSwitchReducer,
      authStatus: authReducer,
      users: userReducer,
      menu: menuReducer,
      current: currUserReducer,
      nextLesson: nextLessonReducer,
      sorted: sortedReduce
   },
   devTools: true,
   middleware: (getDefaulMiddleware) => getDefaulMiddleware({
      thunk: {
         extraArgument: {
            fetch,
         },
         serializableCheck: false
      }
   })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;