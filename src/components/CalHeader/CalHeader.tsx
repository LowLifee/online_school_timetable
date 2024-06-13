
import CalMonth from 'components/CalMonth/CalMonth';

import './calHeader.css';

const CalHeader = () => {

   return (
      <div className="cal-header">
         <CalMonth />
         <div className="today-part">
            <button>Сегодня</button>
            <span>?</span>
         </div>
      </div>
   )
}

export default CalHeader;