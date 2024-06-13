

import { ReactNode } from 'react';

import './daysList.css';

interface DaysListProps {
   date: string;
   currMonth: boolean;
   children?: ReactNode[];
}

const DaysList = ({ date, currMonth, children }: DaysListProps) => {

   const current = currMonth ? 'list-date-current' : 'list-date';

   return (
      <li className="days-list">
         <span className={current}>{date}</span>
         {children ? children.map(item => {
            return item
         }) : ''}
      </li>
   )
}

export default DaysList;