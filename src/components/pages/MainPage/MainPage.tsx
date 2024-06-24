import { Routes, Route } from 'react-router-dom';
import { useSwitchAuthStatus } from '../AuthPage/useSwitchAuthStatus';
import { useCurrUser } from './currentUserSlice/useCurrUser';
import { useGetUser } from 'slices/userSlice/useLoadUsers';
import { useUpdating } from './updatingSlice/useUpdating';

import AuthPage from '../AuthPage/AuthPage';
import MainContent from 'components/MainContent/MainContent';
import { data } from 'data';

import './mainPage.css';
import { useEffect, useMemo } from 'react';

const MainPage = () => {
   const [authStatus] = useSwitchAuthStatus();
   const [isUpdate] = useUpdating();
   const [allUsers, setAllUsers] = useGetUser();
   const [activeUser] = useCurrUser();

   useEffect(() => {
      setAllUsers(data)
   }, []);

   return (
      <Routes>
         <Route path='/' element={<AuthPage />} />
         {authStatus ? <><Route path={`/user`} element={<MainContent />} /></> : ''}
      </Routes>
   )
};

export default MainPage;