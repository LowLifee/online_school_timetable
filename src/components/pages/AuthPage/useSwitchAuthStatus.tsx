import { useSelector, useDispatch } from "react-redux";

import { switchEnter, Enter } from "./authSlice";
import { selectAuthStatus } from "./authSelector";

export const useSwitchAuthStatus = (): [Enter, (value: boolean) => void] => {

   const dispatch = useDispatch();
   const authStatus = useSelector(selectAuthStatus);

   const accessEnter = (value: boolean) => {
      dispatch(switchEnter(value));
   }

   return [authStatus, accessEnter]
}