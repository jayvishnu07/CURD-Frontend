import React, { useState } from 'react'

//libraries
import Skeleton from 'react-loading-skeleton'

//style sheets
import '../Css/Component.style/TaskDisplayWithPagination.css'

//custom components
import DisplayTask from './DisplayTask'
import Pagination from './Pagination'
import ToggleButton from './ToggleButton'


const TaskDisplayWithPagination = ({ toOrBytoggleOption, handleToOrBytoggleOption, count, currentPage, setCurrentPage, task }) => {

  const [taskPerPage] = useState(10)

  return (
    <div className="diplay_task_wrapper">
      {task !== null
        ?
        <div className="show_task_with_page_wrapper">
          <div className="toggle_with_page">
            <div className="today_toggle_container">
              <ToggleButton
                option1={"Task to me"}
                option2={"Task by me"}
                width='12rem'
                toggleOption={toOrBytoggleOption}
                handleToggleOption={handleToOrBytoggleOption}
              />
            </div>
            <div className="page_inside">
              <Pagination
                className="page"
                tasksPerPage={taskPerPage}
                totalTasks={count}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
          <div className='show_task_wrapper' >
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
  )
}

export default TaskDisplayWithPagination