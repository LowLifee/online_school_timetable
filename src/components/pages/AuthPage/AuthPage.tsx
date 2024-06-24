import AuthForm from 'components/AuthForm/AuthForm';

import logo from 'assets/img/icons/logo.png';

import './authPage.css';

const AuthPage = () => {
   return (
      <div className={'auth-page'}>
         <div className="auth-page-main">
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
      </div>
   );
}

export default AuthPage;