import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { setSorted } from "./sortSubjectSlice";
import { selectSorted } from "./sortedSelector";
import { SortedSubject } from "types";

export const useSorted = (): [string, (value: SortedSubject) => void] => {
   const sorted = useSelector(selectSorted),
      dispatch = useAppDispatch();

   const sortSubject = (value: SortedSubject) => {
      dispatch(setSorted(value));
   }
   return [sorted, sortSubject]
}