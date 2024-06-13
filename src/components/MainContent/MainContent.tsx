import { Fragment } from 'react/jsx-runtime';


import Menu from 'components/Menu/Menu';
import Header from 'components/Header/Header';
import TimetableInfo from 'components/TimetableInfo/TimetableInfo';


import './mainContent.css';

const MainContent = () => {
   return (
      <Fragment>
         <Menu />
         <div className="main-content">
            <Header greating={true} />
            <TimetableInfo />
         </div>
      </Fragment>
   )
}

export default MainContent;