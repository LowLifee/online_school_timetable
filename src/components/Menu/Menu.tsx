import { useCallback, useEffect, useState } from 'react';
import { useMenu } from './useMenu';
import { MouseEvent } from 'react';



import logoIcon from 'assets/img/icons/logo.png';
import logoTextIcon from 'assets/img/icons/logo_text.png';
import homeIconWhite from 'assets/img/icons/home_logo_white.svg';
import homeIconBlue from 'assets/img/icons/home_logo_blue.svg';
import timetableIconWhite from 'assets/img/icons/timetable_logo_white.svg';
import timetableIconBlue from 'assets/img/icons/timetable_logo_blue.svg'
import payIconBlue from 'assets/img/icons/pay_logo_blue.svg';
import achievementsIconBlue from 'assets/img/icons/achivment_logo_blue.svg';
import trainingIconBlue from 'assets/img/icons/trainning_logo_blue.svg';
import libraryIconBlue from 'assets/img/icons/lib_logo_blue.svg';
import connectCheckingIconBlue from 'assets/img/icons/connection_settings_blue.svg';
import settingsIconBlue from 'assets/img/icons/settings_logo_blue.svg';
import questionsIconBlue from 'assets/img/icons/questions_logo_blue.svg';
import giftIcon from 'assets/img/icons/gift_illustration.png';

import './menu.css';

const Menu = () => {

   const [menu, chooseMenu] = useMenu();
   const lists = document.querySelectorAll('.menu-list');
   const [selected, setSelected] = useState<string | null>('')

   const onChooseMenu = useCallback((e: MouseEvent<HTMLLIElement>) => {
      const dataAtt = (e.target as HTMLLIElement).getAttribute('data-selected') as typeof menu;
      if (dataAtt) {
         chooseMenu(dataAtt);
         lists.forEach(li => {
            li.classList.remove('menu-active');
            if (dataAtt === li.getAttribute('data-selected')) {
               li.classList.add('menu-active');
            }
         })
      }
   }, [menu, selected]);

   useEffect(() => {
      setSelected(menu)
   }, [menu])

   return (
      <div className="menu">
         <div className="menu-logo">
            <img src={logoIcon} alt="Logo" id='menu-logo-img' />
            <img src={logoTextIcon} alt="Logo text" id='menu-text-img' />
         </div>
         <ul className='menu-list-wrapper'>
            <li className='menu-list menu-active'
               onClick={(e) => onChooseMenu(e)}
               data-selected="Home">
               <img src={selected === 'Home' ? homeIconWhite : homeIconBlue} alt="Home" data-img="Home" />
               <span data-selected="Home">Главная</span>
            </li>
            <li className='menu-list'
               onClick={(e) => onChooseMenu(e)}
               data-selected="timetable"
            ><img src={selected === 'timetable' ? timetableIconWhite : timetableIconBlue} alt="Timetable" data-selected="timetable" /><span data-selected="timetable">Расписание</span></li>
            <li className='menu-list'><img src={payIconBlue} alt="Pay" /><span>Оплата</span></li>
            <li className='menu-list'><img src={achievementsIconBlue} alt="Achievements" /><span>Достижение</span></li>
            <li className='menu-list'><img src={trainingIconBlue} alt="Training" /><span>Тренажеры</span></li>
            <li className='menu-list'><img src={libraryIconBlue} alt="Library" /><span>Библиотека</span></li>
            <li className='menu-list'><img src={connectCheckingIconBlue} alt="Check connection" /><span>Проверка связи</span></li>
            <li className='menu-list'><img src={settingsIconBlue} alt="Settings" /><span>Настройки</span></li>
            <li className='menu-list'><img src={questionsIconBlue} alt="Questions" /><span>Вопросы</span></li>
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