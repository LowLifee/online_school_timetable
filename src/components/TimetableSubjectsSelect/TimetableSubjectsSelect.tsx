
import Button from 'components/Button/Button';

import './timetableSelect.css';

const TimetableSubjectsSelect = () => {

   return (
      <div className="timetable-sbj-select">
         <select name="subject-select"
            className="sbj-select">
            <option value='Выберите предмет'>
               Выберите предмет
            </option>
            <option value='Программирование'>
               Программирование
            </option>
            <option value='Программирование'>
               Программирование
            </option>
         </select>

         <Button children='Изменить расписание' width='344' color='violet' />
      </div>
   )
}

export default TimetableSubjectsSelect;