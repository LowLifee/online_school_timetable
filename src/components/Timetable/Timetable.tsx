import TimetableSubjectsSelect from 'components/TimetableSubjectsSelect/TimetableSubjectsSelect';
import Cal from 'components/Cal/Cal';


import './timetable.css';


const Timetable = () => {

   return (
      <div className="timetable">
         <TimetableSubjectsSelect /> <Cal />
      </div>
   )
}

export default Timetable;