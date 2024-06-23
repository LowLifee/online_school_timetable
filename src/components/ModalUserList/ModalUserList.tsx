import { useCallback, useEffect, useState } from 'react';
import { useCloseModal } from './useSwitchModal';
import { useHttpHook } from 'httpHook/useHttpHook';
import { useCurrUser } from 'components/pages/MainPage/currentUserSlice/useCurrUser';
import CustomLink from 'components/CustomLink/CustomLink';

import { UserEmails } from 'types';

import userAvatar from 'assets/img/user_avatar.png';
import userAvatar2 from 'assets/img/anna_avatar.png';
import exitIcon from 'assets/img/exit.png';
import poligon from 'assets/img/Polygon_2.png';

import './modalUserList.css';


const ModalUserList = () => {
   const [modalStatus, toggleTheme] = useCloseModal();
   const [usersId, setUsersId] = useState<string[] | null>(null);
   const [allUsers, setAllUsers] = useState<UserEmails[] | null>(null);
   const { getAllUsers } = useHttpHook();
   const [currentUserId, setCurrentUserId] = useCurrUser();
   let modalActive = modalStatus ? 'modal-active' : '';

   useEffect(() => {
      const id: string[] = [];
      getAllUsers()
         .then((res: UserEmails[]) => {
            setAllUsers(res);
            res.forEach(item => {
               id.push(item.id);
            })
         });
      if (id.length > 0) {
         setUsersId(id);
      }
   }, [modalStatus, currentUserId]);

   const toggleUsers = useCallback((email: string) => {
      setCurrentUserId(email);
   }, [currentUserId, modalStatus])

   const renderItem = useCallback((list: typeof allUsers) => {
      if (list) {
         const elem = list.map(item => {
            const classes = item.id === currentUserId ? "modal-active-user" : '';

            return <li
               className={`modal-user-lists ${classes}`}
               onClick={() => toggleUsers(item.email)}>
               <img src={item.img} alt="User avatar" />
               <div className="modal-user-info">
                  <span className='modal-user-name'>{item.name}</span>
                  {item.id === currentUserId ? <span id='modal-active-user'>Это вы</span> : ''}
               </div>
            </li>
         })
         return elem;
      } else {
         return '';
      }
   }, [usersId, modalStatus, currentUserId]);

   const element = renderItem(allUsers);

   return (
      <div className={`modal-user-list ${modalActive}`}>
         <i><img src={poligon} alt="#" /></i>
         <span id='modal-close-cross-btn' onClick={toggleTheme}>&times;</span>
         <h2>Смена пользователя</h2>
         <ul className="user-list">
            {element}
         </ul>
         <div className="modal-exit">
            <button className="exit-btn">Выход</button>
            <img src={exitIcon} alt="Exit" id='exit-icon' />
         </div>
      </div>
   )
}

export default ModalUserList;