
import { useCallback, useState } from 'react';

import AuthForm from 'components/AuthForm/AuthForm';

import logo from 'assets/img/Logo.png';
import { selectUsersInfo } from '../MainPage/userSelector';
import { useSelector } from 'react-redux';

import { GridLoader } from 'react-spinners';

import './authPage.css';


const AuthPage = () => {
   const { status, error } = useSelector(selectUsersInfo);

   const renderItem = useCallback(() => {
      switch (status) {
         case 'idle':
            return <div className="auth-page-main">
            <img src={logo}
               alt="Logo"
               className="logo" />
            <div className="auth-form-wrapper">
               <h1>Вход в Sirius Future</h1>
               <AuthForm />
               <div className="registration">
                  <span>Нет аккаунта?</span>
                  <span id='reg'>Зарегистрироваться</span>
               </div>
               <div className="language">
                  <span className='active'>RU</span> <span>EN</span>
               </div>
            </div>
         </div>
            break
         case 'loading':
            return <GridLoader
               color='#decfff'
               size={50} />
         case 'received':
            return <div className="auth-page-main">
               <img src={logo}
                  alt="Logo"
                  className="logo" />
               <div className="auth-form-wrapper">
                  <h1>Вход в Sirius Future</h1>
                  <AuthForm />
                  <div className="registration">
                     <span>Нет аккаунта?</span>
                     <span id='reg'>Зарегистрироваться</span>
                  </div>
                  <div className="language">
                     <span className='active'>RU</span> <span>EN</span>
                  </div>
               </div>
            </div>
            break;
         case 'rejected':
            return <h2>Error</h2>
            break;
         default:
            return <h2>Error</h2>
      }
   }, [status])

   const element = renderItem();

   return (
      <div className={'auth-page'}>
         {element}
      </div>
   );
}

export default AuthPage;