import React, { useEffect, useState } from 'react'

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
import TableInput from './TableInput';

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

            <TableInput data={selectedTask.taskTitle} editMode={editMode}>
              <BiTask size={17} color='#2ecf0a' /> Task
              <input className='edit_input_item' type="text" placeholder={selectedTask.taskTitle} onChange={e => setTaskTitle(e.target.value)} />
            </TableInput>

            <TableInput data={selectedTask.assignedDate} editMode={editMode}>
              <BsCalendar2Date size={15} color='#0324fc' /> Assigned Date
              <DateInput className='edit_input_item' setDate={setAssignedDate} setDuplicateDate={setDuplicateAssignedDate} placeholder='Assigned date' duplicateDate={duplicateAssignedDate} />
            </TableInput>

            <TableInput data={selectedTask.due} editMode={editMode} >
              <BsCalendar2Date size={15} color='#f74036' /> Deadline
              <DateInput setDate={setDue} setDuplicateDate={setDuplicateDue} placeholder={'Deadline'} duplicateDate={duplicateDue} />
            </TableInput>

            {
              userName === selectedTask.assignedBy
                ?
                <TableInput data={selectedTask.assignedTo} editMode={editMode}>
                  <BsPersonFill size={15} color='#2563f5' /> Assigned to
                  <input className='edit_input_item' type="text" placeholder={selectedTask.assignedTo} onChange={e => setAssignedTo(e.target.value)} />
                </TableInput>
                :
                !editMode
                &&
                <TableInput data={selectedTask.assignedBy} editMode={editMode}>
                  <BsPersonFill size={15} color='#2563f5' />Assigned by
                  <input className='edit_input_item' type="text" placeholder={selectedTask.assignedBy} onChange={e => setAssignedBy(e.target.value)} />
                </TableInput>
            }

            <TableInput data={selectedTask.assignedBy} editMode={editMode}>
              {selectedTask.priority === 'high' ? <FcHighPriority /> : selectedTask.priority === 'medium' ? <FcMediumPriority /> : <FcLowPriority />}Priority
              {
                editMode
                  ?
                  <select className='edit_input_item' id={!priority && "make_priority_gray"} onChange={(e) => setPriority(e.target.value)}  >
                    <option disabled selected> {selectedTask.priority} </option>
                    <option selected={selectedTask.priority === "low"} value="low">Low</option>
                    <option selected={selectedTask.priority === "medium"} value="medium">Medium</option>
                    <option selected={selectedTask.priority === "high"} value="high">High</option>
                  </select>
                  :
                  selectedTask.priority
              }
            </TableInput>
            {
              !editMode
              &&
              <TableInput data={selectedTask.isCompleted ? "Completed" : "Incomplete"} editMode={editMode}>
                {selectedTask.isCompleted ? <GrStatusGood color='green' /> : <AiOutlineCloseCircle color='#f74036' />}Status
                {editMode ? <input className='edit_input_item' type="text" placeholder={selectedTask.isCompleted ? "Completed" : "Incomplete"} /> : selectedTask.isCompleted ? "Completed" : "Incomplete"}
              </TableInput>
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

function TableRow({ }) {
  return (<><th className='first_child'><BiTask size={17} color='#2ecf0a' />Task</th>
    <td id='colon'>:</td></>);
}
