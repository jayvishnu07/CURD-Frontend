import React from 'react';
import "../Css/Component.style/DisplayTask.css"
import { ContextState } from '../ContextApi/ContextApi';
import { MdOutlineSubtitles } from "react-icons/md";
import { BsCalendar2Date, BsPersonFill } from "react-icons/bs";

const DisplayTask = ({ task }) => {

    const { setShowTaskDescription, showTaskDescriptionId, setShowTaskDescriptionId, setShowFilter } = ContextState();

    const handleTaskClick = (id) => {
        setShowFilter(false);
        setShowTaskDescriptionId(id);
        if (showTaskDescriptionId !== id) {
            setShowTaskDescription(true);
        }
        if (showTaskDescriptionId === id) {
            setShowTaskDescription((prev) => !prev);
        }
    }

    return (
        <div className="display_task_container">
            {task.map((obj) => {
                return (<div key={obj.taskId} className="display_task_item_wrapper" id="pointer" onClick={() => handleTaskClick(obj.taskId)} >
                    <span className="display_task_item" ><MdOutlineSubtitles size={17} color="#2ecf0a" /> {`Title : ${obj.taskDescription}`}</span><br />
                    <span className="display_task_item" ><BsCalendar2Date size={15} color="#f74036" /> {`Deadline : ${obj.due}`}</span><br />
                    <span className="display_task_item" ><BsPersonFill size={15} color="#2563f5" /> {`Assigned by : ${obj.assignedBy}`}</span><br />
                </div>
                )
            })}
        </div>
    );
};

export default DisplayTask;