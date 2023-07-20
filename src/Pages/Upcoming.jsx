import React, { useEffect, useState } from 'react'
import '../Css/Pages.style/Upcoming.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ContextState } from "../ContextApi/ContextApi";
import axios from 'axios'

import DisplayTask from "../Components/DisplayTask";
import Pagination from "../Components/Pagination";
import 'react-responsive-pagination/themes/classic.css';
import { TbAdjustmentsHorizontal } from 'react-icons/tb';
import { Button, Offcanvas } from 'react-bootstrap';
import { LuSearch } from 'react-icons/lu';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePicker from "react-datepicker";

import { css } from 'glamor';


const Upcoming = () => {

  const { userName, showTaskDescription, task, setTask, setShowTaskDescription, showUpcomingFilter, setShowUpcomingFilter, recentEditHappen } = ContextState();

  const [datetoggleOption, setDateToggleOption] = useState(true);
  const [toOrBytoggleOption, setToOrBytoggleOption] = useState(true);

  const [filterToggleOption, setFilterToggleOption] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [taskPerPage] = useState(10);

  const [taskCount, setTaskCount] = useState(0);


  const [date, setDate] = useState('');
  const [duplicateDate, setDuplicateDate] = useState(null);

  const [assignedBy, setAssignedBy] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  const [isFilterOn, setIsFilterOn] = useState(false)


  const handleCloseFilter = () => setShowUpcomingFilter(false)

  const getTasks = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    console.log("formatted = > " + formattedDate);
    console.log("looooooooooooooooooged");
    // if (toOrBytoggleOption && datetoggleOption) {
    //   axios.get(`http://localhost:8080/api/v2/tasks/starts-after/${formattedDate}?to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(res?.data?.data); })
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
    // else if (!toOrBytoggleOption && datetoggleOption) {
    //   axios.get(`http://localhost:8080/api/v2/tasks/starts-after/${formattedDate}?by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(res?.data?.data); })
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
    //   console.log("currentPage = ?", currentPage);
    //   console.log("taskPerPage = ?", taskPerPage);
    //   axios.get(`http://localhost:8080/api/v2/tasks/ends-after/${formattedDate}?to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(res?.data?.data); })
    //     .catch((err) => {
    //       console.log(err.response?.data);
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
    //   axios.get(`http://localhost:8080/api/v2/tasks/ends-after/${formattedDate}?by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
    //     .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(res?.data?.data); })
    //     .catch((err) => {
    //       toast.error(<b style={{ color: "#000" }} >{err?.response?.data?.message}</b>, {
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

    if (toOrBytoggleOption) {
      axios.get(`http://localhost:8080/api/v2/tasks/starts-after/${formattedDate}?to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(res?.data?.data); })
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
      axios.get(`http://localhost:8080/api/v2/tasks/starts-after/${formattedDate}?by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(res?.data?.data); })
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

    console.log("formatted = > " + formattedDate);
    setCurrentPage(1);

    console.log("getting in");

    if (toOrBytoggleOption) {
      axios.get(`http://localhost:8080/api/v1/tasks/upcoming/created/title/${searchInput}?created=${formattedDate}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(`http://localhost:8080/api/v1/tasks/upcoming/created/title/${searchInput}?created=${formattedDate}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}  `, res?.data?.data); })
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
      axios.get(`http://localhost:8080/api/v1/tasks/upcoming/created/title/${searchInput}?created=${formattedDate}&by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(`http://localhost:8080/api/v1/tasks/upcoming/created/title/${searchInput}?created=${formattedDate}&by=${userName}&page=${currentPage}&pageSize=${taskPerPage}  `, res?.data?.data); })
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
    console.log("Hererererererereererer");
    if (searchInput) {
      console.log("looged => ", searchInput);
      getTaskBySearchInput();
    }
    else if (isFilterOn) {
      handleFilterClick()
    }
    else {
      getTasks()
    }
  }, [searchInput, currentPage, toOrBytoggleOption, recentEditHappen])

  //PAGINATION
  const indexOfLastPost = currentPage * taskPerPage;
  const indexOfFirstPost = indexOfLastPost - taskPerPage;
  const currentTasks = task && task.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const ToggleButtonForToMeOrByMe = () => {
    return (<>
      <div className='button_wrapper_upcoming' id="pointer" >
        <div className={toOrBytoggleOption ? "button_item_upcoming" : "blur_button_item_upcoming"} onClick={() => { setCurrentPage(1); setToOrBytoggleOption(true) }} > Task to me </div>
        <div className={toOrBytoggleOption ? "blur_button_item_upcoming" : "button_item_upcoming"} onClick={() => { setCurrentPage(1); setToOrBytoggleOption(false) }} > Task by me </div>
      </div>
    </>)
  }

  const ToggleButtonForStartEndDate = () => {
    return (<>
      <div className='button_wrapper_today' id="pointer" >
        <div className={datetoggleOption ? "button_item_upcoming" : "blur_button_item_upcoming"} onClick={() => { setDateToggleOption(true) }} > Starting </div>
        <div className={datetoggleOption ? "blur_button_item_upcoming" : "button_item_upcoming"} onClick={() => { setDateToggleOption(false) }} > Ending </div>
      </div>
    </>)
  }

  const FilterToggleButton = () => {
    return (<>
      <div className='filter_button_wrapper_upcoming' id="pointer">
        <div className={filterToggleOption ? "button_item_upcoming" : "blur_button_item_upcoming"} onClick={() => { setFilterToggleOption(true) }} > Assigned date </div>
        <div className={filterToggleOption ? "blur_button_item_upcoming" : "button_item_upcoming"} onClick={() => { setFilterToggleOption(false) }} > Deadline </div>
      </div>
    </>)
  }


  const handleFilterClick = () => {
    setIsFilterOn(true);
    setShowUpcomingFilter(false)
    if (!date && !assignedBy && !assignedTo) {
      getTasks();
      setIsFilterOn(false)
      setShowUpcomingFilter(false)
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
      toOrBytoggleOption && filterToggleOption
        ?
        (axios.get(`http://localhost:8080/api/v2/tasks/created?created=${date}&by=${assignedBy}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
          .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(`http://localhost:8080/api/v1/tasks/created?created=${date}&by=${assignedBy}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage} `, res?.data); })
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
        toOrBytoggleOption && !filterToggleOption
          ?
          (axios.get(`http://localhost:8080/api/v2/tasks/due?due=${date}&by=${assignedBy}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
            .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(`http://localhost:8080/api/v1/tasks/due?due=${date}&by=${assignedBy}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage} `, res?.data?.data); })
            .catch((err) => {
              toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
                className: css({
                  background: "#pink"
                })
              },
                {
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
          !toOrBytoggleOption && filterToggleOption
            ?
            (axios.get(`http://localhost:8080/api/v2/tasks/created?created=${date}&by=${userName}&to=${assignedTo}&page=${currentPage}&pageSize=${taskPerPage}`)
              .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(`http://localhost:8080/api/v1/tasks/created?created=${date}&by=${userName}&to=${assignedTo}&page=${currentPage}&pageSize=${taskPerPage}  `, res?.data?.data); })
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
            (axios.get(`http://localhost:8080/api/v2/tasks/due?due=${date}&by=${userName}&to=${assignedTo}&page=${currentPage}&pageSize=${taskPerPage}`)
              .then((res) => { setTask(res?.data?.data); setTaskCount(res?.data?.count); console.log(`http://localhost:8080/api/v1/tasks/due?due=${date}&by=${userName}&to=${assignedTo}&page=${currentPage}&pageSize=${taskPerPage} `, res?.data?.data); })
              .catch((err) => {
                toast.error(<b style={{ color: "#000" }} >{err.response?.data?.message}</b>, {
                  className: css({
                    background: "#pink"
                  })
                },
                  {
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
    getTasks();
  }

  const handleSelectedDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
  }


  return (
    <div className={showTaskDescription ? "upcoming_container_after" : "upcoming_container"} >
      {console.log("currentPage - > log - >", currentPage)}
      <div className="upcoming_search_filter_wrapper">
        <div className="search_container_upcoming">
          <div className='search_bar_container'>
            <div className="search_icons_wrapper" id='pointer'>
              {searchInput ? <RxCross1 size={20} onClick={() => setSearchInput('')} /> : <LuSearch size={20} />}
            </div>
            <input className='search_input' type="text" placeholder='Search task title...' value={searchInput} onFocus={() => { setIsFilterOn(false); getTasks() }} onChange={(e) => { setCurrentPage(1); setSearchInput(e.target.value) }} />
          </div>
        </div>
        <div className="filter_icon_item_upcoming"  >
          <div id={isFilterOn ? "filter_icon_upcoming_active" : "filter_icon_upcoming"} onClick={handleFilterOff} >
            <TbAdjustmentsHorizontal color="#696969" size={30} id='pointer' onClick={() => { setShowTaskDescription(false); (!isFilterOn && setShowUpcomingFilter((prev) => !prev)); }} />
          </div>
          <Offcanvas className="upcoming_filter_canvas" show={showUpcomingFilter} onHide={handleCloseFilter} scroll={true} backdrop={false} placement="end" >
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
              <div className="filter_wrapper">
                <FilterToggleButton />
              </div>
              <div className="upcoming_canvas_body">
                <DatePicker
                  className="canvas_body_item_inbox date_inbox"
                  onChange={(date) => { handleSelectedDate(date); setDuplicateDate(date) }}
                  minDate={new Date()}
                  selected={duplicateDate}
                  placeholderText={filterToggleOption ? "Assigned Date" : "Deadline"}
                />
                {
                  toOrBytoggleOption
                    ?
                    <input className="canvas_body_item" type="text" placeholder="Assigned by" onChange={(e) => { setAssignedBy(e.target.value); }} />
                    :
                    <input className="canvas_body_item" type="text" placeholder="Assigned to" onChange={(e) => { setAssignedTo(e.target.value); }} />
                }
              </div>
              <div className="filter_button" >
                <Button style={{ background: "#8D8B8B", border: "none", outline: "none" }} onClick={() => { setDuplicateDate(null); setCurrentPage(1); handleFilterClick() }} >Filter</Button>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>

      </div>

      <div className="diplay_task_wrapper_upcoming">
        {task !== null
          ?
          <div className="show_task_with_page_wrapper_upcoming">
            <div className="toggle_with_page_upcoming">
              <div className="upcoming_title_container"><ToggleButtonForToMeOrByMe /> </div>
              <div className="page_inside_upcoming">
                <Pagination
                  className="page"
                  postsPerPage={taskPerPage}
                  totalPosts={taskCount}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
            <div className="show_task_wrapper_in_upcoming">
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
  )
}

export default Upcoming



