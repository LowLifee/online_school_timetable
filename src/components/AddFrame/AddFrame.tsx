import { useCallback, useEffect, useState } from 'react';
import { useAddChangeFrameModal } from './useAddFrameModal';
import { useGetUser } from 'slices/userSlice/useLoadUsers';
import { useCurrUser } from 'components/pages/MainPage/currentUserSlice/useCurrUser';
import { useAddTimeDate } from './addTimeDateSlice/useAddTimeDate';

import Button from 'components/Button/Button';

import { Lessons } from 'types';

import './addFrame.css';


const AddFrame = () => {
   const [selectedSubject, setSelectedSubj] = useState('Выберите предмет');
   const [autoDate] = useAddTimeDate();
   const [date, setDate] = useState(autoDate);
   const [time, setTime] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [newDate, setNewDate] = useState<Lessons[] | null>(null);
   const [message, setMessage] = useState<string>('');
   const [disabled, setDisabled] = useState(false);

   const [allUsers, setAllUsers] = useGetUser();
   const [currentUserId] = useCurrUser();
   const [modalStatus, setModalStatus] = useAddChangeFrameModal();

   useEffect(() => {
      setDate(autoDate.replace(/\./g, '-'))
   }, [])

   const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSubj(e.target.value)
   }, [selectedSubject, errorMessage, date, time]);

   const onChangeInputs = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.getAttribute('id') === 'change-lesson-date') {
         const isDateCorrect = new Date() < new Date(e.target.value)

         if (!isDateCorrect) {
            e.currentTarget.classList.add('error');
            setErrorMessage('Введите правильные данные');
            setDate('');
         } else {
            e.currentTarget.classList.remove('error');
            setErrorMessage('');
            setDate(e.target.value);
         }
      } else {
         setTime(e.target.value)
      }
   }, [date, time, errorMessage]);

   const updateLists = useCallback(() => {
      if (date.length > 0 && time.length > 0) {
         let teacher: string;
         switch (selectedSubject) {
            case 'Программирование':
               teacher = 'Львова Василиса';
               break;
            case 'Скорочтение':
               teacher = 'Козлов Василий';
               break;
            case 'Ментальная арифметика':
               teacher = 'Ким Александр';
               break;
            default:
               teacher = '';
         }
         const data: Lessons[] = [
            {
               cancelled: false,
               subject: selectedSubject,
               date: date.replace(/\-/g, '.'),
               time: `${time}-${time.slice(0, 1)}${+time.slice(1, 2) + 1}:${time.slice(-2)}`,
               payed: false,
               missed: false,
               id: date + time,
               teacher
            }
         ]

         if (newDate) {
            let newList = allUsers.find(item => item.id === currentUserId);
            if (newList !== undefined) {
               newList = { ...newList, lessons: [...newDate, ...data] }
               const updatedDatas = allUsers.map(list => {
                  if (list.id === currentUserId && newList) {
                     return newList;
                  } else {
                     return list;
                  }
               })
               if(updatedDatas){
                  setAllUsers(updatedDatas)
               }
            }
         }
      }
   }, [newDate, date, time, selectedSubject, message])

   const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateLists();
      setSelectedSubj('Выберите предмет');
      setTime('');
      setDate('');
   }, [selectedSubject, date, time, errorMessage, newDate]);

   const closeModal = useCallback(() => {
      setSelectedSubj('Выберите предмет');
      setTime('');
      setDate('');
      setMessage('');
      setModalStatus(false);
   }, [modalStatus, currentUserId]);

   const closeModalByBtn = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Enter') {
         updateLists();
         setTimeout(() => {
            closeModal();
         }, 3000);
      } else if (e.key === 'Escape') {
         closeModal();
      }
   }, [modalStatus, currentUserId])

   useEffect(() => {
      document.body.addEventListener('keydown', closeModalByBtn);

      if (allUsers) {
         setNewDate(allUsers.filter(item => item.id === currentUserId)[0].lessons);
      }
      return () => document.body.removeEventListener('keydown', closeModalByBtn);
   }, []);

   return (
      <div className='change-frame'>
         <form className='change-form'
            onSubmit={(e) => onSubmit(e)}>
            <span
               className='change-frame-exit'
               onClick={() => closeModal()}>&times;</span>
            <select name="subject-select"
               className="sbj-select"
               id="sbj-select"
               onChange={(e) => { onChange(e) }}
               required>
               <option value={selectedSubject}>
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
            <label htmlFor="change-lesson-date">Выберите дату</label>
            <input
               type="date"
               className='change-lesson-date'
               id='change-lesson-date'
               value={date}
               onChange={(e) => { onChangeInputs(e) }}
               required />
            <span id="errorMessage">{errorMessage}</span>
            <label htmlFor="change-lesson-time">Выберите время</label>
            <input
               type="time"
               id='change-lesson-time'
               value={time}
               onChange={(e) => { onChangeInputs(e) }}
               required />
            <span style={{ color: 'green' }}>{message}</span>
            <div className='change-lesson-btns'>
               <Button
                  children='Сохранить'
                  color='violet'
                  width='100'
                  disabled={disabled}
               />
               <Button
                  children='Отменить'
                  color='violet'
                  width='100'
                  onClick={closeModal}
                  disabled={disabled}
               />
            </div>
         </form>
      </div>
   )
}

export default AddFrame;