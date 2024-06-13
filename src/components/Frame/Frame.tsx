import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUsersList } from 'components/pages/MainPage/userSelector';

import DaysList from 'components/DaysList/DaysList';
import Card from 'components/Card/Card';

import './frame.css';
import { Lessons } from 'types';


const Frame = () => {

   const [list] = useSelector(selectUsersList);
   const subjectsInfo: Lessons =list.lessons[0];

   const renderLists = useCallback((list: Lessons[]) => {
      const elem = list.map((item, i) => {
         
      })
   }, [list])


   return (
      <div className="frame-wrapper">
         <ul className="days">
            <li>Пн</li>
            <li>Вт</li>
            <li>Ср</li>
            <li>Чт</li>
            <li>Пт</li>
            <li>Сб</li>
            <li>Вс</li>
         </ul>
         <ul className="days-shedule">
            <DaysList date='26 апреля' currMonth={false} />
            <DaysList date='27 апреля' currMonth={false} children={[<Card status={'done'} payed={false} />, <Card status={'done'} payed={false} />]} />
            <DaysList date='28 апреля' currMonth={false} children={[<Card status={'past-not'} payed={false} />, <Card status={'past-not'} payed={false} />]} />
            <DaysList date='29 апреля' currMonth={false} />
            <DaysList date='30 апреля' currMonth={false} children={[<Card status={'canceled'} payed={false} />, <Card status={'canceled'} payed={false} />]} />
            <DaysList date='1 апреля' currMonth={true} children={[<Card status={'todays-done'} payed={false} />, <Card status={'todays-canceled'} payed={false} />]} />
            <DaysList date='2 апреля' currMonth={true} children={[<Card status={'coming'} payed={false} />, <Card status={'coming'} payed={false} />]} />
            <DaysList date='3 апреля' currMonth={true} children={[<Card status={'coming'} payed={false} />, <Card status={'coming'} payed={false} />]} />
            <DaysList date='4 апреля' currMonth={true} />
            <DaysList date='5 апреля' currMonth={true} />

            <DaysList date='26 апреля' currMonth={false} />
            <DaysList date='27 апреля' currMonth={false} children={[<Card status={'done'} payed={false} />, <Card status={'done'} payed={false} />]} />
            <DaysList date='28 апреля' currMonth={false} children={[<Card status={'past-not'} payed={true} />, <Card status={'past-not'} payed={false} />]} />
            <DaysList date='29 апреля' currMonth={false} />
            <DaysList date='30 апреля' currMonth={false} children={[<Card status={'canceled'} payed={false} />, <Card status={'canceled'} payed={false} />]} />
            <DaysList date='1 апреля' currMonth={true} children={[<Card status={'todays-done'} payed={false} />, <Card status={'todays-canceled'} payed={false} />]} />
            <DaysList date='2 апреля' currMonth={true} children={[<Card status={'coming'} payed={true} />, <Card status={'coming'} payed={false} />]} />
            <DaysList date='3 апреля' currMonth={true} children={[<Card status={'coming'} payed={true} />, <Card status={'coming'} payed={false} />]} />
            <DaysList date='4 апреля' currMonth={true} />
            <DaysList date='5 апреля' currMonth={true} />

            <DaysList date='26 апреля' currMonth={false} />
            <DaysList date='27 апреля' currMonth={false} children={[<Card status={'done'} payed={false} />, <Card status={'done'} payed={false} />]} />
            <DaysList date='28 апреля' currMonth={false} children={[<Card status={'past-not'} payed={false} />, <Card status={'past-not'} payed={false} />]} />
            <DaysList date='29 апреля' currMonth={false} />
            <DaysList date='30 апреля' currMonth={false} children={[<Card status={'canceled'} payed={false} />, <Card status={'canceled'} payed={false} />]} />
            <DaysList date='1 апреля' currMonth={true} children={[<Card status={'todays-done'} payed={false} />, <Card status={'todays-canceled'} payed={false} />]} />
            <DaysList date='2 апреля' currMonth={true} children={[<Card status={'coming'} payed={false} />, <Card status={'coming'} payed={false} />]} />
            <DaysList date='3 апреля' currMonth={true} children={[<Card status={'coming'} payed={false} />, <Card status={'coming'} payed={false} />]} />
            <DaysList date='4 апреля' currMonth={true} />
            <DaysList date='5 апреля' currMonth={true} />

            <DaysList date='1 апреля' currMonth={true} children={[<Card status={'todays-done'} payed={false} />, <Card status={'todays-canceled'} payed={false} />]} />
            <DaysList date='2 апреля' currMonth={true} children={[<Card status={'coming'} payed={false} />, <Card status={'coming'} payed={false} />]} />
            <DaysList date='3 апреля' currMonth={true} children={[<Card status={'coming'} payed={false} />, <Card status={'coming'} payed={false} />]} />
            <DaysList date='4 апреля' currMonth={true} />
            <DaysList date='5 апреля' currMonth={true} />
         </ul>
      </div>
   )
}

export default Frame;