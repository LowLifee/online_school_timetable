import { useSelector } from 'react-redux';
import { selectActiveUser } from 'components/pages/MainPage/currentUserSlice/selectActiveUser';

import TimetableSubjectsSelect from 'components/TimetableSubjectsSelect/TimetableSubjectsSelect';
import Cal from 'components/Cal/Cal';
import { GridLoader } from 'react-spinners';


import './timetable.css';


const Timetable = () => {

   const currentUserId = useSelector(selectActiveUser);
   const localCurrenID = localStorage.getItem('key');

   return (
      <div className="timetable">
         {currentUserId ? <><TimetableSubjectsSelect /> <Cal /></> :
            <GridLoader color='#decfff' size={50} className='spinner' />}

      </div>
   )
}

export default Timetable;