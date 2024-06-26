import { useSelector } from 'react-redux';
import { selectActiveUser } from 'components/pages/MainPage/currentUserSlice/selectActiveUser';
import { useGetUser } from 'slices/userSlice/useLoadUsers';

import { UserEmails } from 'types';

import Button from 'components/Button/Button';

import './lessonsBalance.css';
import { useEffect, useState } from 'react';

interface SortedSubject {
   [key: string]: number
}

type Elem = (string | number)[][];

const LessonsBalance = () => {
   const [allUsers] = useGetUser();
   const [currentUser, setCurrentUser] = useState<UserEmails | null>(null);
   const currentUserId = useSelector(selectActiveUser);
   const [subjetName, setSubjectName] = useState<string[]>(['']);

   const sortedSubject: string[] = Array.from(new Set(subjetName));
   const totalSubjectBalance: SortedSubject = {};

   useEffect(() => {
      const activeUser = allUsers.find(item => item.id === currentUserId);
      if (activeUser) {
         setCurrentUser(activeUser)
      }
      if (currentUser) {
         setSubjectName(currentUser.lessons.map(item => item.subject))
      }
   }, [currentUser, allUsers])

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