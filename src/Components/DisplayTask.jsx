import React, { useState } from 'react';
import "../Css/Component.style/DisplayTask.css"
import { ContextState } from '../ContextApi/ContextApi';
import { MdOutlineSubtitles } from "react-icons/md";
import { BsCalendar2Date, BsPersonFill } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { BsCheckCircleFill } from "react-icons/bs";
import axios from 'axios';
import { ImBin } from "react-icons/im";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

const DisplayTask = ({ task }) => {

    const { userName, setShowTaskDescription, showTaskDescriptionId, setShowTaskDescriptionId, setShowInboxFilter, setShowTodayFilter, setShowUpcomingFilter, setEditMode, setRecentEditHappen, setShowAddTask } = ContextState();

    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [showMakeCompleteModel, setShowMakeCompleteModel] = useState(false);
    const [selctedForDelete, setSelctedForDelete] = useState('');
    const [selctedForComplete, setSelctedForComplete] = useState('');


    const handleTaskClick = (id) => {
        setEditMode(false)
        setShowInboxFilter(false)
        setShowTodayFilter(false)
        setShowUpcomingFilter(false)
        setShowTaskDescriptionId(id);
        if (!showMakeCompleteModel && showTaskDescriptionId !== id) {
            setShowTaskDescription(true);
        }
        if (!showMakeCompleteModel && showTaskDescriptionId === id) {
            setShowTaskDescription((prev) => !prev);
        }
    }


    const handleMakeCompleted = (id) => {
        axios.put(`http://localhost:8080/api/v1/tasks/id/${id}`, { isCompleted: true })
            .then((res) => {
                setRecentEditHappen((prev) => !prev);
                toast.success(<b style={{ color: "#000" }} >Marked as Completed.</b>, {
                    className: css({
                        background: "#pink"
                    })
                }, {
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
                setShowMakeCompleteModel(false)
            })
            .catch((err) => {
                toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>,
                    {
                        className: css({
                            background: "#pink"
                        })
                    }, {
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


    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/v1/tasks/id/${id}`)
            .then((res) => {
                console.log(res);
                toast.success(<b style={{ color: "#000" }} >Deleted Successfully.</b>, {
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
                setRecentEditHappen((prev) => !prev)
                setShowDeleteModel(false)
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

    return (
        <div className="display_task_container">
            {
                (task.length > 0)
                    ?
                    task.map((obj) => {
                        return (
                            <div key={obj.taskId} className={showTaskDescriptionId === obj.taskId ? "display_task_item_container_active" : "display_task_item_container"}   >

                                <div className="display_task_item_wrapper" id="pointer" onClick={() => { setShowAddTask(false); handleTaskClick(obj.taskId); }}>
                                    <div className="display_content_div">
                                        <span className="display_task_item"  ><MdOutlineSubtitles size={17} color="#2ecf0a" /> {`Title : ${obj.taskDescription}`}
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
                                                                    event.preventDefault();
                                                                    event.stopPropagation();
                                                                    setSelctedForComplete(obj.taskId);
                                                                    setShowMakeCompleteModel(true);
                                                                }}
                                                            >
                                                                <BsCheckCircleFill
                                                                    id="pointer"
                                                                    color="#8D8B8B"
                                                                    size={17}
                                                                />
                                                                <span className="tooltip-text" >Make this task Completed.</span>
                                                            </div>
                                                            {showMakeCompleteModel && (
                                                                <div className="confirmation-modal">
                                                                    <div className="confirmation-content">
                                                                        <h3 >Finish Task</h3>
                                                                        <p>Are you sure you want to make this task completed?</p>
                                                                        <div className="confirmation-buttons">
                                                                            <button className="delete-button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); handleMakeCompleted(selctedForComplete); console.log(selctedForComplete); }}>Mark as Complete</button>
                                                                            <button className="cancel-button" onClick={() => setShowMakeCompleteModel(false)}>Cancel</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </>
                                                }
                                            </div>
                                        </span><br />
                                        <span className="display_task_item" ><BsCalendar2Date size={15} color="#f74036" /> {`Deadline : ${obj.due}`}</span><br />
                                        {
                                            obj.assignedBy === userName
                                                ?
                                                <>
                                                    <span className="display_task_item" ><BsPersonFill size={15} color="#2563f5" /> {`Assigned To : ${obj.assignedTo}`}</span><br />
                                                </>
                                                :
                                                <>
                                                    <span className="display_task_item" ><BsPersonFill size={15} color="#2563f5" /> {`Assigned by : ${obj.assignedBy}`}</span><br />
                                                </>
                                        }
                                    </div>
                                </div>
                                <div className="display_delete_btn_div">
                                    <div className="title_span">
                                        <ImBin id='pointer' color='#ba1513' size={20} style={{ transform: "translateY(-50%) " }} onClick={() => { setShowDeleteModel(true); setSelctedForDelete(obj.taskId); console.log("deleted", obj.taskId); }} />
                                        {showDeleteModel && (
                                            <div className="confirmation-modal">
                                                <div className="confirmation-content">
                                                    <h3 > Confirm Delete</h3>
                                                    <p>Are you sure you want to delete this Task?</p>
                                                    <div className="confirmation-buttons">
                                                        <button className="delete-button" onClick={() => { handleDelete(selctedForDelete); console.log("deleted", selctedForDelete); }}>Delete</button>
                                                        <button className="cancel-button" onClick={() => setShowDeleteModel(false)}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="no_task_container">No task Available  🧐</div>
            }
        </div>
    );
};

export default DisplayTask;



