import { useSelector } from 'react-redux';
import { loadUsers, updateUsers, deleteSubject } from './userSlice';
import { useUpdating } from './updatingSlice/useUpdating';
import { selectUsersList } from './userSelector';
import { useAppDispatch } from 'store';

import { UserEmails } from 'types';


export const useGetUser = (): [
   UserEmails[],
   () => void,
   (id: string, lessons: UserEmails) => void,
   (id: string, lessons: UserEmails) => void,
   (id: string) => void
] => {
   const dispatch = useAppDispatch();
   const allUsers = useSelector(selectUsersList);
   const [_, handleUpdating] = useUpdating();

   const getUSersAsync = async () => {
      dispatch(loadUsers());
   }

   const updateList = async (id: string, lessons: UserEmails) => {
      dispatch(updateUsers({ userId: id, updateFields: lessons }));
      handleUpdating(true)
   }

   const deleteSbj = async (id: string) => {
      dispatch(deleteSubject({ userId: id }));
   }

   const editData = async (id: string, lessons: UserEmails) => {
      //deleteSbj(id);
      updateList(id, lessons)
      //getUSersAsync();
   }

   return [allUsers!, getUSersAsync, updateList, editData, deleteSbj];
};

