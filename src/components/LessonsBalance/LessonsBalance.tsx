import { useSelector } from 'react-redux';

import { selectUsersList } from 'components/pages/MainPage/userSelector';
import { selectActiveUser } from 'components/pages/MainPage/currentUserSlice/selectActiveUser';

import Button from 'components/Button/Button';

import './lessonsBalance.css';

interface SortedSubject {
   [key: string]: number
}

type Elem = (string | number)[][];

const LessonsBalance = () => {

   const allUsers = useSelector(selectUsersList);
   const currentUserId = useSelector(selectActiveUser);

   const currentUser = allUsers.filter(item => item.id === currentUserId);
   const subjetName: string[] = currentUser[0].lessons.map(item => item.subject);
   const sortedSubject: string[] = Array.from(new Set(subjetName));
   const totalSubjectBalance: SortedSubject = {};

   sortedSubject.forEach(key => {
      totalSubjectBalance[key] = 0;
   })

   for (let i = 0; i < sortedSubject.length; i++) {
      for (let k = 0; k < subjetName.length; k++) {
         if (sortedSubject[i] == subjetName[k]) {
            totalSubjectBalance[sortedSubject[i]] += 1;
         }
      }
   }


   const renderItems = (item: Elem) => {
      const elem = item.map((item, i) => {
         return <li className="subjects-lists" key={i}>
            <span className='subjects-name'>{item[0]}</span>
            <span className='subjects-balance'>{item[1]}</span>
         </li>
      })

      return elem;
   }

   const element = renderItems(Object.entries(totalSubjectBalance));


   return (
      <div className="lessons-balance">
         <h2 className="balance-title">Баланс занятий</h2>
         <div className="balance-content">
            <ul className="balance-list">
               {element}
            </ul>
            <Button children='Button' width='288' color='violet' />
         </div>
      </div>
   )
}

export default LessonsBalance;