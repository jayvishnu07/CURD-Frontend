import React, { useEffect, useState } from 'react'
import '../Css/Component.style/ShowTaskDescription.css'
import { ContextState } from "../ContextApi/ContextApi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { BsCalendar2Date, BsPersonFill } from "react-icons/bs";
import { FcHighPriority, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { GiSandsOfTime } from "react-icons/gi";
import { GrStatusGood } from "react-icons/gr";
import { ImCheckmark } from "react-icons/im";
import { FiEdit3 } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { TbFileDescription } from "react-icons/tb";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { css } from 'glamor';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowTaskDescription = () => {

  const { userName, showTaskDescription, setShowTaskDescription, showTaskDescriptionId, editMode, setEditMode, setRecentEditHappen } = ContextState();
  const [selectedTask, setSelectedTask] = useState([])
  const [showConfimBox, setShowConfimBox] = useState(false)
  const [showDeleteBox, setShowDeleteBox] = useState(false)

  const [taskDescription, setTaskDescription] = useState('')
  const [assignedDate, setAssignedDate] = useState('')
  const [due, setDue] = useState('')
  const [assignedBy, setAssignedBy] = useState('')
  const [priority, setPriority] = useState('')
  const [assignedTo, setAssignedTo] = useState('')



  useEffect(() => {
    if (showTaskDescriptionId) {
      axios.get(`http://localhost:8080/api/v1/tasks/id/${showTaskDescriptionId}`)
        .then((res) => { setSelectedTask((res?.data?.data).at(0)); })
        .catch((err) => {
          toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
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
        })
    }
  }, [showTaskDescriptionId]);

  const handleReturnClick = () => {
    setShowTaskDescription(false)
  }

  const handleEdit = (id) => {
    let formattedDateTime;

    if (assignedDate) {
      const dateTime = new Date(assignedDate);
      const date = dateTime.toISOString().slice(0, 10);
      const time = dateTime.toTimeString().slice(0, 8);
      formattedDateTime = date + " " + time;
    }

    axios.put(`http://localhost:8080/api/v1/tasks/id/${id}`, {
      assignedBy: assignedBy ? assignedBy : selectedTask.assignedBy,
      taskDescription: taskDescription ? taskDescription : selectedTask.taskDescription,
      assignedDate: assignedDate ? formattedDateTime : selectedTask.assignedDate,
      due: due ? due : selectedTask.due,
      priority: priority ? priority : selectedTask.priority,
    })
      .then((res) => {
        setSelectedTask((res?.data?.data).at(0));
        setEditMode(false);
        setRecentEditHappen((prev) => !prev);
        setShowTaskDescription(false);

        if (assignedBy || taskDescription || assignedDate || due || priority) {
          toast.success(<b style={{ color: "#000" }} >Edited Successfully.</b>, {
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
        else {
          toast.info(<b style={{ color: "#000" }} >Nothing to edit.</b>, {
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

      })
      .catch((err) => {
        toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
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
      })

  }
  useEffect(() => {
    console.log("current task id", selectedTask.taskId);
  }, [selectedTask.taskId])

  return (
    <div className={showTaskDescription ? 'show_task_desc_container_after' : "show_task_desc_container"}>

      <div className="description_title_container">
        <div className='description_title' >
          Task Description
        </div>

        <div id='pointer' className='edit_cancel_wrapper' >
          {userName !== selectedTask.assignedTo && (!selectedTask.isCompleted && !editMode ? <FiEdit3 size={25} onClick={() => setEditMode((prev) => !prev)} style={{ height: "100%" }} id='pointer' /> : !selectedTask.isCompleted && <RxCross2 size={25} id="pointer" onClick={() => setEditMode(false)} />)}
          <RxCross2 className={!editMode ? "show_x_mark" : "hide_x_mark"} size={25} id={editMode ? "pointer" : ""} onClick={handleReturnClick} />
        </div>
      </div>

      {
        !editMode && selectedTask.isCompleted &&
        <div className="completed_container">
          <ImCheckmark size={25} color='#1fa700' /> This task is Completed
        </div>
      }

      <div className="selected_task_item_wrapper" >
        <table>
          <tbody>
            <tr>
              <th className='first_child' ><BiTask size={17} color='#2ecf0a' />Task</th>
              <td id='colon' >:</td>
              <td className='third_child' >{editMode ? <input className='edit_input_item' type="text" placeholder={selectedTask.taskDescription} onChange={e => setTaskDescription(e.target.value)} /> : selectedTask.taskDescription}</td>
            </tr>
            <tr>
              <th className='first_child' ><BsCalendar2Date size={15} color='#0324fc' />Assigned Date</th>
              <td id='colon' >:</td>
              <td className='third_child'  >{editMode ? <input id='time' className='edit_input_item' type="datetime-local" defaultValue={selectedTask.assignedDate} onChange={e => setAssignedDate(e.target.value)} /> : selectedTask.assignedDate}</td>
            </tr>
            <tr>
              <th className='first_child' ><BsCalendar2Date size={15} color='#f74036' />Deadline</th>
              <td id='colon' >:</td>
              <td className='third_child' >{editMode ? <input id='time' className='edit_input_item' type="datetime-local" defaultValue={selectedTask.due} onChange={e => setDue(e.target.value)} /> : selectedTask.due}</td>
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
                <select className='edit_input_item' id={priority ? "" : "make_priority_gray"} onChange={(e) => setPriority(e.target.value)}  >
                  <option disabled selected> {selectedTask.priority} </option>
                  {selectedTask.priority === "low"
                    ?
                    <option selected value="low">low</option>
                    :
                    <option value="low">low</option>
                  }
                  {selectedTask.priority === "medium"
                    ?
                    <option selected value="medium">medium</option>
                    :
                    <option value="medium">medium</option>
                  }
                  {selectedTask.priority === "high"
                    ?
                    <option selected value="high">high</option>
                    :
                    <option value="high">high</option>
                  }


                </select>
                : selectedTask.priority}</td>
            </tr>
            {
              !editMode
              &&
              <>
                {/* <tr>
                  <th className='first_child' ><GiSandsOfTime size={17} color='#8c918c' />Duration given</th>
                  <td id='colon' >:</td>
                  <td className='third_child' >{editMode ? <input className='edit_input_item' type="text" placeholder={selectedTask.duration} /> : selectedTask.duration}</td>
                </tr> */}
                <tr>
                  <th className='first_child'  >{selectedTask.isCompleted ? <GrStatusGood color='green' /> : <AiOutlineCloseCircle color='#f74036' />}Status</th>
                  <td id='colon' >:</td>
                  <td className='third_child' >{editMode ? <input className='edit_input_item' type="text" placeholder={selectedTask.isCompleted ? "Completed" : "Incomplete"} /> : selectedTask.isCompleted ? "Completed" : "Incomplete"}</td>
                </tr>
              </>
            }

          </tbody>
        </table>
        {
          editMode
            ?
            <div className="button_wrapper">
              <Button style={{ background: "rgb(141, 139, 139)", border: "none", outline: "none" }} onClick={() => handleEdit(selectedTask.taskId)} >Save</Button>
            </div>
            :
            <></>
        }

      </div>

    </div >
  )
}

export default ShowTaskDescription

