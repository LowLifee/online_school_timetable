import { Routes, Route } from 'react-router-dom';
import { useSwitchAuthStatus } from '../AuthPage/useSwitchAuthStatus';
import { useCurrUser } from './currentUserSlice/useCurrUser';


import AuthPage from '../AuthPage/AuthPage';
import MainContent from 'components/MainContent/MainContent';

import { useGetUser } from './useLoadUsers';

import './mainPage.css';
import { useEffect } from 'react';


const MainPage = () => {

   const [authStatus] = useSwitchAuthStatus();
   const [allUsers, getUSersAsync] = useGetUser();
   const [activeUser, setActiveUser] = useCurrUser();


   useEffect(() => {
      getUSersAsync();
   }, []);

   return (
      <Routes>
         <Route path='/' element={<AuthPage />} />
         <Route path={`/${activeUser}`} element={<MainContent />} />
      </Routes>
   )
};

export default MainPage;