

import { ReactNode } from 'react';

import './daysList.css';

interface DaysListProps {
   date: string;
   currMonth: boolean;
   children?: ReactNode[];
   id: string;
   onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
   onDrop: (e: React.DragEvent<HTMLLIElement>) => void;
   fullDate: string
}

const DaysList = ({ date, currMonth, children, id, onDragOver, onDrop, fullDate }: DaysListProps) => {

   const current = currMonth ? 'list-date-current' : 'list-date';

   return (
      <li
         className="days-list"
         data-date={fullDate}
         onDragOver={(e) => onDragOver(e)}
         onDrop={(e) => onDrop(e)}
         id={id}>
         <span className={current}>{date}</span>
         {children ? children.map(item => {
            return item
         }) : ''}
      </li>
   )
}

export default DaysList;