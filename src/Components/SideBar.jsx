import React, { useState } from 'react'
import '../Css/Component.style/SideBar.css'

import { CiInboxIn } from "react-icons/ci";
import { MdCalendarToday, MdOutlineUpcoming } from "react-icons/md";

import { ContextState } from '../ContextApi/ContextApi';
import { Link } from 'react-router-dom';


const SideBar = () => {
  const { showSidebar, setShowTaskDescription, currentUrl } = ContextState();
  const [show, setShow] = useState(false);

  const handleSidebarNavigation = () => {
    setShowTaskDescription(false);
  }

  return (
    <div className={showSidebar ? "sidebar_container" : "hide_sidebar_container"}  >

      <div className="sidebar_item_container" id='pointer'>


        <Link to='/' className={currentUrl === '/' ? ' sidebar_item_link active' : 'sidebar_item_link'} ><button className="sidebar_item" id='pointer' onClick={handleSidebarNavigation} > <CiInboxIn size={20} fontWeight={900} color='blue' /> All Task </button></Link>
        <Link to='/today' className={currentUrl === '/today' ? ' sidebar_item_link active' : 'sidebar_item_link'} ><button className="sidebar_item" id='pointer' onClick={handleSidebarNavigation}> <MdCalendarToday size={20} color='green' /> Today </button></Link>
        <Link to='/upcoming' className={currentUrl === '/upcoming' ? ' sidebar_item_link active' : 'sidebar_item_link'}><button className="sidebar_item" id='pointer' onClick={handleSidebarNavigation}><MdOutlineUpcoming size={20} color='violet' /> Upcoming </button></Link>
      </div>
    </div>
  )
}

export default SideBar
