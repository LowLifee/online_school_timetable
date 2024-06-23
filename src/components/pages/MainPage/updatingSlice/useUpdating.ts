import { useSelector } from "react-redux";
import { selectUpdating } from "./selectUpdating";
import { setUpdating } from "./updatingSlice";
import { useAppDispatch } from "store";

export const useUpdating = (): [boolean, (value: boolean) => void] => {
   const dispatch = useAppDispatch();
   const isUpdate = useSelector(selectUpdating);

   const handleUpdating = (value: boolean) => {
      dispatch(setUpdating(value));
   }

   return [isUpdate, handleUpdating]
}