import { useSelector } from 'react-redux';
import { selectUsersList } from 'components/pages/MainPage/userSelector';
import { selectActiveUser } from 'components/pages/MainPage/currentUserSlice/selectActiveUser';
import { useNextLesson } from 'components/TimetableInfo/useNextLesson';

import Button from 'components/Button/Button';
import studentIcon from 'assets/img/student_icon.png';

import './shedule.css';
import { useCallback, useEffect } from 'react';
import { Lessons } from 'types';

const Sсhedule = () => {
   const [nextLesson, setNextLesson] = useNextLesson();

   const allUsers = useSelector(selectUsersList);
   const currentUserId = useSelector(selectActiveUser);

   const currentUser = allUsers.filter(item => item.id === currentUserId);

   let allSubjectDates: string[],
      dates: Date[],
      today: Date,
      nearestDates: Date[],
      nearestInString: string[] = [],
      userToRender: Lessons[] = [],
      formattedDate: string = '';

   if (allUsers && currentUser) {
      allSubjectDates = currentUser[0].lessons.map(lessonsInfo => {
         return lessonsInfo.date
      });

      // Преобразование дат в объекты Date
      dates = allSubjectDates.map(date => new Date(date));

      // Упорядочивание дат в порядке возрастания
      dates.sort((a: Date, b: Date) => a.getTime() - b.getTime());

      // Получение текущей даты
      today = new Date();

      // Нахождение ближайших трех дат
      nearestDates = dates.filter(date => date >= today).slice(0, 3);



      nearestDates.forEach((date, i) => {
         const dateString = date.toDateString();
         if (dateString) {
            const dateObject = new Date(dateString);
            const utcMilliseconds = dateObject.getTime() - dateObject.getTimezoneOffset() * 60000;
            const utcDateObject = new Date(utcMilliseconds);
            const isoDateString = utcDateObject.toISOString().split('T')[0];
            const formattedDateString = isoDateString.replace(/-/g, '.');
            nearestInString.push(formattedDateString);

            if (i === 0) {
               formattedDate = formattedDateString
            }
         }
      });

      currentUser[0].lessons.filter(lesson => {
         nearestInString.forEach(item => {
            if (item == lesson.date) {
               userToRender.push(lesson);
            }
         })

      });
   }

   useEffect(() => {
      setNextLesson(formattedDate);
   }, [formattedDate])

   const renderItem = useCallback((actualUser: Lessons[]) => {
      const months = ['Января', 'Фераля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

      const items = actualUser.map((item, i) => {

         const data = new Date(item.date);
         const day = data.getDate();
         const subjectMonth = data.getMonth();

         return <li className="shedule-info-lists" key={i}>
            <div className="shedule-detail">
               <div className="shedule-date">
                  <span className='shedule-day'>{day}</span>
                  <span className="shedule-month">{months[subjectMonth]}</span>
               </div>
               <div className="shedule-subject">{item.subject}</div>
            </div>
            <div className="shedule-time">
               <span className="shedule-hours">{item.time}</span>
               <div className="shedule-student">
                  <i><img src={studentIcon} alt="Student icon" /></i>
                  <span className='student-name'>{item.teacher}</span>
               </div>
            </div>
            <div className="shedule-btns">
               <Button children='button' color='white' />
               <Button children='button' color='purple' />
            </div>
         </li>
      });
      return items
   }, [allUsers])

   const element = renderItem(userToRender);


   return (
      <div className="shedule">
         <h2 className="shedule-title">Ближайшие уроки</h2>
         <div className="shedule-content">
            <ul className='shedule-list'>
               {element}
            </ul>
            <Button children='Button' width='344' color='violet' />
         </div>

      </div>
   )
}

export default Sсhedule;