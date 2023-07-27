import React, { useEffect, useState } from "react";

//libraries
import DatePicker from "react-datepicker";
import moment from 'moment-timezone';

//style sheets
import '../Css/Pages.style/AllTasks.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-responsive-pagination/themes/classic.css';
import "react-datepicker/dist/react-datepicker.css";

//custom components
import { ContextState } from "../ContextApi/ContextApi";
import Filter from "../Components/Filter";
import ToggleButton from "../Components/ToggleButton";
import SearchBar from "../Components/SearchBar";
import TaskDisplayWithPagination from "../Components/TaskDisplayWithPagination";
import { makeGetRequest } from "../APIRequest/APIRequest";
import { API_VERSION_V1, API_VERSION_V2 } from "../utils/config";

//react icons
import { TbAdjustmentsHorizontal } from 'react-icons/tb'

const Inbox = () => {

  const {
    userName,
    showTaskDetails,
    setShowTaskDetails,
    task,
    setTask,
    count,
    setCount,
    showInboxFilter,
    setShowInboxFilter,
    recentEditHappen,
    setShowAddTask,
  } = ContextState();

  const [searchInput, setSearchInput] = useState("");
  const [date, setDate] = useState();
  const [assignedBy, setAssignedBy] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  // turn on filter button
  const [isFilterOn, setIsFilterOn] = useState(false)

  //state to disable enter button
  const [isDisabled, setIsDisabled] = useState(true)

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [TaskPerpage] = useState(10);

  //toggle state
  const [filterToggleOption, setFilterToggleOption] = useState(true);
  const [toOrBytoggleOption, setToOrBytoggleOption] = useState(true);

  //duplicate date to show in datepicker
  const [duplicateDate, setDuplicateDate] = useState(null);

  //Date formate
  const dateformate = "YYYY-MM-DD";

  //Get all the tasks
  const getTasks = () => {
    setDate('')
    setAssignedBy('')
    setAssignedTo('')
    if (searchInput) return;
    makeGetRequest(`${API_VERSION_V1}/${toOrBytoggleOption ? 'created?to' : 'created?by'}=${userName}&page=${currentPage}&pageSize=${TaskPerpage}`, setTask, setCount)
  }


  //Get searched task
  const getSearchedtask = () => {
    makeGetRequest(`${API_VERSION_V2}/due/${searchInput}?${toOrBytoggleOption ? 'to' : 'by'}=${userName}&page=${currentPage}&pageSize=${TaskPerpage}`, setTask, setCount)
  }

  //Toggel button [ Task to me | Task by me ]
  const handleToOrBytoggleOption = () => {
    setCurrentPage(1);
    setIsFilterOn(false);
    setToOrBytoggleOption((prev) => !prev)
  }


  // Filter toggel button [ Assigned date | Deadline ]
  const handleFilterToggleButton = () => {
    setFilterToggleOption((prev) => !prev)
  }

  //Get filtered tasks
  const handleFilterClick = () => {
    setShowInboxFilter(false)

    if (searchInput) return;

    if (date || assignedBy || assignedTo) {
      setIsFilterOn(true)
      makeGetRequest(`${API_VERSION_V1}/${filterToggleOption ? "created?created" : "due?due"}=${date}&by=${toOrBytoggleOption ? assignedBy : userName}&to=${toOrBytoggleOption ? userName : assignedTo}&page=${currentPage}&pageSize=${TaskPerpage}`, setTask, setCount)
    }
    else {
      getTasks();
    }
  }


  const handleCloseFilter = () => {
    setDuplicateDate(null)
    setShowInboxFilter(false)
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
      getSearchedtask();
    }
    else if (isFilterOn) {
      handleFilterClick()
    }
    else {
      setDuplicateDate(null)
      setAssignedBy('')
      setAssignedTo('')
      setDate('')
      getTasks();
    }
  }, [searchInput, currentPage, toOrBytoggleOption, recentEditHappen, isFilterOn]);

  //useEffect to handle disable and enable enter button
  useEffect(() => {
    if (date || assignedBy || assignedTo) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [date, assignedBy, assignedTo])

  return (
    <div className={showTaskDetails ? "inbox_container_after" : "inbox_container"} >

      <div className="inbox_header_container">
        <SearchBar
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />

        <div className="filter_icon"  >
          <div className={isFilterOn ? "filter_icon_inbox_active " : "filter_icon_inbox "} id="pointer" onClick={() => setIsFilterOn(false)} >
            <TbAdjustmentsHorizontal color="#696969" size={30} onClick={() => { setShowAddTask(false); setShowTaskDetails(false); (!isFilterOn && setShowInboxFilter((prev) => !prev)); }} />
          </div>

          <Filter
            showFilter={showInboxFilter}
            handleCloseFilter={handleCloseFilter}
            setCurrentPage={setCurrentPage}
            handleFilterClick={handleFilterClick}
            isDisabled={isDisabled}
          >
            <div className="filter_wrapper">

              <ToggleButton
                option1={"Assigned date"}
                option2={"Deadline"}
                width='80%'
                toggleOption={filterToggleOption}
                handleToggleOption={handleFilterToggleButton}
              />
            </div>
            <div className="canvas_body_inbox">
              <DatePicker
                className="canvas_body_item_inbox date_inbox"
                onChange={(date) => { handleSelectedDate(date); }}
                selected={duplicateDate}
                placeholderText={filterToggleOption ? "Assigned date" : "Deadline"}
              />
              {
                toOrBytoggleOption
                  ?
                  <input className="canvas_body_item_inbox" type="text" placeholder="Assigned by" onChange={(e) => { setAssignedBy(e.target.value); }} />
                  :
                  <input className="canvas_body_item_inbox" type="text" placeholder="Assigned to" onChange={(e) => { setAssignedTo(e.target.value); }} />
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

  )
};

export default Inbox;
