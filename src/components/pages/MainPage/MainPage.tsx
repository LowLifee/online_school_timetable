import { Routes, Route } from 'react-router-dom';
import { useSwitchAuthStatus } from '../AuthPage/useSwitchAuthStatus';
import { useCurrUser } from './currentUserSlice/useCurrUser';
import { useGetUser } from './useLoadUsers';
import { useUpdating } from './updatingSlice/useUpdating';

import AuthPage from '../AuthPage/AuthPage';
import MainContent from 'components/MainContent/MainContent';

import './mainPage.css';
import { useEffect, useState } from 'react';

const MainPage = () => {
   const [authStatus] = useSwitchAuthStatus();
   const [isUpdate] = useUpdating();
   const [allUsers, getUSersAsync] = useGetUser();
   const [activeUser] = useCurrUser();

   useEffect(() => {
      getUSersAsync();
   }, [isUpdate, activeUser]);

   return (
      <Routes>
         <Route path='/' element={<AuthPage />} />
         {authStatus ? <><Route path={`/user`} element={<MainContent />} /></> : ''}
      </Routes>
   )
};

export default MainPage;