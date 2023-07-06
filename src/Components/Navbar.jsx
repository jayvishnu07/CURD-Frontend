import React from "react";
import "../Css/Component.style/Navbar.css";

import { SlMenu } from "react-icons/sl";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdAdd, IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

import { ContextState } from "../ContextApi/ContextApi";



const Navbar = () => {
  const { setShowSidebar } = ContextState();
  const handleMenuClick = () => {
    setShowSidebar((prev) => !prev)
  }

  return (
    <div className="nav_container">
      <div className="nav_left">
        <SlMenu size={20} id="pointer" onClick={handleMenuClick} />
        <AiOutlineHome size={25} id="pointer" />
      </div>
      <div className="nav_right">
        <IoIosNotificationsOutline size={25} id="pointer" />
        <CgProfile size={25} id="pointer" />
      </div>
    </div>
  );
};

export default Navbar;
