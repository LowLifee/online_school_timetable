import { ReactNode, useCallback } from 'react';
import { useAddChangeFrameModal } from 'components/AddFrame/useAddFrameModal';
import { useSwitchFrame } from 'components/Frame/useSwitchFrame';
import { useAddTimeDate } from 'components/AddFrame/addTimeDateSlice/useAddTimeDate';

import './daysList.css';

interface DaysListProps {
   date: string;
   currMonth: boolean;
   children?: ReactNode[];
   id: string;
   onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
   onDrop: (e: React.DragEvent<HTMLLIElement>) => void;
   fullDate: string;
   today: boolean
}

const DaysList = ({ date, currMonth, children, id, onDragOver, onDrop, fullDate, today }: DaysListProps) => {

   const current = currMonth ? 'list-date-current' : 'list-date';
   const dateFromProps = new Date(fullDate.replace(/\./g, '-'));
   const currDate = new Date() < dateFromProps;
   const currDay = today ? 'days-list today' : 'days-list';
   const [addModalStatus, setAddModalStatus] = useAddChangeFrameModal();
   const [addBtnStatus] = useSwitchFrame();
   const [_, setAddTimeDate] = useAddTimeDate();

   const openAddModalStatus = useCallback(() => {
      setAddTimeDate(fullDate)
      setAddModalStatus(true);
   }, [addModalStatus])

   const renderAddBtns = useCallback((children: ReactNode[] | []) => {
      let childrens = 2;
      let forceMapping = [];

      if (children.length === childrens) {
         return;
      }

      for (let i = 1; i < children.length; i++) {
         if (childrens > 0) {
            forceMapping[i] = ''
         } else {
            break;
         }
      }

      if (forceMapping.length === 0) {
         for (let i = 0; i < childrens - 1; i++) {
            forceMapping[i] = ''
         }
      }

      const elem = forceMapping.map((item, i) => {
         if (childrens > 0) {
            return <button
               className="add-btns"
               onClick={openAddModalStatus}
               key={i}>+</button>
         } else {
            return ''
         }
      })

      return elem;
   }, [children]);

   const addBtns = children ? renderAddBtns(children) : [];

   if (currDate) {
      return (
         <li
            className={currDay}
            data-date={fullDate}
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e)}
            id={id}>
            <span className={current}>{date}</span>
            {addBtnStatus ? addBtns : ''}
            {children ? children.map(item => {
               return item
            }) : ''}
         </li>
      )
   } else {
      return (
         <li
            className={currDay}
            data-date={fullDate}
            id={id}>
            <span className={current}>{date}</span>
            {children ? children.map(item => {
               return item
            }) : ''}
         </li>
      )
   }

}

export default DaysList;