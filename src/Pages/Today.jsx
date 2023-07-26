import React, { useEffect, useState } from 'react'

//libraries
import DatePicker from "react-datepicker";
import moment from 'moment-timezone';

//style sheets
import '../Css/Pages.style/Today.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-responsive-pagination/themes/classic.css';
import "react-datepicker/dist/react-datepicker.css";

//custom components
import { ContextState } from "../ContextApi/ContextApi";
import Filter from '../Components/Filter';
import SearchBar from '../Components/SearchBar';
import TaskDisplayWithPagination from '../Components/TaskDisplayWithPagination';
import { makeGetRequest } from '../APIRequest/APIRequest';
import { API_VERSION_V1, API_VERSION_V2 } from '../utils/config';

//react icons
import { TbAdjustmentsHorizontal } from 'react-icons/tb';


const Today = () => {
  const {
    userName,
    showTaskDetails,
    task,
    setTask,
    setShowTaskDetails,
    showTodayFilter,
    setShowTodayFilter,
    recentEditHappen
  } = ContextState();

  const [searchInput, setSearchInput] = useState("");
  const [count, setCount] = useState(0);
  const [date, setDate] = useState('');
  const [assignedBy, setAssignedBy] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  // turn on filter button
  const [isFilterOn, setIsFilterOn] = useState(false)

  //toggle button
  const [toOrBytoggleOption, setToOrBytoggleOption] = useState(true);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [taskPerPage] = useState(10);

  //duplicate date to show in datepicker
  const [duplicateDate, setDuplicateDate] = useState(null);

  //state to disable enter button 
  const [isDisabled, setIsDisabled] = useState(true)

  //Date formate
  const dateformate = "YYYY-MM-DD";

  const handleCloseFilter = () => {
    setShowTodayFilter(false)
    setIsDisabled(true)
  }

  //Get all tasks
  const getTask = () => {
    const currentDate = new Date();
    const formattedDate = moment(currentDate).format(dateformate);

    if (isFilterOn) return;
    makeGetRequest(`${API_VERSION_V1}/created?created=${formattedDate}&${toOrBytoggleOption ? 'to' : 'by'}=${userName}&page=${currentPage}&pageSize=${taskPerPage}`, setTask, setCount)
  }

  //Get searched tasks
  const getTaskBySearchInput = () => {
    const currentDate = new Date();
    const formattedDate = moment(currentDate).format(dateformate);
    makeGetRequest(`${API_VERSION_V2}/created/${searchInput}?created=${formattedDate}&${toOrBytoggleOption ? 'to' : 'by'}=${userName}&page=${currentPage}&pageSize=${taskPerPage}`, setTask, setCount)
  }

  //Toggel button [ Task to me | Task by me ]
  const handleToOrBytoggleOption = () => {
    setCurrentPage(1);
    setIsFilterOn(false);
    setToOrBytoggleOption((prev) => !prev)
  }

  // Filter toggel button [ Assigned date | Deadline ]
  const handleFilterToggleButton = () => {
    setIsFilterOn(true)
    setShowTodayFilter(false)
    setDuplicateDate(null)

    if (!date && !assignedBy && !assignedTo) {
      getTask();
      setIsFilterOn(false)
      setShowTodayFilter(false)
    }
    else if (date || assignedBy || assignedTo) {
      const currentDate = new Date();
      const formattedDate = moment(currentDate).format(dateformate);
      makeGetRequest(`${API_VERSION_V1}/today/${formattedDate}?due=${date}&to=${toOrBytoggleOption ? userName : assignedTo}&by=${toOrBytoggleOption ? assignedBy : userName}&page=${currentPage}&pageSize=${taskPerPage}`, setTask, setCount)
    }
  }

  //Function that handle dates ( handles date formates )
  const handleSelectedDate = (dateString) => {
    setDuplicateDate(dateString)
    const formattedDateTime = moment(dateString).format(dateformate);
    if (formattedDateTime === "Invalid date") {
      setDate('');
    } else {
      setDate(formattedDateTime);
    }
  }

  useEffect(() => {
    if (searchInput) {
      setCurrentPage(1)
      getTaskBySearchInput();
    } else if (isFilterOn) {
      handleFilterToggleButton()
    }
    else {
      setAssignedBy('')
      setAssignedTo('')
      setDate('')
      setDuplicateDate(null)
      setIsFilterOn(false);
      getTask();
    }
  }, [searchInput, currentPage, toOrBytoggleOption, recentEditHappen, isFilterOn]);

  useEffect(() => {
    if (date || assignedBy || assignedTo) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [date, assignedBy, assignedTo])


  return <div className={showTaskDetails ? "today_container_after" : "today_container"} >
    <div className="today_search_filter_wrapper">

      <SearchBar
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />

      <div className="filter_icon_today" id="pointer" >
        <div id={isFilterOn ? "filter_icon_today_active" : "filter_icon_today"} onClick={() => { setIsFilterOn(false); }} >
          <TbAdjustmentsHorizontal color="#696969" size={30} id='pointer' onClick={() => { setShowTaskDetails(false); (!isFilterOn && setShowTodayFilter((prev) => !prev)); setIsDisabled(true) }} />
        </div>

        <Filter
          className='filter_canvas'
          showFilter={showTodayFilter}
          handleCloseFilter={handleCloseFilter}
          setCurrentPage={setCurrentPage}
          handleFilterClick={handleFilterToggleButton}
          isDisabled={isDisabled}
        >
          <div className="today_canvas_body">
            <DatePicker
              className="canvas_body_item_inbox date_inbox"
              onChange={(date) => { handleSelectedDate(date); }}
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
        </Filter>
      </div>
    </div>

    <TaskDisplayWithPagination
      toOrBytoggleOption={toOrBytoggleOption}
      handleToOrBytoggleOption={handleToOrBytoggleOption}
      count={count}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      task={task}
    />

  </div>
}

export default Today