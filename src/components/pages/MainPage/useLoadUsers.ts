import { useSelector } from 'react-redux';

import { loadUsers, updateUsers } from './userSlice';
import { selectUsersList } from './userSelector';

import { useAppDispatch } from 'store';
import { Lessons, UserEmails } from 'types';


export const useGetUser = (): [UserEmails[], () => void, (id: string, lessons: UserEmails) => void] => {
   const dispatch = useAppDispatch();
   const allUsers = useSelector(selectUsersList);

   const getUSersAsync = async () => {
      dispatch(loadUsers());
   }

   const updateList = async (id: string, lessons: UserEmails) => {
      dispatch(updateUsers({ userId: id, updateFields: lessons }))
   }

   return [allUsers, getUSersAsync, updateList]
}