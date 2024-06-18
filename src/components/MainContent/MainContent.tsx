import { useEffect } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { useSelector } from 'react-redux';

import { useMenu } from 'components/Menu/useMenu';
import { useCurrUser } from 'components/pages/MainPage/currentUserSlice/useCurrUser';
import { selectUsersList } from 'components/pages/MainPage/userSelector';


import Menu from 'components/Menu/Menu';
import Header from 'components/Header/Header';
import TimetableInfo from 'components/TimetableInfo/TimetableInfo';


import './mainContent.css';


const MainContent = () => {
   const allUsers = useSelector(selectUsersList);
   const [currUserId, setCur] = useCurrUser();


   useEffect(() => {
      const localId = localStorage.getItem('user');
      if (localId) {
         setCur(localId)
      }

   }, [allUsers])

   const [menu] = useMenu();
   return (
      <Fragment>
         <Menu />
         <div className="main-content">
            <Header greating={menu === 'Home'} />
            <TimetableInfo />
         </div>
      </Fragment>
   )
}

export default MainContent;