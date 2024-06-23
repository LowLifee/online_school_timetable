import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { selectAddTimeDate } from "./selectAddTimedate";
import { setAddTimeDate } from "./addTimeDateSlice";

export const useAddTimeDate = (): [string, (date: string) => void] => {
   const dispatch = useAppDispatch();
   const addTimeDate = useSelector(selectAddTimeDate);

   const handleAddTimeDate = (date: string) => {
      dispatch(setAddTimeDate(date));
   }

   return [addTimeDate, handleAddTimeDate];
}