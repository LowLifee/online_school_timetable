
import { useEffect } from 'react';
import { useCloseModal } from './useSwitchModal';

import userAvatar from 'assets/img/user_avatar.png';
import userAvatar2 from 'assets/img/anna_avatar.png';
import exitIcon from 'assets/img/exit.png';
import poligon from 'assets/img/Polygon_2.png';

import './modalUserList.css';


const ModalUserList = () => {


   const [modalStatus, toggleTheme] = useCloseModal()

   let modalActive = modalStatus ? 'modal-active' : '';

   useEffect(() => {

   }, [modalStatus])

   return (
      <div className={`modal-user-list ${modalActive}`}>
         <i><img src={poligon} alt="#" /></i>
         <span id='modal-close-cross-btn' onClick={toggleTheme}>&times;</span>
         <h2>Смена пользователя</h2>

         <ul className="user-list">
            <li className="modal-user-lists modal-active-user">
               <img src={userAvatar} alt="User avatar" />
               <div className="modal-user-info">
                  <span className='modal-user-name'>Михаил</span>
                  <span id='modal-active-user'>Это вы</span>
               </div>
            </li>
            <li className="modal-user-lists">
               <img src={userAvatar2} alt="User avatar" />
               <div className="modal-user-info">
                  <span className='modal-user-name'>Анна</span>
               </div>
            </li>
         </ul>
         <div className="modal-exit">
            <button className="exit-btn">Выход</button>
            <img src={exitIcon} alt="Exit" id='exit-icon' />
         </div>
      </div>
   )
}

export default ModalUserList;