import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Lessons, SubjectStatus } from 'types';
import walletIcon from 'assets/img/Wallet.png';
import { useSwitchFrame } from 'components/Frame/useSwitchFrame';
import { useGetUser } from 'slices/userSlice/useLoadUsers';
import { useCurrUser } from 'components/pages/MainPage/currentUserSlice/useCurrUser';

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
   const [styles, setStyles] = useState<object>({ visibility: 'hidden' });
   const [animated, setAnimated] = useState('');
   const [allUsers, setAllUsers] = useGetUser();
   const [currUserId] = useCurrUser();
   const [list, setList] = useState<Lessons[] | null>(null)

   const [modalFrame] = useSwitchFrame();

   useEffect(() => {
      if (allUsers && currUserId) {
         setList(allUsers.filter(item => item.id === currUserId)[0].lessons)
      }
   }, [allUsers, currUserId])

   const handleDeleteSubject = useCallback((id: string) => {
      if (list && allUsers && currUserId) {
         setList(list.filter(item => item.id !== id));
         const newList = list.filter(item => item.id !== id)

         let newData = allUsers.filter(item => item.id === currUserId)[0];
         newData = { ...newData, lessons: [...newList] };
         const updatedLists = allUsers.map(list => {
            if (list.id === currUserId) {
               return newData;
            } else {
               return list;
            }
         })
         setAllUsers(updatedLists);
      }
   }, [list, allUsers, currUserId])

   const isDraggable = useMemo((): boolean => {
      switch (status) {
         case 'canceled':
            return false;
            break;
         case 'done':
            return false;
            break;
         case 'coming':
            return true;
            break;
         case 'past-not':
            return false;
         case 'todays-canceled':
            return false;
            break;
         case 'todays-done':
            return false;
            break;
         default:
            return false
      }
   }, [status]);

   useEffect(() => {
      if (modalFrame && isDraggable) {
         setStyles({ visibility: 'visible' });
         setAnimated('animated');
      } else {
         setStyles({ visibility: 'hidden' });
         setAnimated('');
      }
   }, [modalFrame, isDraggable]);

   const onActive = useCallback(() => {
      cards.forEach(item => {
         item.classList.remove('active');
         if (cardRef.current) {
            cardRef.current.classList.add('active');
         }
      });
   }, [])

   return (
      <div
         className={`card ${status} ${animated}`}
         ref={cardRef}
         data-active
         data-id={id}
         onClick={onActive}
         onDragStart={(e) => onDrag(e)}
         draggable={isDraggable && modalFrame}>
         <div className="sbj-time">
            <span className="card-time">{time}</span>
            {payed ? <i><img src={walletIcon} alt="Wallet" /></i> : ''}
         </div>
         <span className="card-sbj">{subjectName}</span>
         <span
            className='delete-card-lesson'
            style={styles}
            onClick={() => handleDeleteSubject(id)}>&times;</span>
      </div>
   )
}

export default Card;