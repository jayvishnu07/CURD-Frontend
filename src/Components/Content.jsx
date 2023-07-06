import React from 'react'
import '../Css/Component.style/Content.css'
import { Routes, Route } from 'react-router-dom';
import Inbox from '../Pages/Inbox';
import Today from '../Pages/Today';
import Filter from '../Pages/Filter';
import Upcoming from '../Pages/Upcoming';
import ShowTaskDescription from './ShowTaskDescription';

const Content = () => {
  return (
    <div className='content_container'>
      <Routes>
        <Route path='/' element={<><Inbox /></>} />
        <Route path='/today' element={<><Today /></>} />
        <Route path='/filter' element={<><Filter /></>} />
        <Route path='/upcoming' element={<><Upcoming /></>} />
      </Routes>
      <ShowTaskDescription />
    </div>
  )
}

export default Content