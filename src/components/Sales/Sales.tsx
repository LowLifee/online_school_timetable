
import salesImg from 'assets/img/Sales1.png';

import './sales.css';

const Sales = () => {

   return (
      <div className="sales-page">
         <div className="sales-info">
            <h2 className='sales-info-title'>До 31 декабря любой курс со скидкой 20%</h2>
            <span className='sales-info-text'>До конца года у вас есть уникальная возможность воспользоваться нашей новогодней скидкой 20% на любой курс!</span>
         </div>
         <img src={salesImg} alt="Bear" id='sales-img'/>
      </div>
   )
}

export default Sales;