import { useSelector } from 'react-redux';
import { selectUsersList } from './userSelector';
import { useAppDispatch } from 'store';
import { setUser } from './userSlice';

import { UserEmails } from 'types';


export const useGetUser = (): [
   UserEmails[],
   (data: UserEmails[]) => void
] => {
   const dispatch = useAppDispatch();
   const allUsers = useSelector(selectUsersList);

   const handleSetUSers = (data: UserEmails[]) => {
      dispatch(setUser(data));
   }
   return [allUsers!, handleSetUSers];
};

