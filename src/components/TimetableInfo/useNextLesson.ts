import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { selectNextLesson } from "./nextLessonSelector";
import { setNextLesson } from "./nextLessonSlice";

export const useNextLesson = (): [string, (date: string) => void] => {
   const nextLesson = useSelector(selectNextLesson);
   const dispatch = useAppDispatch();

   const setNext = (date: string) => {
      dispatch(setNextLesson(date))
   }

   return [nextLesson, setNext]
}
