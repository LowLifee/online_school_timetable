
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useSwitchAuthStatus } from 'components/pages/AuthPage/useSwitchAuthStatus';
import CustomLink from 'components/CustomLink/CustomLink';
import { useCurrUser } from 'components/pages/MainPage/currentUserSlice/useCurrUser';


import { selectUsersList } from 'slices/userSlice/userSelector';

import { UserLog } from 'types/userLog';

import passwordIconHidden from 'assets/img/password_hidden_icon.png';
import passwordIconVisible from 'assets/img/password_visible_icon.png'
import './authForm.css';
import { UserEmails } from 'types';


const AuthForm = () => {

   const [userLog, setUserLog] = useState<UserLog | null>(null);
   const [login, setLogin] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const localEmail = localStorage.getItem('email');
   const [access, setAccess] = useState(false);
   const [passwordStatus, setPasswordStatus] = useState(false);
   const [remember, setRemember] = useState(false);

   const navigate = useNavigate();

   const allUsers = useSelector(selectUsersList);

   const [authStatus, accessEnter] = useSwitchAuthStatus();
   const [activeUser, onSetActiveUser] = useCurrUser();

   useEffect(() => {
      if (localEmail) {
         setLogin(localEmail);
      }
   }, []);

   useEffect(() => {
//console.log(allUsers, 'effect')
   }, [allUsers])

   const matchName = useCallback((value: string) => {
      const user = allUsers?.find(item => item.email === value);
      return user;
   }, [allUsers, login, password])

   const matchPassword = useCallback((password: string, user: UserEmails | undefined): boolean => {
      return user!.password === password;
   }, [allUsers, login, password]) 

   const isUser = useCallback((value: string, password: string): boolean => {
      const email = matchName(value);
      let result = email ? matchPassword(password, email) : false;
      return result
   }, [allUsers, login, password])

   const onLog = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
      const target = e.target;
      switch (e.target.getAttribute('name')) {
         case 'email':
            setLogin(target.value);
            break;
         case 'password':
            setPassword(target.value);
            break;
         case 'checkbox':
            setRemember(!remember);
      }
   }, [login, password, allUsers, remember, access])

   const onSubmit = useCallback((e: React.MouseEvent<HTMLAnchorElement>): void => {
      setUserLog({
         login,
         password
      });

      if (isUser(login, password)) {
         accessEnter(true);
         setAccess(true);

         if (remember) {
            localStorage.setItem('remember', `${login}`)
         }

         setLogin('');
         setPassword('');
      } else {
         accessEnter(false);
      }
   }, [login, password, authStatus, remember]);

   const onSubmitByKeydown = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Enter') {
         if (isUser(login, password)) {
            accessEnter(true);
            setAccess(true);
            localStorage.clear();
            localStorage.setItem('email', login);
            localStorage.setItem('user', activeUser);

            if (remember) {
               localStorage.setItem('remember', `${login}`)
            }

            setLogin('');
            setPassword('');
            if (access) {
               navigate(access ? `/user` : '');
            }
            setAccess(false);
         } else {
            accessEnter(false);
            console.log('false');
         }
      }
   }, [login, password, authStatus, activeUser, access, remember]);

   const togglePasswordStatus = useCallback(() => {
      setPasswordStatus(!passwordStatus);
   }, [passwordStatus])

   useEffect(() => {
      document.body.addEventListener('keydown', onSubmitByKeydown);
      return () => document.body.removeEventListener('keydown', onSubmitByKeydown);
   }, [login, password, authStatus, access]);

   useEffect(() => {
      if (login) {
         onSetActiveUser(login);
         if (isUser(login, password)) {
            setAccess(true);
         }
      }
   }, [login, password, authStatus]);

   return (
      <form
         className="auth-page-form">
         <div className="auth-inputs-wrapper">
            <div className="inputs">
               <input
                  type="email"
                  name='email'
                  placeholder='E-mail'
                  required
                  onChange={(e) => onLog(e)}
                  value={login} />
            </div>
            <div className="inputs">
               <input
                  type={passwordStatus ? "text" : "password"}
                  name='password'
                  placeholder='Пароль'
                  required
                  onChange={(e) => onLog(e)}
                  value={password} />
               <i id='password-icon'
                  onClick={togglePasswordStatus}>
                  <img src={passwordStatus ? passwordIconVisible : passwordIconHidden} alt="Hide password" />
               </i>
            </div>
            <div className="checkbox-wrapper">
               <input
                  type="checkbox"
                  name='checkbox'
                  id='auth-checkbox'
                  checked={remember}
                  onChange={(e) => onLog(e)} />
               <label htmlFor="auth-checkbox">Запомнить меня</label>
            </div>
         </div>
         <div className="auth-btn-wrapper">
            <CustomLink
               to={access ? '/user' : ''}
               className={'btn-form'}
               onClick={onSubmit}
               children='Войти'
            />
            <div className="entring-as">
               <span>Я забыл пароль</span>
               <span>Войти как тренер</span>
            </div>
         </div>
      </form>
   )
}

export default AuthForm;