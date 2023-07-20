import React, { useState } from "react";
import "../Css/Component.style/Navbar.css";
import { css } from 'glamor';
import { SlMenu } from "react-icons/sl";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdAdd, IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

import { ContextState } from "../ContextApi/ContextApi";
import { Button, Offcanvas } from "react-bootstrap";


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from "react-router-dom";

import moment from 'moment-timezone';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Navbar = () => {
  const { userName, setUserName, setShowTaskDescription, setRecentEditHappen, setShowTaskDescriptionId, showAddTask, setShowAddTask, setShowInboxFilter, setShowTodayFilter, setShowUpcomingFilter, setShowSidebar } = ContextState();

  const [taskDescription, setTaskDescription] = useState('')
  const [assignedBy, setAssignedBy] = useState('')
  const [assignedDate, setAssignedDate] = useState('')
  const [due, setDue] = useState('')
  const [priority, setPriority] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  const [duplicateAssignedDate, setDuplicateAssignedDate] = useState(null);
  const [duplicateDeadline, setDuplicateDeadline] = useState(null);

  const handleMenuClick = () => {
    setShowSidebar((prev) => !prev)
  }


  const handleClose = () => {
    setDuplicateAssignedDate(null)
    setDuplicateDeadline(null)
    setShowAddTask(false);
  }


  const handleTasKTitleInput = (e) => {
    if (e.target.value.length < 200) {
      setTaskDescription(e.target.value)

    }
    else {
      toast.error(<b style={{ color: "#000" }} >Task Title is too long. Should be below 200.</b>, {
        className: css({
          background: "#pink"
        })
      }, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: true,
        theme: "colored"
      });
      setTaskDescription(taskDescription.slice(0, 200))
    }
  }


  const handleAddTask = () => {

    setShowTaskDescriptionId('')



    console.log("---> ", taskDescription);
    console.log("---> ", assignedDate);
    console.log("---> ", assignedTo);
    console.log("---> ", due);
    console.log("---> ", assignedBy);
    console.log("---> ", priority);



    if (taskDescription && assignedDate && due && priority && assignedTo) {
      axios.post(`http://localhost:8080/api/v2/tasks`, {
        taskDescription: taskDescription,
        assignedDate: assignedDate,
        assignedTo: assignedTo,
        due: due,
        assignedBy: userName,
        priority: priority,
      })
        .then((res) => {
          toast.success(<b style={{ color: "#000" }} >Task added Successfully.</b>, {
            className: css({
              background: "#pink !important"
            })
          }, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: true,
            theme: "colored",
          });
          setShowAddTask(false);
          setTaskDescription('')
          setAssignedBy('')
          setAssignedDate('')
          setDue('')
          setPriority('')
          setAssignedTo('')
          setDuplicateDeadline(null)
          setDuplicateAssignedDate(null)
          setRecentEditHappen((prev) => !prev)
        })
        .catch((err) => {
          toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
            className: css({
              background: "#pink !important"
            })
          }, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: true,
            theme: "colored",
          });
        })
    }
    else {
      toast.warn(<b style={{ color: "#000" }} >Please fill all the fields.</b>, {
        className: css({
          background: "#pink"
        })
      }, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: true,
        theme: "colored",
      });
    }


  }


  const handleSelectedAssignedDate = (dateTime) => {
    setDuplicateAssignedDate(dateTime)
    const formattedDateTime = moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
    console.log(formattedDateTime);

    setAssignedDate(formattedDateTime);
    console.log("down", formattedDateTime);
  }

  const handleSelectedDeadline = (dateTime) => {
    setDuplicateDeadline(dateTime)
    const formattedDateTime = moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
    console.log(formattedDateTime);

    setDue(formattedDateTime);
    console.log("down", formattedDateTime);
  }


  return (
    <div className="nav_container">
      <div className="nav_left">
        <SlMenu className="nav_icon" size={20} id="pointer" onClick={handleMenuClick} />
        <Link to='/' className="nav_icon" ><AiOutlineHome size={25} id="pointer" /></Link>
      </div>
      <div className="nav_right">
        <IoMdAdd size={25} className='add_task_icon nav_icon' onClick={() => { setShowTaskDescription(false); setShowInboxFilter(false); setShowTodayFilter(false); setShowUpcomingFilter(false); setShowAddTask((prev) => !prev) }} id='pointer' />
        <Offcanvas className='add_task_offcanvas' placement={'end'} show={showAddTask} onHide={handleClose} scroll={true} backdrop={false}>
          <div style={{ marginTop: "3vh" }} >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title> Add Task</Offcanvas.Title>
            </Offcanvas.Header>
          </div>
          <Offcanvas.Body className="Offcanvas_body_navbar" >
            <div className="form_navbar">
              <input className='form_input_items_navbar' type="text" name='task_title' placeholder='Task' value={taskDescription} onChange={handleTasKTitleInput} />
              <input className='form_input_items_navbar' type="text" name='assigned_to' placeholder='Assigning to' onChange={(e) => setAssignedTo(e.target.value)} />
              <DatePicker
                className="form_input_items_navbar date_in_add_task"
                onChange={(date) => { handleSelectedAssignedDate(date); }}
                minDate={new Date()}
                showTimeSelect
                selected={duplicateAssignedDate}
                timeFormat="p"
                timeIntervals={10}
                dateFormat="Pp"
                placeholderText="Assigning Date"
              />
              <DatePicker
                className="form_input_items_navbar date_in_add_task"
                onChange={(date) => { handleSelectedDeadline(date); }}
                showTimeSelect
                minDate={new Date()}
                selected={duplicateDeadline}
                timeFormat="p"
                timeIntervals={10}
                dateFormat="Pp"
                placeholderText="Deadline"
              />
              <select className='form_input_items_navbar' id={priority ? "" : "make_priority_gray"} onChange={(e) => setPriority(e.target.value)}  >
                <option disabled selected> Priority </option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>

              <Button className='form_input_button_navbar' style={{ background: "rgb(141, 139, 139)", border: "none", outline: "none", padding: '10px 20px' }} onClick={handleAddTask}>
                Add task
              </Button>
            </div>


          </Offcanvas.Body>

        </Offcanvas>
        <IoIosNotificationsOutline className="nav_icon" size={25} id="pointer" />
        <div className="profile_icon" >
          <CgProfile className="nav_icon " size={25} id="pointer" onClick={() => { }} />
          <div className="profile_div">
            <span className="profile_item" ><BsFillPersonFill size={20} color="#2463F5" /> <span className="text" > {userName}</span> </span>
            <span className="profile_item" onClick={() => { localStorage.clear(); setUserName('') }}  ><AiOutlineLogout color="#F74036" size={20} /> Logout </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;



// Specific Time Range