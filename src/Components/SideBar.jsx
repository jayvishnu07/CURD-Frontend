import React from 'react'
import '../Css/Component.style/SideBar.css'

import { IoMdAdd } from "react-icons/io";
import { CiInboxIn } from "react-icons/ci";
import { MdCalendarToday, MdOutlineUpcoming } from "react-icons/md";
import { BsFilter } from "react-icons/bs";

import { ContextState } from '../ContextApi/ContextApi';
import { Link } from 'react-router-dom';


const SideBar = () => {
  const { showSidebar, setShowTaskDescription } = ContextState();

  const handleSidebarNavigation = () => {
    setShowTaskDescription(false);
  }

  return (
    <div className={showSidebar ? "sidebar_container" : "hide_sidebar_container"}  >

      <div className="sidebar_item_container" id='pointer'>
        <div className="add_task_container">
          <IoMdAdd size={20} color='#FFA500' className='add_task_icon' /> Add task
        </div>
        <Link to='/' className='sidebar_item_link' ><button className="sidebar_item" id='pointer' onClick={handleSidebarNavigation} > <CiInboxIn size={20} fontWeight={900} color='blue' /> Inbox</button></Link>
        <Link to='/today' className='sidebar_item_link' ><button className="sidebar_item" id='pointer' onClick={handleSidebarNavigation}> <MdCalendarToday size={20} color='green' /> Today</button></Link>
        <Link to='/upcoming' className='sidebar_item_link' ><button className="sidebar_item" id='pointer' onClick={handleSidebarNavigation}><MdOutlineUpcoming size={20} color='violet' /> Upcoming</button></Link>
        <Link to='/filter' className='sidebar_item_link' ><button className="sidebar_item" id='pointer' onClick={handleSidebarNavigation}><BsFilter size={20} color='orange' /> Filters</button></Link>
      </div>
    </div>
  )
}

export default SideBar