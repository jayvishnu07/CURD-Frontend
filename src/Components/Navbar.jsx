import React, { useEffect, useState } from "react";

//libraries
import { Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from 'moment-timezone';
import DatePicker from "react-datepicker";

//style sheets
import "../Css/Component.style/Navbar.css";
import "react-datepicker/dist/react-datepicker.css";

//custom components
import { ContextState } from "../ContextApi/ContextApi";
import ShowToast from '../Components/ShowToast';
import { makePutAndPostRequest } from "../APIRequest/APIRequest";
import { API_VERSION_V2 } from "../utils/config";

//react icons
import { SlMenu } from "react-icons/sl";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdAdd, IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";


const Navbar = () => {
  const {
    userName,
    setUserName,
    setShowTaskDetails,
    setRecentEditHappen,
    setSelectedTask,
    showAddTask,
    setShowAddTask,
    setShowInboxFilter,
    setShowTodayFilter,
    setShowUpcomingFilter,
    setShowSidebar
  } = ContextState();

  const [taskTitle, setTaskTitle] = useState('')
  const [assignedDate, setAssignedDate] = useState('')
  const [due, setDue] = useState('')
  const [priority, setPriority] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  //duplicate dates to show in datepicker
  const [duplicateAssignedDate, setDuplicateAssignedDate] = useState(null);
  const [duplicateDue, setDuplicateDue] = useState(null);

  //state to disable enter button 
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true)

  //Date with time formate
  const dateFormate = 'YYYY-MM-DD HH:mm:ss';


  const handleMenuClick = () => {
    setShowSidebar((prev) => !prev)
  }

  // Function to close add task sidebar
  const handleClose = () => {
    setDuplicateAssignedDate(null)
    setDuplicateDue(null)
    setShowAddTask(false);
  }

  // Function validate task input 
  const handleTasKTitleInput = (e) => {
    if (e.target.value.length < 200) {
      setTaskTitle(e.target.value)
    }
    else {
      ShowToast({ message: `Task title should be under 200 characters.`, type: 'warn' });
      setTaskTitle(taskTitle.slice(0, 200))
    }
  }

  // Function to assign new task
  const handleAddTask = () => {
    setSelectedTask([]);
    if (taskTitle && assignedDate && due && priority && assignedTo) {

      const callbacks = {
        onSuccess: (res) => {
          setShowAddTask(false);
          setTaskTitle('')
          setAssignedDate('')
          setDue('')
          setPriority('')
          setAssignedTo('')
          setDuplicateDue(null)
          setDuplicateAssignedDate(null)
          setRecentEditHappen((prev) => !prev)
        }
      }

      makePutAndPostRequest('POST', `${API_VERSION_V2}`, {
        taskTitle: taskTitle,
        assignedDate: assignedDate,
        assignedTo: assignedTo,
        due: due,
        assignedBy: userName,
        priority: priority,
      },
        callbacks
      )
    }
  }

  //Function that handle dates ( handles date formates )
  const handleSelectedDate = (dateTime, setDuplicateDate, setDate) => {
    setDuplicateDate(dateTime)
    const formattedDateTime = moment(dateTime).format(dateFormate);
    if (formattedDateTime === "Invalid date") {
      setDate('');
    } else {
      setDate(formattedDateTime);
    }
  }

  const DateInput = ({ placeholder, duplicateDate, setDuplicateDate, setDate }) => (
    <DatePicker
      className="form_input_items_navbar date_in_add_task"
      onChange={(date) => { handleSelectedDate(date, setDuplicateDate, setDate); }}
      showTimeSelect
      minDate={new Date()}
      selected={duplicateDate}
      timeFormat="p"
      timeIntervals={10}
      dateFormat="Pp"
      placeholderText={placeholder}
    />
  )

  useEffect(() => {
    if (taskTitle && assignedDate && due && priority && assignedTo) {
      setIsAddButtonDisabled(false)
    }
    else {
      setIsAddButtonDisabled(true)
    }
  }, [taskTitle, assignedDate, due, priority, assignedTo])


  return (
    <div className="nav_container">
      <div className="nav_left">
        <SlMenu className="nav_icon" size={20} id="pointer" onClick={handleMenuClick} />
        <Link to='/' className="nav_icon" ><AiOutlineHome size={25} id="pointer" /></Link>
      </div>
      <div className="nav_right">
        <IoMdAdd size={25} className='add_task_icon nav_icon' onClick={() => { setShowTaskDetails(false); setShowInboxFilter(false); setShowTodayFilter(false); setShowUpcomingFilter(false); setShowAddTask((prev) => !prev) }} id='pointer' />
        <Offcanvas className='add_task_offcanvas' placement={'end'} show={showAddTask} onHide={handleClose} scroll={true} backdrop={false}>
          <div style={{ marginTop: "3vh" }} >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title> Add task</Offcanvas.Title>
            </Offcanvas.Header>
          </div>
          <Offcanvas.Body className="Offcanvas_body_navbar" >
            <div className="form_navbar">
              <input className='form_input_items_navbar' type="text" name='task_title' placeholder='Task' value={taskTitle} onChange={handleTasKTitleInput} />
              <input className='form_input_items_navbar' type="text" name='assigned_to' placeholder='Assigning to' onChange={(e) => setAssignedTo(e.target.value)} />
              <DateInput setDate={setAssignedDate} setDuplicateDate={setDuplicateAssignedDate} placeholder='Assigned date' duplicateDate={duplicateAssignedDate} />
              <DateInput setDate={setDue} setDuplicateDate={setDuplicateDue} duplicateDate={duplicateDue} placeholder='Deadline' />
              <select className='form_input_items_navbar' id={priority ? "" : "make_priority_gray"} onChange={(e) => setPriority(e.target.value)}  >
                <option disabled selected> Priority </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <Button disabled={isAddButtonDisabled} className='form_input_button_navbar' style={{ background: "rgb(141, 139, 139)", border: "none", outline: "none", padding: '10px 20px' }} onClick={handleAddTask}>
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