import React from 'react';

//libraries
import { Routes, Route } from 'react-router-dom';

//style sheets
import '../Css/Component.style/Content.css';

//custom components
import AllTask from '../Pages/AllTasks';
import Today from '../Pages/Today';
import Upcoming from '../Pages/Upcoming';
import ShowTaskDetails from './ShowTaskDetails';

const Content = () => {
  return (
    <div className='content_container'>
      <Routes>
        <Route path='/' element={<AllTask />} />
        <Route path='/today' element={<Today />} />
        <Route path='/upcoming' element={<Upcoming />} />
      </Routes>
      <ShowTaskDetails />
    </div>
  );
};

export default Content;
