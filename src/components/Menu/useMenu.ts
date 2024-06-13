import { useSelector, useDispatch } from "react-redux";
import { selectMenu } from "./menuSelector";
import { setMenu } from "./menuSlice";
import { Menu } from "types";


export const useMenu = (): [Menu, (value: Menu) => void] => {

   const menu = useSelector(selectMenu);
   const dispatch = useDispatch();

   const chooseMenu = (value: Menu) => {
      dispatch(setMenu(value))
   }

   return [menu, chooseMenu]
}