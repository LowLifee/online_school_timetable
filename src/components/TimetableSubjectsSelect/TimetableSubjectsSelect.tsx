import { useSorted } from './useSorted';
import { useSwitchFrame } from 'components/Frame/useSwitchFrame';
import Button from 'components/Button/Button';

import './timetableSelect.css';
import { useCallback } from 'react';
import { SortedSubject } from 'types';

const TimetableSubjectsSelect = () => {
   const [sorted, sortSubject] = useSorted();
   const [switchFrameStatus, switchStatus] = useSwitchFrame();

   const toggleFrame = useCallback(() => {
      switchStatus(!switchFrameStatus);
   }, [switchFrameStatus])

   const onSelectSort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      sortSubject(e.target.value as SortedSubject)
   }, [sorted, sortSubject]);

   return (
      <div className="timetable-sbj-select">
         <select name="subject-select"
            className="sbj-select"
            onChange={(e) => { onSelectSort(e) }}>
            <option value='Выберите предмет'>
               Выберите предмет
            </option>
            <option value='Программирование'>
               Программирование
            </option>
            <option value='Скорочтение'>
               Скорочтение
            </option>
            <option value='Ментальная арифметика'>
               Ментальная арифметика
            </option>
         </select>

         <Button
            children={switchFrameStatus ? 'Сохранить' : 'Изменить расписание'}
            width='344'
            color='violet'
            onClick={toggleFrame} />
      </div>
   )
}

export default TimetableSubjectsSelect;