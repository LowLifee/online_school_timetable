import { useSelector } from 'react-redux';

import { loadUsers } from './userSlice';
import { selectUsersList } from './userSelector';

import { useAppDispatch } from 'store';
import { UserEmails } from 'types';


export const useGetUser = (): [UserEmails[], () => void] => {
   const dispatch = useAppDispatch();
   const allUsers = useSelector(selectUsersList);

   const getUSersAsync = async () => {
      dispatch(loadUsers());
   }

   return [allUsers, getUSersAsync]
}