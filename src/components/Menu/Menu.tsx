
import logoIcon from 'assets/img/Logo.png';
import logoTextIcon from 'assets/img/Logo_text.png';
import homeIcon from 'assets/img/Home.png';
import timetableIcon from 'assets/img/Timetable.png';
import payIcon from 'assets/img/pay.png';
import achievementsIcon from 'assets/img/Achievements.png';
import trainingIcon from 'assets/img/Training.png';
import libraryIcon from 'assets/img/Library.png';
import connectCheckingIcon from 'assets/img/Connect_checking.png';
import settingsIcon from 'assets/img/Settings.png';
import questionsIcon from 'assets/img/Questions.png';
import giftIcon from 'assets/img/gift_illustration.png';

import './menu.css';

const Menu = () => {

   return (
      <div className="menu">
         <div className="menu-logo">
            <img src={logoIcon} alt="Logo" id='menu-logo-img' />
            <img src={logoTextIcon} alt="Logo text" id='menu-text-img' />
         </div>
         <ul className='menu-list-wrapper'>
            <li className='menu-list menu-active'><img src={homeIcon} alt="Home" /><span>Главная</span></li>
            <li className='menu-list'><img src={timetableIcon} alt="Timetable" /><span>Расписание</span></li>
            <li className='menu-list'><img src={payIcon} alt="Pay" /><span>Оплата</span></li>
            <li className='menu-list'><img src={achievementsIcon} alt="Achievements" /><span>Достижение</span></li>
            <li className='menu-list'><img src={trainingIcon} alt="Training" /><span>Тренажеры</span></li>
            <li className='menu-list'><img src={libraryIcon} alt="Library" /><span>Библиотека</span></li>
            <li className='menu-list'><img src={connectCheckingIcon} alt="Check connection" /><span>Проверка связи</span></li>
            <li className='menu-list'><img src={settingsIcon} alt="Settings" /><span>Настройки</span></li>
            <li className='menu-list'><img src={questionsIcon} alt="Questions" /><span>Вопросы</span></li>
         </ul>
         <div className="referral">
            <div className="referral-descrption">
               <h2>Учитесь бесплатно</h2>
               <span>Приводите друзей с детьми заниматься в Sirius Future и получайте подарки!</span>
            </div>
            <button id='referral-btn'>Узнать</button>
            <img src={giftIcon} alt="Gift icon" id='gift-icon' />
         </div>
      </div>
   )
}

export default Menu;