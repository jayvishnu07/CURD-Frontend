import React, { useEffect, useRef, useState } from 'react'
import '../Css/Pages.style/Today.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import DisplayTask from "../Components/DisplayTask";
import Pagination from "../Components/Pagination";

import { ContextState } from "../ContextApi/ContextApi";
import axios from 'axios'
import 'react-responsive-pagination/themes/classic.css';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import { Button, Offcanvas } from 'react-bootstrap';
import { LuSearch } from 'react-icons/lu';
import { RxCross1 } from 'react-icons/rx';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { css } from 'glamor';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { logDOM } from '@testing-library/react';


const Today = () => {
  const { userName, showTaskDescription, task, setTask, setShowTaskDescription, showTodayFilter, setShowTodayFilter, recentEditHappen } = ContextState();

  const [searchInput, setSearchInput] = useState("");
  const [count, setCount] = useState(0);


  const [datetoggleOption, setDateToggleOption] = useState(true);
  const [toOrBytoggleOption, setToOrBytoggleOption] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [taskPerPage] = useState(10);

  const [date, setDate] = useState('');
  const [duplicateDate, setDuplicateDate] = useState(null);

  const [assignedBy, setAssignedBy] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  const [isFilterOn, setIsFilterOn] = useState(false)

  const handleCloseFilter = () => setShowTodayFilter(false)



  const getTask = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    if (isFilterOn) return;

    if (toOrBytoggleOption) {
      axios.get(`http://localhost:8080/api/v1/tasks/created?created=${formattedDate}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { if (!isFilterOn) { setTask(res?.data?.data); setCount(res?.data?.count); console.log("toOrBytoggleOption && datetoggleOption" + res?.data); } })
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
    else if (!toOrBytoggleOption) {
      axios.get(`http://localhost:8080/api/v1/tasks/created?created=${formattedDate}&by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { if (!isFilterOn) { setTask(res?.data?.data); setCount(res?.data?.count); console.log("toOrBytoggleOption && datetoggleOption" + res?.data); } })
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
  }




  const getTaskBySearchInput = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    console.log(formattedDate);



    if (toOrBytoggleOption) {
      axios.get(`http://localhost:8080/api/v2/tasks/created/${searchInput}?created=${formattedDate}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("toOrBytoggleOption && datetoggleOption search" + res?.data); })
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
    } else if (!toOrBytoggleOption) {
      axios.get(`http://localhost:8080/api/v2/tasks/created/${searchInput}?created=${formattedDate}&by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("toOrBytoggleOption && datetoggleOption search" + res?.data); })
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

  }

  useEffect(() => {
    if (searchInput) {
      setCurrentPage(1);
    }
  }, [searchInput]);



  // useEffect(() => {
  //   getTask();
  // }, [datetoggleOption, toOrBytoggleOption, recentEditHappen, currentPage]);





  // useEffect(() => {
  //   if (searchInput) {
  //     getTaskBySearchInput()
  //   } else {
  //     getTask();
  //   }
  // }, [searchInput])



  useEffect(() => {
    if (searchInput) {
      setCurrentPage(1)
      getTaskBySearchInput();
    } else if (isFilterOn) {
      handleFilterClick()
    }
    else {
      getTask();
    }
  }, [searchInput, currentPage, toOrBytoggleOption, recentEditHappen]);



  useEffect(() => {
    if (isFilterOn) {
      handleFilterClick()
    }
  }, [currentPage])

  useEffect(() => {
    if (!isFilterOn) {
      getTask()
    }
  }, [isFilterOn])


  const ToggleButtonForToMeOrByMe = () => {
    return (<>
      <div className='button_wrapper_today' id="pointer" >
        <div className={toOrBytoggleOption ? "button_item_today" : "blur_button_item_today"} onClick={() => { setCurrentPage(1); setIsFilterOn(false); setToOrBytoggleOption(true) }} > Task to me </div>
        <div className={toOrBytoggleOption ? "blur_button_item_today" : "button_item_today"} onClick={() => { setCurrentPage(1); setIsFilterOn(false); setToOrBytoggleOption(false) }} > Task by me </div>
      </div>
    </>)
  }

  const ToggleButtonForStartEndDate = () => {
    return (<>
      <div className='button_wrapper_today' id="pointer" >
        <div className={datetoggleOption ? "button_item_today" : "blur_button_item_today"} onClick={() => { setIsFilterOn(false); setDateToggleOption(true) }} > Starting </div>
        <div className={datetoggleOption ? "blur_button_item_today" : "button_item_today"} onClick={() => { setIsFilterOn(false); setDateToggleOption(false) }} > Ending </div>
      </div>
    </>)
  }

  const FilterToggleButton = () => {
    return (<>
      <div className='filter_button_wrapper_today' >
        {
          datetoggleOption
            ?
            <div className="button_item_filter_today"  > Deadline </div>
            :
            <div className="button_item_filter_today"  > Assigned Date </div>
        }
      </div>
    </>)
  }


  //PAGINATION
  var indexOfLastPost = currentPage * taskPerPage;
  var indexOfFirstPost = indexOfLastPost - taskPerPage;
  var currentTasks = task && task.slice(indexOfFirstPost, indexOfLastPost);

  if (searchInput) {
    var indexOfLastPost = task && Math.round(task.length / taskPerPage) * taskPerPage;
    var indexOfFirstPost = task && Math.round(task.length / taskPerPage);
    var currentTasks = task && task.slice(indexOfFirstPost, task.length);
  }

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);



  const handleFilterClick = () => {
    setIsFilterOn(true)
    setShowTodayFilter(false)
    setDuplicateDate(null)

    if (!date && !assignedBy && !assignedTo) {
      getTask();
      setIsFilterOn(false)
      setShowTodayFilter(false)
      toast.info(<b style={{ color: "#000" }} >No filters were given.</b>, {
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
    if (date || assignedBy || assignedTo) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      console.log(formattedDate);
      console.log("!getTask()");

      console.log(date);
      console.log(assignedBy);
      console.log(assignedTo);
      // getTask();
      toOrBytoggleOption
        ?
        (axios.get(`http://localhost:8080/api/v1/tasks/today/${formattedDate}?due=${date}&to=${userName}&by=${assignedBy}&page=${currentPage}&pageSize=${taskPerPage}`)
          .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log(`http://localhost:8080/api/v1/tasks/today/${formattedDate}?due=${date}&to=${userName}&by=${assignedBy}&page=${currentPage}&pageSize=${taskPerPage}`, res?.data, res.data.count); })
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
          }))
        :
        (axios.get(`http://localhost:8080/api/v1/tasks/today/${formattedDate}?due=${date}&to=${assignedTo}&by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
          .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log(`http://localhost:8080/api/v1/tasks/today/${formattedDate}?due=${date}&to=${assignedTo}&by=${userName}&page=${currentPage}&pageSize=${taskPerPage}` + res?.data, res.data.count); })
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
          }))
    }


  }

  const handleFilterOff = () => {
    setAssignedBy('')
    setAssignedTo('')
    setDate('')
    setDuplicateDate(null)
    setIsFilterOn(false);
    getTask();
  }

  const handleSelectedDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  }


  useEffect(() => {
    console.log("filter changed ", isFilterOn);
  }, [isFilterOn])


  return <div className={showTaskDescription ? "today_container_after" : "today_container"} >
    <div className="today_search_filter_wrapper">
      <div className="search_container_today">
        <div className='search_bar_container'>
          <div className="search_icons_wrapper" id='pointer'>
            {searchInput ? <RxCross1 size={20} onClick={() => setSearchInput('')} /> : <LuSearch size={20} />}
          </div>
          <input className='search_input' placeholder='Search task title...' type="text" value={searchInput} onChange={(e) => { setCurrentPage(1); setSearchInput(e.target.value) }} />
        </div>
      </div>
      <div className="filter_icon_today" id="pointer" >
        <div id={isFilterOn ? "filter_icon_today_active" : "filter_icon_today"} onClick={() => { setIsFilterOn(false); handleFilterOff() }} >
          <TbAdjustmentsHorizontal color="#696969" size={30} id='pointer' onClick={() => { setShowTaskDescription(false); (!isFilterOn && setShowTodayFilter((prev) => !prev)); }} />
        </div>


        <Offcanvas onBlur={() => { showTaskDescription && setShowTodayFilter(false) }} className="today_filter_canvas" show={showTodayFilter} onHide={handleCloseFilter} scroll={true} backdrop={false} placement="end"  >
          <div style={{ marginTop: "3vh" }} >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <div className="filter_icon_item_in_sidebar">
                  Filter
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
          </div>
          <Offcanvas.Body>

            {/* <FilterToggleButton /> */}

            <div className="today_canvas_body">
              <DatePicker
                className="canvas_body_item_inbox date_inbox"
                onChange={(date) => { handleSelectedDate(date); setDuplicateDate(date) }}
                selected={duplicateDate}
                placeholderText="Deadline"
              />
              {
                toOrBytoggleOption
                  ?
                  <input className="canvas_body_item" type="text" placeholder="Assigned by" onChange={(e) => { setAssignedBy(e.target.value); }} />
                  :
                  <input className="canvas_body_item" type="text" placeholder="Assigned to" onChange={(e) => { setAssignedTo(e.target.value); }} />

              }
            </div>
            <div className="filter_button"  >
              <Button style={{ background: "#8D8B8B", border: "none", outline: "none" }} onClick={() => { setCurrentPage(1); handleFilterClick() }}>Filter</Button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>

    <div className="diplay_task_wrapper">
      {task !== null
        ?
        <div className="show_task_with_page_wrapper_today">
          <div className="toggle_with_page_today">
            <div className="today_title_container">
              <ToggleButtonForToMeOrByMe />
              {/* <ToggleButtonForStartEndDate /> */}
            </div>
            <div className="page_inside">
              <Pagination
                className="page"
                postsPerPage={taskPerPage}
                totalPosts={count}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
          <div className='show_task_wrapper_in_today' >
            <DisplayTask task={task} />
          </div>
        </div>
        :
        <div className='loader' >
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </div>
      }

    </div>
  </div>
}

export default Today









  // @Override
  // public ResponseEntity<Object> getTodayTaskByDue(String today, String deadline, String assignedBy,String assigned_to, Integer page, Integer pageSize) {
  //     List<Task> tasks = null;
  //     Pageable pageable = null;
  //     pageable = PageRequest.of(page - 1, pageSize, Sort.by(Sort.Direction.DESC, "taskId"));
  //     int count = 0;
  //     String modifiedDatesStart = "";
  //     String modifiedDatesEnd = "";
  //     String modifiedDeadlineStart = "";
  //     String modifiedDeadlineEnd = "";

  //     if (today!= null && !today.isEmpty()) {
  //         try {
  //             LocalDate.parse(today, formatter1);
  //         } catch (DateTimeParseException e) {
  //             throw new TaskNotFoundException("Invalid Assigned Date. Expected format: yyyy-MM-dd");
  //         }
  //         modifiedDatesStart = today + " 00:00:00";
  //         modifiedDatesEnd = today + " 23:59:59";
  //     }
  //     if (deadline!= null && !deadline.isEmpty()) {
  //         try {
  //             LocalDate.parse(deadline, formatter1);
  //         } catch (DateTimeParseException e) {
  //             throw new TaskNotFoundException("Invalid Deadline. Expected format: yyyy-MM-dd");
  //         }
  //         modifiedDeadlineStart= deadline + " 00:00:00";
  //         modifiedDeadlineEnd = deadline + " 23:59:59";
  //     }

  //     if(assigned_to !=null && !assigned_to.equals("") && today!= null && !today.isEmpty()){
  //         if( deadline!= null && !deadline.isEmpty() && assignedBy!=null  && !assignedBy.equals("")){
  //             tasks = taskRepository.findByAssignedDateBetweenAndDueBetweenAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, modifiedDeadlineStart,modifiedDeadlineEnd, assignedBy,assigned_to, pageable);
  //             count = taskRepository.findByAssignedDateBetweenAndDueBetweenAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, modifiedDeadlineStart,modifiedDeadlineEnd, assignedBy,assigned_to).size();
  //             System.out.println("task findByAssignedDateBetweenAndDueAndAssignedByOrderByTaskIdDesc"+ tasks);

  //         }else if(assignedBy!=null  && !assignedBy.equals("")){
  //             tasks = taskRepository.findByAssignedDateBetweenAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, assignedBy,assigned_to, pageable);
  //             count = taskRepository.findByAssignedDateBetweenAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, assignedBy,assigned_to).size();
  //             System.out.println("task findByAssignedDateBetweenAndDueAndAssignedByOrderByTaskIdDesc"+ tasks);

  //         }else if( deadline!= null && !deadline.isEmpty()){
  //             tasks = taskRepository.findByAssignedDateBetweenAndDueBetweenAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, modifiedDeadlineStart,modifiedDeadlineEnd,assigned_to, pageable);
  //             count = taskRepository.findByAssignedDateBetweenAndDueBetweenAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, modifiedDeadlineStart,modifiedDeadlineEnd,assigned_to).size();
  //             System.out.println("task findByAssignedDateBetweenAndDueAndAssignedByOrderByTaskIdDesc"+ tasks);

  //         }

  //     }else if(assignedBy !=null && !assignedBy.equals("") && today!= null && !today.isEmpty()){
  //         if(assigned_to!=null  && !assigned_to.equals("")){
  //             tasks = taskRepository.findByAssignedDateBetweenAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, assignedBy,assigned_to, pageable);
  //             count = taskRepository.findByAssignedDateBetweenAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, assignedBy,assigned_to).size();
  //             System.out.println("task findByAssignedDateBetweenAndDueAndAssignedByOrderByTaskIdDesc"+ tasks);

  //         }else if( deadline!= null && !deadline.isEmpty()){
  //             tasks = taskRepository.findByAssignedDateBetweenAndDueBetweenAndAssignedByAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, modifiedDeadlineStart,modifiedDeadlineEnd,assignedBy, pageable);
  //             count = taskRepository.findByAssignedDateBetweenAndDueBetweenAndAssignedByAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd,modifiedDeadlineStart,modifiedDeadlineEnd,assignedBy).size();
  //             System.out.println("task findByAssignedDateBetweenAndDueAndAssignedByOrderByTaskIdDesc"+ tasks);
  //         }
  //     }

  //     System.out.println("task here"+ tasks);
  //     return successHandler.successMessageHandler("Task retrieved successfully", tasks, count);
  // }

  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

// @Override
// public ResponseEntity<Object> getTodayTaskByDue(String today, String deadline, String assignedBy,String assigned_to, Integer page, Integer pageSize) {
//     List<Task> tasks = null;
//     Pageable pageable = null;
//     pageable = PageRequest.of(page - 1, pageSize, Sort.by(Sort.Direction.DESC, "taskId"));
//     int count = 0;
//     String modifiedDatesStart = "";
//     String modifiedDatesEnd = "";
//     String modifiedDeadlineStart = "";
//     String modifiedDeadlineEnd = "";

//     if (today!= null && !today.isEmpty()) {
//         try {
//             LocalDate.parse(today, formatter1);
//         } catch (DateTimeParseException e) {
//             throw new TaskNotFoundException("Invalid Assigned Date. Expected format: yyyy-MM-dd");
//         }
//         modifiedDatesStart = today + " 00:00:00";
//         modifiedDatesEnd = today + " 23:59:59";
//     }
//     if (deadline!= null && !deadline.isEmpty()) {
//         try {
//             LocalDate.parse(deadline, formatter1);
//         } catch (DateTimeParseException e) {
//             throw new TaskNotFoundException("Invalid Deadline. Expected format: yyyy-MM-dd");
//         }
//         modifiedDeadlineStart= deadline + " 00:00:00";
//         modifiedDeadlineEnd = deadline + " 23:59:59";
//     }


//     System.out.println(
//             today+ deadline+ assigned_to+ assignedBy+ page+ pageSize
//     );

//     if(assigned_to !=null && !assigned_to.equals("") && today!= null && !today.isEmpty()){
//         if( deadline!= null && !deadline.isEmpty() && assignedBy!=null  && !assignedBy.equals("")){
//             tasks = taskRepository.findByAssignedDateBetweenAndDueAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, deadline, assignedBy,assigned_to, pageable);
//             count = taskRepository.findByAssignedDateBetweenAndDueAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, deadline, assignedBy,assigned_to).size();
//             System.out.println("task findByAssignedDateBetweenAndDueAndAssignedByOrderByTaskIdDesc"+ tasks);

//         }else if(assignedBy!=null  && !assignedBy.equals("")){
//             tasks = taskRepository.findByAssignedDateBetweenAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, assignedBy,assigned_to, pageable);
//             count = taskRepository.findByAssignedDateBetweenAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, assignedBy,assigned_to).size();
//             System.out.println("task findByAssignedDateBetweenAndDueAndAssignedByOrderByTaskIdDesc"+ tasks);

//         }else if( deadline!= null && !deadline.isEmpty()){
//             tasks = taskRepository.findByAssignedDateBetweenAndDueAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, deadline,assigned_to, pageable);
//             count = taskRepository.findByAssignedDateBetweenAndDueAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, deadline,assigned_to).size();
//             System.out.println("task findByAssignedDateBetweenAndDueAndAssignedByOrderByTaskIdDesc"+ tasks);

//         }

//     }else if(assignedBy !=null && !assignedBy.equals("") && today!= null && !today.isEmpty()){
//         if(assigned_to!=null  && !assigned_to.equals("")){
//             tasks = taskRepository.findByAssignedDateBetweenAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, assignedBy,assigned_to, pageable);
//             count = taskRepository.findByAssignedDateBetweenAndAssignedByAndAssignedToAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, assignedBy,assigned_to).size();
//             System.out.println("task findByAssignedDateBetweenAndDueAndAssignedByOrderByTaskIdDesc"+ tasks);

//         }else if( deadline!= null && !deadline.isEmpty()){
//             tasks = taskRepository.findByAssignedDateBetweenAndDueAndAssignedByAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd, deadline,assignedBy, pageable);
//             count = taskRepository.findByAssignedDateBetweenAndDueAndAssignedByAllIgnoreCaseOrderByTaskIdDesc(modifiedDatesStart,modifiedDatesEnd,deadline,assignedBy).size();
//             System.out.println("task findByAssignedDateBetweenAndDueAndAssignedByOrderByTaskIdDesc"+ tasks);

//         }

//     }

//     System.out.println("task here"+ tasks);
//     return successHandler.successMessageHandler("Task retrieved successfully", tasks, count);
// }










    // if (toOrBytoggleOption && datetoggleOption) {
    //   axios.get(`http://localhost:8080/api/v1/tasks/created?created=${formattedDate}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("toOrBytoggleOption && datetoggleOption" + res?.data); })
    //     .catch((err) => {
    //       toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
    //         className: css({
    //           background: "#pink"
    //         })
    //       }, {
    //         position: "top-center",
    //         autoClose: 1500,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: true,
    //         theme: "colored",
    //       });
    //     })
    // } else if (!toOrBytoggleOption && datetoggleOption) {
    //   axios.get(`http://localhost:8080/api/v1/tasks/created?created=${formattedDate}&by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("!toOrBytoggleOption && datetoggleOption" + res?.data); })
    //     .catch((err) => {
    //       toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
    //         className: css({
    //           background: "#pink"
    //         })
    //       }, {
    //         position: "top-center",
    //         autoClose: 1500,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: true,
    //         theme: "colored",
    //       });
    //     })
    // }
    // else if (toOrBytoggleOption && !datetoggleOption) {
    //   axios.get(`http://localhost:8080/api/v1/tasks/due?due=${formattedDate}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("toOrBytoggleOption && !datetoggleOption" + res?.data); })
    //     .catch((err) => {
    //       toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
    //         className: css({
    //           background: "#pink"
    //         })
    //       }, {
    //         position: "top-center",
    //         autoClose: 1500,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: true,
    //         theme: "colored",
    //       });
    //     })
    // }
    // else if (!toOrBytoggleOption && !datetoggleOption) {
    //   axios.get(`http://localhost:8080/api/v1/tasks/due?due=${formattedDate}&by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("!toOrBytoggleOption && !datetoggleOption" + res?.data); })
    //     .catch((err) => {
    //       toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
    //         className: css({
    //           background: "#pink"
    //         })
    //       }, {
    //         position: "top-center",
    //         autoClose: 1500,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: true,
    //         theme: "colored",
    //       });
    //     })
    // }



      // if (toOrBytoggleOption && datetoggleOption) {
    //   axios.get(`http://localhost:8080/api/v2/tasks/created/${searchInput}?created=${formattedDate}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("toOrBytoggleOption && datetoggleOption search" + res?.data); })
    //     .catch((err) => {
    //       toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
    //         className: css({
    //           background: "#pink"
    //         })
    //       }, {
    //         position: "top-center",
    //         autoClose: 1500,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: true,
    //         theme: "colored",
    //       });
    //     })
    // } else if (!toOrBytoggleOption && datetoggleOption) {
    //   axios.get(`http://localhost:8080/api/v2/tasks/created/${searchInput}?created=${formattedDate}&by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("!toOrBytoggleOption && datetoggleOption search" + res?.data); })
    //     .catch((err) => {
    //       toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
    //         className: css({
    //           background: "#pink"
    //         })
    //       }, {
    //         position: "top-center",
    //         autoClose: 1500,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: true,
    //         theme: "colored",
    //       });
    //     })
    // } else if (toOrBytoggleOption && !datetoggleOption) {
    //   axios.get(`http://localhost:8080/api/v2/tasks/due/${searchInput}?due=${formattedDate}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("toOrBytoggleOption && !datetoggleOption search" + res?.data); })
    //     .catch((err) => {
    //       toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
    //         className: css({
    //           background: "#pink"
    //         })
    //       }, {
    //         position: "top-center",
    //         autoClose: 1500,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: true,
    //         theme: "colored",
    //       });
    //     })
    // }
    // else if (!toOrBytoggleOption && !datetoggleOption) {
    //   axios.get(`http://localhost:8080/api/v2/tasks/due/${searchInput}?due=${formattedDate}&by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("!toOrBytoggleOption && !datetoggleOption search" + res?.data); })
    //     .catch((err) => {
    //       toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
    //         className: css({
    //           background: "#pink"
    //         })
    //       }, {
    //         position: "top-center",
    //         autoClose: 1500,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: true,
    //         theme: "colored",
    //       });
    //     })
    // }