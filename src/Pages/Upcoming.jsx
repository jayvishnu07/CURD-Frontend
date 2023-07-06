import React, { useEffect, useState } from 'react'
import '../Css/Pages.style/Upcoming.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ContextState } from "../ContextApi/ContextApi";
import axios from 'axios'

import DisplayTask from "../Components/DisplayTask";
import Pagination from "../Components/Pagination";

const Upcoming = () => {

  const { showTaskDescription, task, setTask } = ContextState();
  const [toggleOption, setToggleOption] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    if (toggleOption) {
      axios.get(`http://localhost:8080/api/v1/tasks/starts-after/${formattedDate}`)
        .then((res) => { setTask(res?.data?.data); console.log(res.data.data); })
        .catch((err) => { console.log(err) })
    }
    else {
      axios.get(`http://localhost:8080/api/v1/tasks/ends-after/${formattedDate}`)
        .then((res) => { setTask(res?.data?.data); console.log(res.data.data); })
        .catch((err) => { console.log(err) })
    }
  }, [toggleOption]);


  //PAGINATION
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTasks = task && task.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  const ToggleButton = () => {
    return (<>
      <div className='button_wrapper' id="pointer">
        <div className={toggleOption ? "button_item" : "blur_button_item"} onClick={() => { setToggleOption(true) }} > Start date </div>
        <div className={toggleOption ? "blur_button_item" : "button_item"} onClick={() => { setToggleOption(false) }} > Deadline </div>
      </div>
    </>)
  }


  return (
    <div className={showTaskDescription ? "upcoming_container_after" : "upcoming_container"} >
      <div className="upcoming_title_container">Upcoming <ToggleButton /></div>
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
              <DisplayTask task={currentTasks} />
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
  )
}

export default Upcoming