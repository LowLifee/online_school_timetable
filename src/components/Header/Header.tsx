
import { useSelector } from 'react-redux';
import { selectActiveUser } from 'components/pages/MainPage/currentUserSlice/selectActiveUser';
import { selectUsersList } from 'components/pages/MainPage/userSelector';

import chatIcon from 'assets/img/chat_icon.png';
import userAvatar from 'assets/img/user_avatar.png';
import userArrow from 'assets/img/user_arrow.png';
import './header.css';

import { useOpenModal } from 'components/ModalUserList/useSwitchModal';
import { useCallback } from 'react';

interface HeaderProps {
   greating: boolean;
}

const Header = ({ greating }: HeaderProps) => {

   const [modalStaus, toggleTheme] = useOpenModal();
   const currUser = useSelector(selectActiveUser);
   const allUsers = useSelector(selectUsersList);

   const sortedUser = allUsers.find(users => users.id === currUser);

   const renderItems = useCallback((user: typeof sortedUser) => {
      if (allUsers) {

         return (
            <div className="header">
               {greating ? <div className="greating"><h2>Добро пожаловать, <span>{user?.name}</span>!</h2></div> : ''}
               <div className="chat-users">
                  <span className='chat'>
                     <img src={chatIcon} alt="Chat" id='chat-icon' />
                     <span id='message'>{user?.message_quantity}</span>
                  </span>
                  <div className="user-choose">
                     <img src={userAvatar} alt="User" id='user-avatar' /> <img
                        src={userArrow}
                        alt="Arrow"
                        id='arrow'
                        onClick={toggleTheme} />
                  </div>
               </div>
            </div>
         )
      }

      return <h2>error</h2>
   }, [currUser, allUsers])

   const element = renderItems(sortedUser)

   return (
      <>
         {element}
      </>
   )
}

export default Header;