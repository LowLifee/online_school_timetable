
import CalMonth from 'components/CalMonth/CalMonth';

import './calHeader.css';

interface CalHeaderProps {
   onChangeDate: (mehtod: 'next' | 'prev') => void;
   onGetToday: () => void;
   month: number;
   year: number;
}

const CalHeader = ({ onChangeDate, onGetToday, month, year }: CalHeaderProps) => {

   return (
      <div className="cal-header">
         <CalMonth onChangeDate={onChangeDate} month={month} year={year} />
         <div className="today-part">
            <button onClick={onGetToday}>Сегодня</button>
            <span>?</span>
         </div>
      </div>
   )
}

export default CalHeader;