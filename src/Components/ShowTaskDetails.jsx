import React, { useCallback, useEffect, useState } from 'react'

//libraries
import moment from 'moment-timezone';
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";

//style sheets
import '../Css/Component.style/ShowTaskDetails.css'
import "react-datepicker/dist/react-datepicker.css";

//custom components
import { ContextState } from "../ContextApi/ContextApi";
import { makePutAndPostRequest } from '../APIRequest/APIRequest';
import { API_VERSION_V1 } from '../utils/config';

//react icons
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { BsCalendar2Date, BsPersonFill } from "react-icons/bs";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { GrStatusGood } from "react-icons/gr";
import { ImCheckmark } from "react-icons/im";
import { FiEdit3 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";


const ShowTaskDetails = () => {

  const {
    userName,
    showTaskDetails,
    setShowTaskDetails,
    editMode,
    setEditMode,
    setRecentEditHappen,
    selectedTask,
    setSelectedTask,
  } = ContextState();

  const [taskTitle, setTaskTitle] = useState('')
  const [assignedDate, setAssignedDate] = useState('')
  const [due, setDue] = useState('')
  const [assignedBy, setAssignedBy] = useState('')
  const [priority, setPriority] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  //state to disable enter button 
  const [isSaveButtonDisable, setIsSaveButtonDisable] = useState(true)

  //duplicate dates to show in datepicker
  const [duplicateAssignedDate, setDuplicateAssignedDate] = useState(null)
  const [duplicateDue, setDuplicateDue] = useState(null)

  //Date with time formate
  const dateFormate = 'YYYY-MM-DD HH:mm:ss';

  const handleReturnClick = () => {
    setShowTaskDetails(false)
  }

  // Function to edit task
  const handleEdit = (id) => {

    const callbacks = {
      onSuccess: (res) => {
        setSelectedTask(res?.data?.data[0]);
        setEditMode(false);
        setRecentEditHappen(prev => !prev);
        setShowTaskDetails(false);
        setDuplicateAssignedDate(null);
        setDuplicateDue(null);
      }
    }

    makePutAndPostRequest('PUT', `${API_VERSION_V1}/id/${id}`, {
      assignedBy: assignedBy ? assignedBy : selectedTask.assignedBy,
      assignedTo: assignedTo ? assignedTo : selectedTask.assignedTo,
      taskTitle: taskTitle ? taskTitle : selectedTask.taskTitle,
      assignedDate: assignedDate ? assignedDate : selectedTask.assignedDate,
      due: due ? due : selectedTask.due,
      priority: priority ? priority : selectedTask.priority,
    },
      callbacks
    )
  }

  //Function that handle dates ( handles date formates )
  const handleSelectedDate = (dateString, setDuplicateDate, setDate) => {
    setDuplicateDate(dateString)
    const formattedDateTime = moment(dateString).format(dateFormate);
    if (formattedDateTime === "Invalid date") {
      setDate('');
    } else {
      setDate(formattedDateTime);

    }
  }

  const DateInput = ({ placeholder, duplicateDate, setDuplicateDate, setDate }) => (
    <DatePicker
      className="edit_input_item date_in_show_detail_edit"
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

  //Component to show table data
  const TableInput = React.memo(({ Logo, size, color, label, data, editMode, children }) => {
    return (
      <tr>
        <th className='first_child' ><Logo size={size} color={color} />{label}</th>
        <td id='colon' >:</td>
        {editMode ? (
          <td className='third_child' >
            {children}
          </td>
        ) : (
          <td className='third_child'>
            {data}
          </td>
        )}
      </tr>
    );
  });

  useEffect(() => {
    if (assignedBy || assignedTo || taskTitle || assignedDate || due || priority) {
      setIsSaveButtonDisable(false)
    }
    else {
      setIsSaveButtonDisable(true)
    }
  }, [assignedBy, assignedTo, taskTitle, assignedDate, due, priority])


  return (
    <div className={showTaskDetails ? 'show_task_desc_container_after' : "show_task_desc_container"}>

      <div className="description_title_container">
        <div className='description_title' >
          Task description
        </div>

        <div id='pointer' className='edit_cancel_wrapper' >
          {userName !== selectedTask.assignedTo && (!selectedTask.isCompleted && !editMode ? <FiEdit3 size={25} onClick={() => setEditMode((prev) => !prev)} style={{ height: "100%" }} id='pointer' /> : !selectedTask.isCompleted && <RxCross2 size={25} id="pointer" onClick={() => setEditMode(false)} />)}
          <RxCross2 className={!editMode ? "show_x_mark" : "hide_x_mark"} size={25} id={editMode ? "pointer" : ""} onClick={handleReturnClick} />
        </div>
      </div>

      {
        !editMode && selectedTask.isCompleted &&
        <div className="completed_container">
          <ImCheckmark size={25} color='#1fa700' /> This task is completed.
        </div>
      }

      <div className="selected_task_item_wrapper" >
        <table>
          <tbody>
            <tr>
              <th className='first_child' ><BiTask size={17} color='#2ecf0a' />Task</th>
              <td id='colon' >:</td>
              <td className='third_child' >{editMode ? <input className='edit_input_item' type="text" placeholder={selectedTask.taskTitle} onChange={e => setTaskTitle(e.target.value)} /> : selectedTask.taskTitle}</td>
            </tr>
            <tr>
              <th className='first_child' ><BsCalendar2Date size={15} color='#0324fc' />Assigned Date</th>
              <td id='colon' >:</td>
              <td className='third_child'  >{editMode ? <DateInput className='edit_input_item' setDate={setAssignedDate} setDuplicateDate={setDuplicateAssignedDate} placeholder='Assigned date' duplicateDate={duplicateAssignedDate} /> : selectedTask.assignedDate}</td>
            </tr>
            <tr>
              <th className='first_child' ><BsCalendar2Date size={15} color='#f74036' />Deadline</th>
              <td id='colon' >:</td>
              <td className='third_child' >{editMode ? <DateInput setDate={setDue} setDuplicateDate={setDuplicateDue} placeholder={'Deadline'} duplicateDate={duplicateDue} /> : selectedTask.due}</td>
            </tr>
            {
              userName === selectedTask.assignedBy
                ?
                <tr>
                  <th className='first_child' ><BsPersonFill size={15} color='#2563f5' />Assigned to</th>
                  <td id='colon' >:</td>
                  <td className='third_child' >{editMode ? <input className='edit_input_item' type="text" placeholder={selectedTask.assignedTo} onChange={e => setAssignedTo(e.target.value)} /> : selectedTask.assignedTo}</td>
                </tr>
                :
                !editMode &&
                <tr>
                  <th className='first_child' ><BsPersonFill size={15} color='#2563f5' />Assigned by</th>
                  <td id='colon' >:</td>
                  <td className='third_child' >{editMode ? <input className='edit_input_item' type="text" placeholder={selectedTask.assignedBy} onChange={e => setAssignedBy(e.target.value)} /> : selectedTask.assignedBy}</td>
                </tr>
            }
            <tr>
              <th className='first_child' >{selectedTask.priority === 'high' ? <FcHighPriority /> : selectedTask.priority === 'medium' ? <FcMediumPriority /> : <FcLowPriority />}Priority</th>
              <td id='colon' >:</td>
              <td className='third_child' >{editMode ?
                <select className='edit_input_item' id={!priority && "make_priority_gray"} onChange={(e) => setPriority(e.target.value)}  >
                  <option disabled selected> {selectedTask.priority} </option>
                  <option selected={selectedTask.priority === "low"} value="low">Low</option>
                  <option selected={selectedTask.priority === "medium"} value="medium">Medium</option>
                  <option selected={selectedTask.priority === "high"} value="high">High</option>
                </select>
                : selectedTask.priority}</td>
            </tr>
            {
              !editMode
              &&
              <tr>
                <th className='first_child'  >{selectedTask.isCompleted ? <GrStatusGood color='green' /> : <AiOutlineCloseCircle color='#f74036' />}Status</th>
                <td id='colon' >:</td>
                <td className='third_child' >{editMode ? <input className='edit_input_item' type="text" placeholder={selectedTask.isCompleted ? "Completed" : "Incomplete"} /> : selectedTask.isCompleted ? "Completed" : "Incomplete"}</td>
              </tr>
            }

          </tbody>
        </table>
        {
          editMode
          &&
          <div className="button_wrapper">
            <Button disabled={isSaveButtonDisable} style={{ background: "rgb(141, 139, 139)", border: "none", outline: "none" }} onClick={() => handleEdit(selectedTask.taskId)} >Save</Button>
          </div>
        }
      </div>
    </div >
  )
}

export default ShowTaskDetails
