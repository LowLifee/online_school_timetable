import { useState, useEffect } from 'react';

import './upcomingLessonBlock.css';

interface TimerProps {
   deadline: string;
}

const UpcomingLessonBlock = ({ deadline }: TimerProps) => {

   const [days, setDays] = useState(0);
   const [hours, setHours] = useState(0);
   const [minutes, setMinutes] = useState(0);

   useEffect(() => {
      const now = new Date();
      const endDate = new Date(deadline);

      const daysRemaining = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60) % 24);
      const minutesRemaining = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60) % 60);

      setDays(daysRemaining);
      setHours(hoursRemaining);
      setMinutes(minutesRemaining);

      const intervalId = setInterval(() => {
         const now = new Date();
         const timeRemaining = endDate.getTime() - now.getTime();

         if (timeRemaining <= 0) {
            clearInterval(intervalId);
            setDays(0);
            setHours(0);
            setMinutes(0);
            return;
         }

         const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
         const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

         setDays(daysRemaining);
         setHours(hoursRemaining);
         setMinutes(minutesRemaining);
      }, 1000);

      return () => clearInterval(intervalId);
   }, [deadline]);

   return (
      <div className="upcoming-block">
         <h2 className='upcoming-block-title'>Следующее занятие начнется через:</h2>
         <div className="upcoming-timer">
            <span className='upcoming-time-view' id='upcoming-days'><span className='time'>{days < 10 ? `0${days}` : days}</span> д</span>
            <span className='upcoming-time-view' id='upcoming-hours'><span className='time'>{hours < 10 ? `0${hours}` : hours}</span> ч</span>
            <span className='upcoming-time-view' id='upcoming-minutes'><span className='time'>{minutes < 10 ? `0${minutes}` : minutes}</span> мин</span>
         </div>
         <button className="upcomin-block-btn">Button</button>
      </div>
   )
}

export default UpcomingLessonBlock;

