import { Routes, Route } from 'react-router-dom';
import { useSwitchAuthStatus } from '../AuthPage/useSwitchAuthStatus';


import AuthPage from '../AuthPage/AuthPage';
import MainContent from 'components/MainContent/MainContent';

import { useGetUser } from './useLoadUsers';

import './mainPage.css';
import { useEffect, Fragment } from 'react';


const MainPage = () => {

   const [authStatus] = useSwitchAuthStatus();
   const [allUsers, getUSersAsync] = useGetUser();

   useEffect(() => {
      getUSersAsync();
   }, []);

   return (
      <Routes>
         {authStatus ? <>
            <Route path='/main' element={<MainContent />} />
         </> : <><Route path='/' element={<AuthPage />} /></>}
      </Routes>
   )
};

export default MainPage;