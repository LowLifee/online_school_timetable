import { useSelector } from "react-redux";
import { useAppDispatch } from "store";
import { selectSwitchFrame } from "./selectSwitchFrame";
import { setSwitchChangeFrame } from "./switchChangeFrameSlice";

export const useSwitchFrame = (): [boolean, (value: boolean) => void] => {
   const dispatch = useAppDispatch();
   const switchFrameStatus = useSelector(selectSwitchFrame);

   const switchStatus = (value: boolean) => {
      dispatch(setSwitchChangeFrame(value));
   }

   return [switchFrameStatus, switchStatus]
}