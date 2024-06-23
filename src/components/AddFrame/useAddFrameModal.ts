import { useSelector } from "react-redux";
import { selectAddFrameModal } from "./selectAddFrameModal";
import { setAddModalFrame } from "./addFrameModalSlice";
import { useAppDispatch } from "store";

export const useAddChangeFrameModal = (): [boolean, (value: boolean) => void] => {
   const dispatch = useAppDispatch();
   const addModalStatus = useSelector(selectAddFrameModal);

   const changeAddModal = (value: boolean) => {
      dispatch(setAddModalFrame(value));
   }

   return [addModalStatus, changeAddModal]
}