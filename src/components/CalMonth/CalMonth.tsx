
import prev from 'assets/img/Arro-left.png';
import next from 'assets/img/arrow-right.png';

import './calMonth.css';

interface CalMonthProps {
   onChangeDate: (mehtod: 'next' | 'prev') => void;
   month: number;
   year: number
}

const CalMonth = ({ onChangeDate, month, year }: CalMonthProps) => {

   const months = ['Январь', 'Фераль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

   const currentDate = new Date(year, month),
      headerYear = currentDate.getFullYear(),
      headerMonth = currentDate.getMonth();


   return (
      <div className="cal-month">
         <i className='prev'><img src={prev} alt="Prev" onClick={() => onChangeDate('prev')} /></i>
         <div className="current-date">
            <span>{months[headerMonth]}</span> <span>{headerYear}</span>
         </div>
         <i className='next'><img src={next} alt="Next" onClick={() => onChangeDate('next')} /></i>
      </div>
   )
}

export default CalMonth;