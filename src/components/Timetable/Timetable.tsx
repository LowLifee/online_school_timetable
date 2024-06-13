import { useSelector } from 'react-redux';
import { selectActiveUser } from 'components/pages/MainPage/currentUserSlice/selectActiveUser';

import TimetableSubjectsSelect from 'components/TimetableSubjectsSelect/TimetableSubjectsSelect';
import Cal from 'components/Cal/Cal';
import { GridLoader } from 'react-spinners';


import './timetable.css';


const Timetable = () => {

   const currentUserId = useSelector(selectActiveUser);

   return (
      <div className="timetable">
         {currentUserId ? <><TimetableSubjectsSelect /> <Cal /></> : 
         <GridLoader color='#decfff' size={50} />}

      </div>
   )
}

export default Timetable;