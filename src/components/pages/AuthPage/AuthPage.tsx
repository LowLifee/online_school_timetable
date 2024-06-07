

import Button from 'components/Button/Button';

import logo from 'assets/img/Logo.png';
import passwordIconHidden from 'assets/img/password_hidden_icon.png';

import './authPage.css';


const AuthPage = () => (
   <div className={'auth-page'}>
      <div className="auth-page-main">
         <img src={logo}
            alt="Logo"
            className="logo" />
         <div className="auth-form-wrapper">
            <h1>Вход в Sirius Future</h1>
            <form className="auth-page-form">
               <div className="auth-inputs-wrapper">

                  <div className="inputs">
                     <input
                        type="email"
                        name='email'
                        placeholder='E-mail' />
                  </div>
                  <div className="inputs">
                     <input
                        type="password"
                        name='password'
                        placeholder='Пароль' />
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
                  <Button children='Войти' />
                  <div className="entring-as">
                     <span>Я забыл пароль</span>
                     <span>Войти как тренер</span>
                  </div>
               </div>
            </form>
            <div className="registration">
               <span>Нет аккаунта?</span>
               <span id='reg'>Зарегистрироваться</span>
            </div>
            <div className="language">
               <span className='active'>RU</span> <span>EN</span>
            </div>
         </div>
      </div>
   </div>
);

export default AuthPage;