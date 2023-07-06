import React, { useEffect, useState } from 'react'
import '../Css/Component.style/ShowTaskDescription.css'
import { ContextState } from "../ContextApi/ContextApi";
import { AiOutlineArrowLeft, AiOutlineCloseCircle } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { BsCalendar2Date , BsPersonFill } from "react-icons/bs";
import { FcHighPriority , FcLowPriority,FcMediumPriority } from "react-icons/fc";
import { GiSandsOfTime } from "react-icons/gi";
import { GrStatusGood } from "react-icons/gr";
import axios from 'axios';


const ShowTaskDescription = () => {

  const { showTaskDescription, setShowTaskDescription, showTaskDescriptionId } = ContextState();
  const [selectedTask, setSelectedTask] = useState([])

  useEffect(() => {
    if (showTaskDescriptionId) {
      axios.get(`http://localhost:8080/api/v1/tasks/${showTaskDescriptionId}`)
        .then((res) => { setSelectedTask((res?.data?.data).at(0)); })
        .catch((err) => { console.log(err) })
    }
  }, [showTaskDescriptionId]);

  const handleReturnClick = () => {
    setShowTaskDescription(false)
  }

  return (
    <div className={showTaskDescription ? 'show_task_desc_container_after' : "show_task_desc_container"} >
      <div className="task_description_top">
        <AiOutlineArrowLeft size={25} id="pointer" onClick={handleReturnClick} />
      </div>
      <div className="description_title_container">Task Description</div>
      <div className="selected_task_item_wrapper">
        <span className='selected_task_item' > <BiTask size={17} color='#2ecf0a' /> {`Task : ${selectedTask.taskDescription}`} </span><br />
        <span className='selected_task_item' ><BsCalendar2Date size={15} color='#0324fc' /> {`Assigned Date : ${selectedTask.assignedDate}`} </span><br />
        <span className='selected_task_item' ><BsCalendar2Date size={15} color='#f74036' /> {`Deadline : ${selectedTask.due}`} </span><br />
        <span className='selected_task_item' ><BsPersonFill size={15} color='#2563f5' />{`Assigned by : ${selectedTask.assignedBy}`} </span><br />
        <span className='selected_task_item' > {selectedTask.priority === 'high'? <FcHighPriority /> : selectedTask.priority === 'medium' ? <FcMediumPriority/> : <FcLowPriority />} {`Priority : ${selectedTask.priority}`} </span><br />
        <span className='selected_task_item' ><GiSandsOfTime size={17} color='#8c918c'/> {`Duration given : ${selectedTask.duration}`} </span><br />
        <span className='selected_task_item' > {selectedTask.isCompleted ? <GrStatusGood color='green' /> : <AiOutlineCloseCircle color='#f74036' />} {`Status : ${selectedTask.isCompleted ? "Completed" : "Incompleted"}`} </span><br />
      </div>
    </div>
  )
}

export default ShowTaskDescription