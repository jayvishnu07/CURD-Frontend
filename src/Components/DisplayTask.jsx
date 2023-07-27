import React, { useState } from 'react';

//style sheets
import "../Css/Component.style/DisplayTask.css"

//custom components
import { ContextState } from '../ContextApi/ContextApi';
import Model from './Model';
import { makeDeleteRequest, makePutAndPostRequest } from '../APIRequest/APIRequest';
import { API_VERSION_V1 } from '../utils/config';

//react icons
import { BsCalendar2Date, BsPersonFill, BsCheckCircleFill } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { ImBin } from "react-icons/im";
import { BiTask } from 'react-icons/bi';


const DisplayTask = ({ task }) => {

  const {
    userName,
    setShowTaskDetails,
    selectedTask, setSelectedTask,
    setShowInboxFilter,
    setShowTodayFilter,
    setShowUpcomingFilter,
    setEditMode,
    setRecentEditHappen,
    setShowAddTask,
  } = ContextState();

  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showMakeCompleteModel, setShowMakeCompleteModel] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState('');
  const [selectedForComplete, setSelectedForComplete] = useState('');

  // Funtion to show selected task details in sidebar
  const handleTaskClick = (task) => {
    setEditMode(false)
    setShowInboxFilter(false)
    setShowTodayFilter(false)
    setShowUpcomingFilter(false)
    setSelectedTask(task);
    if (!showMakeCompleteModel && selectedTask.taskId !== task.taskId) {
      setShowTaskDetails(true);
    }
    else if (!showMakeCompleteModel && selectedTask.taskId === task.taskId) {
      setShowTaskDetails((prev) => !prev);
    }
  }

  // Funtion to mark task completed through model
  const handleMarkCompleted = (id) => {
    const callbacks = {
      onSuccess: () => {
        setRecentEditHappen((prev) => !prev);
        setShowMakeCompleteModel(false)
      }
    }
    makePutAndPostRequest('PUT', `${API_VERSION_V1}/id/${id}`, { isCompleted: true }, callbacks)
  }

  // Funtion to delete task completed through model
  const handleDelete = (id) => {
    makeDeleteRequest(`${API_VERSION_V1}/id/${id}`, setRecentEditHappen, setShowDeleteModel)
  }

  //Display Item component
  const DisplayItem = ({ Logo, size, color, label, children }) => {
    return (
      <>
        <span className="display_task_item" ><Logo size={size} color={color} /> {label}{children && children}</span><br />
      </>
    )

  }

  return (
    <div className="display_task_container">
      {
        (task.length > 0)
          ?
          task.map((obj) => {
            return (
              <div key={obj.taskId} className={selectedTask.taskId === obj.taskId ? "display_task_item_container_active" : "display_task_item_container"}   >
                <div className="display_task_item_wrapper" id="pointer" onClick={() => { setShowAddTask(false); handleTaskClick(obj); }}>
                  <div className="display_content_div">
                    <DisplayItem Logo={BiTask} size={17} color={'#2ecf0a'} label={`Title : ${obj.taskTitle}`} >
                      <div className="title_span">
                        {
                          obj.isCompleted
                            ?
                            <FcApproval size={20} />
                            :
                            <>
                              <div
                                className="tooltip"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setSelectedForComplete(obj.taskId);
                                  setShowMakeCompleteModel(true);
                                }}>
                                <BsCheckCircleFill
                                  id="pointer"
                                  color="#8D8B8B"
                                  size={17}
                                />
                                <span className="tooltip-text" >Make this task completed.</span>
                              </div>
                              {showMakeCompleteModel && (
                                <Model title={"Finish task"} description={"Do you want to mark this task completed?"} buttonLable={"Mark as completed"} setShowModel={setShowMakeCompleteModel} selctedTask={selectedForComplete} handleModel={handleMarkCompleted}></Model>
                              )}
                            </>
                        }
                      </div>
                    </DisplayItem>
                    <span className="display_task_item" ><BsCalendar2Date size={15} color="#f74036" /> {`Deadline : ${obj.due}`}</span><br />
                    {
                      obj.assignedBy === userName
                        ?
                        <>
                          <DisplayItem Logo={BsPersonFill} size={15} color={'#2563f5'} label={`Assigned To : ${obj.assignedTo}`} />
                        </>
                        :
                        <>
                          <DisplayItem Logo={BsPersonFill} size={15} color={'#2563f5'} label={`Assigned by : ${obj.assignedBy}`} />
                        </>
                    }
                  </div>
                </div>
                <div className="display_delete_btn_div">
                  <div className="title_span">
                    <ImBin id='pointer' color='#ba1513' size={20} style={{ transform: "translateY(-50%) " }} onClick={() => { setShowDeleteModel(true); setSelectedForDelete(obj.taskId); }} />
                    {showDeleteModel && (
                      <Model title={'Confirm delete'} description={'Do you want to delete this task?'} buttonLable={"Delete"} setShowModel={setShowDeleteModel} selctedTask={selectedForDelete} handleModel={handleDelete}></Model>
                    )}
                  </div>
                </div>
              </div>
            )
          })
          :
          <div className="no_task_container">No tasks available 🧐</div>
      }
    </div>
  );
};

export default DisplayTask;

