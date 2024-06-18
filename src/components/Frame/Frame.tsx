import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUser } from 'components/pages/MainPage/useLoadUsers';
import { selectUsersList } from 'components/pages/MainPage/userSelector';
import { selectSorted } from 'components/TimetableSubjectsSelect/sortedSelector';
import DaysList from 'components/DaysList/DaysList';
import Card from 'components/Card/Card';

import './frame.css';
import { Lessons, SubjectStatus } from 'types';
import { sortedSubject } from 'components/TimetableSubjectsSelect/sortSubject';

interface FrameProps {
   year: number;
   month: number;
}

interface CardProps {
   status: 'done' | 'todo';
   payed: boolean;
}

const Frame = ({ year, month }: FrameProps) => {
   const sortedSubject = useSelector(selectSorted);
   const [allUsers, getUSersAsync, updateList] = useGetUser();


   const [list] = useSelector(selectUsersList),
      daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];


   const [listOfSubjects, setList] = useState(list.lessons);
   const [dragging, setDragging] = useState<Lessons | null>(null);
   const [dragOverIndex, setDragOverIndex] = useState('');
   const listRef = useRef<HTMLDivElement>(null);
   const [container, setContainer] = useState('');
   const [dragged, setDragged] = useState<string | null>('');
   const [count, setCount] = useState(0);


   //drag

   useEffect(() => {

      const newData = { ...list, lessons: listOfSubjects };


      const userId = localStorage.getItem('user')

      if (dragging != null && userId) {
         //updateList(userId, newData);
         //getUSersAsync();
      }
   }, [container])

   const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {

      e.dataTransfer.setData("text/plain", JSON.stringify(e.currentTarget.dataset));
      e.dataTransfer.effectAllowed = 'move';
      if (listOfSubjects) {
         const dragging = listOfSubjects.find((item) => item.id === e.currentTarget.dataset?.id);
         if (dragging) {
            setDragging(dragging);
            setDragged(e.currentTarget.getAttribute('data-id'));//here
         }
      }

   }, [dragging, listOfSubjects, container, dragOverIndex, dragged])

   const handleDragOver = useCallback((e: React.DragEvent<HTMLLIElement>) => {
      e.preventDefault();

      const dragOverDay = e.currentTarget.getAttribute('data-date');
      if (dragOverDay) {
         setDragOverIndex(dragOverDay);
      }

   }, [dragged, dragging, dragOverIndex]);

   const handleDrop = useCallback((e: React.DragEvent<HTMLLIElement>) => {
      e.preventDefault();

      const draggedItem = JSON.parse(e.dataTransfer.getData("text/plain"));

      const container = e.currentTarget.getAttribute('data-date')

      if (container) {
         if (container.length > 0) {
            setContainer(container);
         }
      }
      const newList = listOfSubjects.map(item => {
         if (item.id == draggedItem.id) {
            const changedDatedDragging = { ...item, date: container };
            return { ...changedDatedDragging }
         } else {
            return item
         }
      })
      setList(newList as Lessons[]);
   }, [dragged, dragging, dragOverIndex, container]);


   //dates

   // Получаем первый день месяца
   const firstDay = new Date(year, month, 1).getDay();
   // Получаем количество дней в месяце
   const daysInMonth = new Date(year, month + 1, 0).getDate();
   // Получаем день недели для первого дня месяца
   const firstDayOfWeek = (firstDay === 0) ? 7 : firstDay;


   // Создаем массив с днями месяца
   const daysInCalendar: string[] = [];
   let currentDay = 1;
   // Получаем количество дней в предыдущем месяце
   const daysInPreviousMonth = new Date(year, month, 0).getDate();
   // Вычисляем, сколько дней нужно отобразить из предыдущего месяца
   const daysFromPreviousMonth = firstDayOfWeek - 1;
   // Заполняем дни из предыдущего месяца
   for (let i = 0; i < daysFromPreviousMonth; i++) {
      daysInCalendar.push((daysInPreviousMonth - daysFromPreviousMonth + 1 + i).toString());
   }

   // Заполняем дни текущего месяца
   for (let i = 0; i < daysInMonth; i++) {

      if (daysInCalendar.length >= 35) {
         break;
      }
      daysInCalendar.push(currentDay.toString());
      currentDay++;
   }



   const firstDayNextMonth = new Date(year, month, currentDay).getDay()
   const firstDayOfWeekNextMonth = firstDayNextMonth === 0 ? 7 : firstDayNextMonth;
   const daysInNextMonth = new Date(year, month, currentDay).getDate();
   const now = new Date();

   let isThereNextMonthsDays = true;
   const daysFromNextMonth = 7 - (firstDayOfWeekNextMonth - 1);
   for (let i = 0; i <= daysFromNextMonth; i++) {
      if (daysInCalendar.length >= 35) {
         isThereNextMonthsDays = i > 0;
         break;
      }
      daysInCalendar.push((i + 1).toLocaleString());
   }

   const endOfCurrMonth = isThereNextMonthsDays ? daysInCalendar.slice(0, -daysFromNextMonth) : [];

   const renderWeeks = useCallback((weekDays: string[]) => {
      const weekDay = weekDays.map((days, i) => {
         return <li>{days}</li>
      });
      return weekDay;
   }, []);


   let fullDate = ''
   let currentMonth = month + 1;
   let curYear = year;

   const renderLists = useCallback((calendarDays: string[], list: Lessons[]) => {

      const elem = calendarDays.map((item, i) => {

         const cards: React.ReactElement<CardProps>[] = [];
         if (currentMonth > 12) {
            currentMonth = 1;
            curYear++;
         }
         if (i < daysFromPreviousMonth && daysFromPreviousMonth > 0) {
            fullDate = `${year}.${+currentMonth - 1 <= 9 ? '0' + (+currentMonth - 1) : +currentMonth - 1}.${+item <= 9 ? '0' + item : item}`;
         } else if (i >= daysFromPreviousMonth) {
            if (isThereNextMonthsDays && i < endOfCurrMonth.length) {
               fullDate = `${year}.${+currentMonth <= 9 ? '0' + (currentMonth) : currentMonth}.${+item <= 9 ? '0' + item : item}`
            }
            if (!isThereNextMonthsDays) {
               fullDate = `${year}.${+currentMonth <= 9 ? '0' + (currentMonth) : currentMonth}.${+item <= 9 ? '0' + item : item}`;

            }
         }
         if (isThereNextMonthsDays && i >= endOfCurrMonth.length) {
            fullDate = `${curYear}.${+currentMonth + 1 <= 9 ? '0' + (currentMonth + 1) : (currentMonth + 1)}.${+item <= 9 ? '0' + item : item}`;

         }

         list.forEach((subjectsInfo, i) => {

            const targetDate = new Date(`${subjectsInfo.date} ${subjectsInfo.time}`);
            const timeDifference = targetDate.getTime() - now.getTime();
            const secondsRemaining = Math.floor(timeDifference / 1000);

            if (fullDate === subjectsInfo.date) {
               let status: SubjectStatus = 'canceled';
               if (subjectsInfo.cancelled) {
                  status = 'canceled';
               } else if (subjectsInfo.missed) {
                  status = 'past-not';
               } else if (+item < +subjectsInfo.date.slice(-2)) {
                  status = 'done';
               } else if (+subjectsInfo.date.slice(-2) === +item && i == daysFromPreviousMonth && !subjectsInfo.missed) {
                  status = 'todays-done';
               } else if (+subjectsInfo.date.slice(-2) === +item && i == daysFromPreviousMonth && subjectsInfo.missed) {
                  status = 'todays-canceled';
               } else if (secondsRemaining > 0) {
                  status = 'coming';
               }
               const key = ((Math.random() * 10000000) + 1).toFixed(3);
               cards.push(<Card
                  status={status}
                  payed={subjectsInfo.payed}
                  subjectName={subjectsInfo.subject}
                  time={subjectsInfo.time}
                  key={key}
                  id={subjectsInfo.id}
                  onDrag={handleDragStart}
               />)
            }
         });
         const key = ((Math.random() * 10000000) + 1).toFixed(3);
         return <DaysList
            date={item}
            key={key}
            currMonth={i < daysFromPreviousMonth || i > currentDay ? false : true}
            children={cards.length > 0 ? cards : []}
            id={fullDate}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            fullDate={fullDate}
         />

      });


      return elem;

   }, [list, year, month, listOfSubjects]);
   let sorted: Lessons[] = [];
   if (listOfSubjects) {
      sorted = listOfSubjects.filter(item => {
         switch (sortedSubject) {
            case 'Выберите предмет':
               return true;
               break;
            case 'Программирование':
               return item.subject === 'Программирование';
               break;
            case 'Скорочтение':
               return item.subject === 'Скорочтение';
               break;
            case 'Ментальная арифметика':
               return item.subject === 'Ментальная арифметика';
               break;
            default:
               return false;
         }
      });

   }

   const weekDays = renderWeeks(daysOfWeek);
   const dayLists = renderLists(daysInCalendar, sorted);



   return (
      <div className="frame-wrapper">
         <ul className="days">
            {weekDays}
         </ul>
         <ul className="days-shedule">
            {dayLists}
         </ul>
      </div>
   )
}

export default Frame;