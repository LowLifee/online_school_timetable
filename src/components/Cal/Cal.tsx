
import CalHeader from 'components/CalHeader/CalHeader';
import Frame from 'components/Frame/Frame';


import './cal.css';
import { useCallback, useEffect, useState } from 'react';

const Cal = () => {
   const [year, setYear] = useState<number>(2024);
   const [month, setMonth] = useState<number>(5);
   const date = new Date();
   let yearAsProps = date.getFullYear(),
      monthAsProps = date.getMonth();

   const onChangeDate = useCallback((mehtod: 'next' | 'prev') => {
      if (mehtod === 'next' && monthAsProps < 11) {
         setMonth(month => month + 1);
      } else if (mehtod === 'next' && monthAsProps === 11) {
         setYear(year => year + 1);
         setMonth(0);
      } else if (mehtod === 'prev' && monthAsProps > 0) {
         setMonth(month => month - 1);
      } else if (mehtod === 'prev' && monthAsProps === 0) {
         setYear(year => year - 1);
         setMonth(11);
      }
   }, [year, month]);

   const onGetToday = useCallback(() => {
      setYear(yearAsProps);
      setMonth(monthAsProps);
   }, [year, month])

   useEffect(() => {
      setYear(yearAsProps);
      setMonth(monthAsProps);
   }, [])

   return (
      <div className="cal-wrapper">
         <CalHeader
            onChangeDate={onChangeDate}
            month={month}
            year={year}
            onGetToday={onGetToday} />
         <Frame year={year} month={month} />
      </div>
   )
}

export default Cal;