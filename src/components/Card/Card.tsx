
import walletIcon from 'assets/img/Wallet.png';

import './card.css';

type Status = 'done' | 'canceled' | 'past-not' | 'todays-done' | 'coming' | 'todays-canceled';

interface CardProps {
   status: Status;
   payed: boolean;
}

const Card = ({ status, payed }: CardProps) => {

   return (
      <div className={`card ${status}`}>
         <div className="sbj-time">
            <span className="card-time">13:00-13:45</span>
            <i><img src={walletIcon} alt="Wallet" /></i>
         </div>
         <span className="card-sbj">Ментальная арифметика</span>
      </div>
   )
}

export default Card;