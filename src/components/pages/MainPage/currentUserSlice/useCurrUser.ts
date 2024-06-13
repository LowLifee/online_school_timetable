import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch } from "store";
import { setActiveUser } from "./currentUserSlice";
import { selectActiveUser } from "./selectActiveUser";
import { selectUsersList } from "../userSelector";

export const useCurrUser = (): [string, (value:string) => void] => {
   const activeUser = useSelector(selectActiveUser);
   const allUsers = useSelector(selectUsersList);

   const dispatch = useAppDispatch();

   const onSetActiveUser = (value: string) => {
      const users = allUsers.find(item => item.email === value);
      if (users)
         dispatch(setActiveUser(users.id))
   }

   return [activeUser, onSetActiveUser]
}