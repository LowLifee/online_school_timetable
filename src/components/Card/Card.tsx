import { useCallback, useRef } from 'react';
import { SubjectStatus } from 'types';
import walletIcon from 'assets/img/Wallet.png';

import './card.css';



interface CardProps {
   status: SubjectStatus;
   payed: boolean;
   subjectName: string;
   time: string;
   id: string;
   onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Card = ({ status, payed, subjectName, time, id, onDrag }: CardProps) => {
   const cards = document.querySelectorAll('.card');
   const cardRef = useRef<HTMLDivElement | null>(null);
   const onActive = useCallback(() => {

      cards.forEach(item => {
         item.classList.remove('active');
         if (cardRef.current) {
            cardRef.current.classList.add('active');
         }
      });
   }, [cardRef])

   return (
      <div
         className={`card ${status}`}
         ref={cardRef}
         data-active
         data-id={id}
         onClick={onActive}
         onDragStart={(e) => onDrag(e)}
         draggable>
         <div className="sbj-time">
            <span className="card-time">{time}</span>
            {payed ? <i><img src={walletIcon} alt="Wallet" /></i> : ''}
         </div>
         <span className="card-sbj">{subjectName}</span>
      </div>
   )
}

export default Card;