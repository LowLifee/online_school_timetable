import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMenu } from 'components/Menu/menuSelector';
import { useNextLesson } from './useNextLesson';

import ModalUserList from 'components/ModalUserList/ModalUserList';
import Sales from 'components/Sales/Sales';
import UpcomingLessonBlock from 'components/UpcomingLessonBlock/UpcomingLessonBlock';
import Homework from 'components/Homework/Homework';
import Report from 'components/Report/Report';
import LessonsBalance from 'components/LessonsBalance/LessonsBalance';
import Shedule from 'components/Shedule/Sсhedule';
import Timetable from 'components/Timetable/Timetable';

import './timetableInfo.css';


const TimetableInfo = () => {
   const menu = useSelector(selectMenu);
   const [nextLesson] = useNextLesson();
   const [endDate, setEndate] = useState<string>('')

   useEffect(() => {
      setEndate(nextLesson.replace(/\./g, '-'))
   }, [nextLesson, menu])

   const renderItems = useCallback(() => {
      switch (menu) {
         case 'Home':
            return <div className="timetable-info">
               <ModalUserList />
               <div className="sales">
                  <Sales />
                  <UpcomingLessonBlock deadline={endDate} />
                  <div className="tasks">
                     <Homework />
                     <Report />
                  </div>
               </div>
               <div className="lessons-info">
                  <LessonsBalance />
                  <Shedule />
               </div>
            </div>
            break;
         case 'timetable':
            return <div className="timetable-info">
               <ModalUserList />
               <Timetable />
            </div>
            break;
      }
   }, [menu, nextLesson, endDate]);

   const element = renderItems();

   return (
      <>
         {element}
      </>
   )
}

export default TimetableInfo;