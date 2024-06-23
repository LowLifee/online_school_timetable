import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch } from "store";
import { setActiveUser } from "./currentUserSlice";
import { selectActiveUser } from "./selectActiveUser";
import { selectUsersList } from "slices/userSlice/userSelector";

export const useCurrUser = (): [string, (email: string) => void] => {
   const activeUser = useSelector(selectActiveUser);
   const allUsers = useSelector(selectUsersList);

   const dispatch = useAppDispatch();

   const onSetActiveUser = (email: string) => {
      const users = allUsers?.find(item => item.email === email);
      if (users != undefined) {
         localStorage.clear();
         localStorage.setItem('email', email);
         localStorage.setItem('user', users.id);
         dispatch(setActiveUser(users.id));
      }
   }

   return [activeUser, onSetActiveUser]
}