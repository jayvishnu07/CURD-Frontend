import React, { useEffect, useState } from "react";
import '../Css/Pages.style/Inbox.css'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ContextState } from "../ContextApi/ContextApi";
import axios from 'axios'
import 'react-responsive-pagination/themes/classic.css';

import SearchBar from "material-ui-search-bar";
import Posts from "../Components/DisplayTask";
import Pagination from "../Components/Pagination";
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import { Button, Modal, Offcanvas } from "react-bootstrap";

const Inbox = () => {

  const { showTaskDescription, setShowTaskDescription, task, setTask, showFilter, setShowFilter } = ContextState();
  const [searchInput, setSearchInput] = useState("");
  const [renderInbox, setRenderInbox] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [showDeadlineFilter, setShowDeadlineFilter] = useState(false)
  const [showAssignedDateFilter, setShowAssignedDateFilter] = useState(false)

  const handleCloseFilter = () => setShowFilter(false)
  const handleCloseDealLineFilter = () => setShowDeadlineFilter(false)
  const handleCloseAssignedDateFilter = () => setShowAssignedDateFilter(false)

  const getTasks = () => {
    axios.get('http://localhost:8080/api/v1/tasks')
      .then((res) => { setTask(res?.data?.data); console.log(res.data.data); })
      .catch((err) => { console.log(err) })
  }

  useEffect(() => {
    getTasks();
  }, [renderInbox]);

  useEffect(() => {
    if (searchInput) {
      axios.get(`http://localhost:8080/api/v1/tasks/title/${searchInput}`)
        .then((res) => { setTask(res?.data?.data); console.log(res.data.data); })
        .catch((err) => { console.log(err) })
    } else {
      getTasks();
    }
  }, [searchInput])

  useEffect(() => {
    console.log("inputd = >", searchInput);
  }, [searchInput])

  //PAGINATION
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTasks = task && task.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return <div className={showTaskDescription ? "inbox_container_after" : "inbox_container"} >
    <div className="inbox_header_container">
      <div className="inbox_title_container" id="pointer" onClick={() => setRenderInbox((prev) => !prev)}>Inbox</div>
      <div className="search_container">
        <SearchBar placeholder="Search here . . ." onChange={(e) => setSearchInput(e)} />
      </div>
      <div className="filter_icon" id="pointer" >
        <TbAdjustmentsHorizontal size={30} onClick={() => { setShowTaskDescription(false); setShowFilter((prev) => !prev); }} />
        <Offcanvas className="filter_canvas" show={showFilter} onHide={handleCloseFilter} scroll={true} backdrop={false} placement="end" >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter <TbAdjustmentsHorizontal /></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="canvas_body">
              <input className="canvas_body_item" type="date" />
              <input className="canvas_body_item" type="text" placeholder="Assigned by" />
              <input className="canvas_body_item" type="text" placeholder="Assigned to" />
            </div>
            <div className="filter_button">
              <Button style={{ background: "#FFA500", border: "none", outline: "none" }} >Filter</Button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>

    </div>

    <div className="diplay_task_wrapper">
      {task !== null
        ?
        task.length > 0
          ?
          <div className="show_task_with_page_wrapper">
            <Pagination
              className="page"
              postsPerPage={postsPerPage}
              totalPosts={task.length}
              paginate={paginate}
            />
            <Posts task={currentTasks} />
          </div>
          :
          <div className="no_task_container">No task Available 🧐</div>
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
