
import { useCallback, useEffect, useState } from 'react';
import { useSwitchAuthStatus } from 'components/pages/AuthPage/useSwitchAuthStatus';
import CustomLink from 'components/CustomLink/CustomLink';
import { useSelector } from 'react-redux';
import { useCurrUser } from 'components/pages/MainPage/currentUserSlice/useCurrUser';


import { selectUsersList } from 'components/pages/MainPage/userSelector';

import { UserLog } from 'types/userLog';

import passwordIconHidden from 'assets/img/password_hidden_icon.png';
import './authForm.css';
import { UserEmails } from 'types';


const AuthForm = () => {


   const [userLog, setUserLog] = useState<UserLog | null>(null);
   const [login, setLogin] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const allUsers = useSelector(selectUsersList);

   const [authStatus, accessEnter] = useSwitchAuthStatus();
   const [activeUser, onSetActiveUser] = useCurrUser();

   const matchName = (value: string) => {
      const user = allUsers.find(item => item.email === value);
      return user;
   }

   const matchPassword = (password: string, user: UserEmails | undefined): boolean => {
      return user!.password === password;
   }

   const isUser = useCallback((value: string, password: string): boolean => {
      const email = matchName(value);
      let result = email ? matchPassword(password, email) : false;
      return result
   }, [])

   const onLog = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {

      const target = e.target;
      switch (e.target.getAttribute('name')) {
         case 'email':
            setLogin(target.value);
            break;
         case 'password':
            setPassword(target.value);
            break;
      }
   }, [login, password, allUsers])

   const onSubmit = useCallback((e: React.MouseEvent<HTMLAnchorElement>): void => {

      setUserLog({
         login,
         password
      });

      if (isUser(login, password)) {
         accessEnter(true);
         setLogin('');
         setPassword('');
      } else {
         accessEnter(false);
      }

   }, [login, password, authStatus]);

   useEffect(() => {
      if(login)
      onSetActiveUser(login);
   }, [login])

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
                  type="password"
                  name='password'
                  placeholder='Пароль'
                  required
                  onChange={(e) => onLog(e)}
                  value={password} />
               <i id='password-icon'><img src={passwordIconHidden} alt="Hide password" /></i>
            </div>
            <div className="checkbox-wrapper">
               <input
                  type="checkbox"
                  name='checkbox'
                  id='auth-checkbox' />
               <label htmlFor="auth-checkbox">Запомнить меня</label>
            </div>
         </div>
         <div className="auth-btn-wrapper">
            <CustomLink
               to={'/main'}
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