
import prev from 'assets/img/Arro-left.png';
import next from 'assets/img/arrow-right.png';

import './calMonth.css';

const CalMonth = () => {

   const months = ['Января', 'Фераля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

   const currentDate = new Date(),
      day = currentDate.getDate(),
      month = months[currentDate.getMonth()],
      year = currentDate.getFullYear();


   return (
      <div className="cal-month">
         <i className='prev'><img src={prev} alt="Prev" /></i>
         <div className="current-date">
            <span>{month}</span> <span>{year}</span>
         </div>
         <i className='next'><img src={next} alt="Next" /></i>
      </div>
   )
}

export default CalMonth;