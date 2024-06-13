
import homeworkIcon from 'assets/img/homework_icon.png';

import './homework.css';

const Homework = () => {

   return (
      <div className="homework">
         <h2>Домашние задания</h2>
         <img src={homeworkIcon} alt="Homework icon" />
      </div>
   )
}

export default Homework;