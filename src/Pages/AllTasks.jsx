import React, { useEffect, useRef, useState } from "react";
import '../Css/Pages.style/AllTasks.css'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ContextState } from "../ContextApi/ContextApi";
import axios from 'axios'
import 'react-responsive-pagination/themes/classic.css';

import DisplayTask from "../Components/DisplayTask";
import Pagination from "../Components/Pagination";
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import { Button, Offcanvas } from "react-bootstrap";
import { LuSearch } from 'react-icons/lu';
import { RxCross1 } from 'react-icons/rx';
import { css } from 'glamor';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Inbox = () => {

  const { userName, showTaskDescription, setShowTaskDescription, task, setTask, showInboxFilter, setShowInboxFilter, recentEditHappen, setShowAddTask } = ContextState();
  const [searchInput, setSearchInput] = useState("");
  const [count, setCount] = useState(0);
  const [fromFilter, setFromFilter] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(false)
  const [isFilterClicked, setIsFilterClicked] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [TaskPerpage] = useState(10);

  const [date, setDate] = useState();
  const [duplicateDate, setDuplicateDate] = useState(null);
  const [assignedBy, setAssignedBy] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  const [toggleOption, setToggleOption] = useState(true);

  const [toOrBytoggleOption, setToOrBytoggleOption] = useState(true);


  const handleCloseFilter = () => {
    setDuplicateDate(null)
    setShowInboxFilter(false)
  }

  const getTasks = () => {
    console.log("in get task");

    setDate('')
    setAssignedBy('')
    setAssignedTo('')
    if (searchInput) return;
    toOrBytoggleOption
      ?
      axios.get(`http://localhost:8080/api/v1/tasks/created?to=${userName}&page=${currentPage}&pageSize=${TaskPerpage}`)
        .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log(res?.data?.data); })
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
      :
      axios.get(`http://localhost:8080/api/v1/tasks/created?by=${userName}&page=${currentPage}&pageSize=${TaskPerpage}`)
        .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log(res?.data?.data); })
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
    setIsFilterClicked(false)
    if (fromFilter) {
      handleFilterClick()
    } else {
      getTasks();
    }
  }, [recentEditHappen, currentPage]);

  useEffect(() => {
    getTasks()
  }, [toOrBytoggleOption])

  const getSearchedtask = () => {
    console.log(searchInput);
    console.log(userName);
    console.log(currentPage);
    console.log(TaskPerpage);
    toOrBytoggleOption
      ?
      axios.get(`http://localhost:8080/api/v2/tasks/due/${searchInput}?to=${userName}&page=${currentPage}&pageSize=${TaskPerpage}`)
        .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log(res?.data?.data); })
        .catch((err) => {
          console.log(err.response);

          toast.error(<b style={{ color: "#000" }} >{err?.response?.data?.message}</b>, {
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
      :
      axios.get(`http://localhost:8080/api/v2/tasks/due/${searchInput}?by=${userName}&page=${currentPage}&pageSize=${TaskPerpage}`)
        .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log(res?.data?.data); })
        .catch((err) => {
          console.log(err.response);

          toast.error(<b style={{ color: "#000" }} >{err?.response?.data?.message}</b>, {
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
    if (searchInput) {
      setCurrentPage(1);
    }
  }, [searchInput]);

  useEffect(() => {
    if (searchInput) {
      setCurrentPage(1)
      getSearchedtask();
    } else if (isFilterOn) {
      handleFilterClick()
    }
    else {
      getTasks();
    }
  }, [searchInput, currentPage, toOrBytoggleOption]);

  const ToggleButtonForToMeOrByMe = () => {
    return (<>
      <div className='button_wrapper_today' id="pointer" >
        <div className={toOrBytoggleOption ? "button_item_today" : "blur_button_item_today"} onClick={() => { setCurrentPage(1); setIsFilterOn(false); setToOrBytoggleOption(true) }} > Task to me </div>
        <div className={toOrBytoggleOption ? "blur_button_item_today" : "button_item_today"} onClick={() => { setCurrentPage(1); setIsFilterOn(false); setToOrBytoggleOption(false) }} > Task by me </div>
      </div>
    </>)
  }


  const ToggleButton = () => {
    return (<>
      <div className='button_wrapper_inbox' id="pointer" >
        <div className={toggleOption ? "button_item" : "blur_button_item"} onClick={() => { setToggleOption(true) }} > Assigned date </div>
        <div className={toggleOption ? "blur_button_item" : "button_item"} onClick={() => { setToggleOption(false) }} > Deadline </div>
      </div>
    </>)
  }

  //PAGINATION
  var indexOfLastPost = currentPage * TaskPerpage;
  var indexOfFirstPost = indexOfLastPost - TaskPerpage;
  var currentTasks = task && task.slice(indexOfFirstPost, indexOfLastPost);

  if (searchInput) {
    var indexOfLastPost = task && Math.round(task.length / TaskPerpage) * TaskPerpage;
    var indexOfFirstPost = task && Math.round(task.length / TaskPerpage);
    var currentTasks = task && task.slice(indexOfFirstPost, task.length);
  }

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleFilterClick = () => {
    setShowInboxFilter(false)
    if (date || assignedBy || assignedTo) {
      setIsFilterOn(true)


      console.log(date);
      console.log(assignedBy);
      console.log(assignedTo);
      console.log(currentPage);
      console.log(TaskPerpage);

      if (searchInput) {
        console.log("return");
        return
      };
      setFromFilter(true);
      toggleOption && toOrBytoggleOption
        ?
        (axios.get(`http://localhost:8080/api/v1/tasks/created?created=${date}&by=${assignedBy}&to=${userName}&page=${currentPage}&pageSize=${TaskPerpage}`)
          .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log(`filter 1 -> http://localhost:8080/api/v1/tasks/created?created=${date}&by=${assignedBy}&to=${userName}&page=${currentPage}&pageSize=${TaskPerpage}`, res?.data?.data); })
          .catch((err) => {
            console.log(err.response);

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
        !toggleOption && toOrBytoggleOption
          ?
          (axios.get(`http://localhost:8080/api/v1/tasks/due?due=${date}&by=${assignedBy}&to=${userName}&page=${currentPage}&pageSize=${TaskPerpage}`)
            .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("filter 2", res?.data?.data); })
            .catch((err) => {
              console.log(err.response);
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
          toggleOption && !toOrBytoggleOption
            ?
            (axios.get(`http://localhost:8080/api/v1/tasks/created?created=${date}&by=${userName}&to=${assignedTo}&page=${currentPage}&pageSize=${TaskPerpage}`)
              .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("filter 3", res?.data?.data); })
              .catch((err) => {
                console.log(err.response);
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

            (axios.get(`http://localhost:8080/api/v1/tasks/due?due=${date}&by=${userName}&to=${assignedTo}&page=${currentPage}&pageSize=${TaskPerpage}`)
              .then((res) => { setTask(res?.data?.data); setCount(res?.data?.count); console.log("filter 4", res?.data?.data); })
              .catch((err) => {
                console.log(err.response);
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
    else {
      getTasks();
    }
  }

  useEffect(() => {
    console.log("isFilterClicked ", isFilterClicked);
    if (isFilterClicked && !date && !assignedBy && !assignedTo) {
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
  }, [isFilterClicked])



  const handleFilterOff = () => {
    setDuplicateDate(null)
    setIsFilterOn(false)
    setDuplicateDate(null)
    setAssignedBy('')
    setAssignedTo('')
    setDate('')
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

  return <div className={showTaskDescription ? "inbox_container_after" : "inbox_container"} >

    <div className="inbox_header_container">

      <div className="search_container_inbox">
        <div className='search_bar_container_inbox'>
          <div className="search_icons_wrapper_inbox" id='pointer'>
            {searchInput ? <RxCross1 size={20} onClick={() => setSearchInput('')} /> : <LuSearch size={20} />}
          </div>
          <input className='search_input' placeholder="Search task title..." type="text" value={searchInput} onFocus={() => { setIsFilterOn(false); getTasks() }} onChange={(e) => setSearchInput(e.target.value)} />
        </div>
      </div>

      <div className="filter_icon"  >
        <div className={isFilterOn ? "filter_icon_inbox_active " : "filter_icon_inbox "} id="pointer" onClick={handleFilterOff} >
          <TbAdjustmentsHorizontal color="#696969" size={30} onClick={() => { setShowAddTask(false); setShowTaskDescription(false); (!isFilterOn && setShowInboxFilter((prev) => !prev)); }} />
        </div>

        <Offcanvas className="filter_canvas_inbox" show={showInboxFilter} onHide={handleCloseFilter} scroll={true} backdrop={false} placement="end" >
          <div style={{ marginTop: "3vh" }} >

            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <div className="filter_icon_item_in_sidebar">
                  Filter
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
          </div>
          <Offcanvas.Body className="Offcanvas_body" >

            <ToggleButton />
            <div className="canvas_body_inbox">
              <DatePicker
                className="canvas_body_item_inbox date_inbox"
                onChange={(date) => { handleSelectedDate(date); setDuplicateDate(date) }}
                selected={duplicateDate}
                placeholderText={toggleOption ? "Assigned Date" : "Deadline"}
              />
              {
                toOrBytoggleOption
                  ?
                  <input className="canvas_body_item_inbox" type="text" placeholder="Assigned by" onChange={(e) => { setAssignedBy(e.target.value); }} />
                  :
                  <input className="canvas_body_item_inbox" type="text" placeholder="Assigned to" onChange={(e) => { setAssignedTo(e.target.value); }} />
              }
            </div>
            <div className="filter_button_inbox"  >
              <Button style={{ background: "#8D8B8B", border: "none", outline: "none" }} onClick={() => { setCurrentPage(1); setIsFilterClicked(true); handleFilterClick() }} >Filter</Button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

    </div>

    <div className="diplay_task_wrapper_inbox">
      {task !== null
        ?
        <div className="show_task_with_page_wrapper">
          <div className="toggle_with_page_inbox">

            <div className="today_title_container"> <ToggleButtonForToMeOrByMe /> </div>
            <Pagination
              className="page"
              postsPerPage={TaskPerpage}
              totalPosts={count}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>

          <div className='show_task_wrapper_in_inbox' >
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
};

export default Inbox;
