import React, { useEffect, useState } from 'react'

//libraries
import axios from 'axios'
import moment from 'moment-timezone';
import DatePicker from "react-datepicker";

//style sheets
import '../Css/Pages.style/Upcoming.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-responsive-pagination/themes/classic.css';

//react icons
import { TbAdjustmentsHorizontal } from 'react-icons/tb';

//custom components
import { ContextState } from "../ContextApi/ContextApi";
import ShowToast from '../Components/ShowToast';
import Filter from '../Components/Filter';
import ToggleButton from '../Components/ToggleButton';
import SearchBar from '../Components/SearchBar';
import TaskDisplayWithPagination from '../Components/TaskDisplayWithPagination';


const Upcoming = () => {

  const {
    userName,
    showTaskDetails,
    task,
    setTask,
    setShowTaskDetails,
    showUpcomingFilter,
    setShowUpcomingFilter,
    recentEditHappen,
  } = ContextState();

  const [date, setDate] = useState('');
  const [searchInput, setSearchInput] = useState("");
  const [count, setCount] = useState(0);
  const [assignedBy, setAssignedBy] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  // turn on filter button
  const [isFilterOn, setIsFilterOn] = useState(false)

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [taskPerPage] = useState(10);

  //toggle button
  const [toOrBytoggleOption, setToOrBytoggleOption] = useState(true);
  const [filterToggleOption, setFilterToggleOption] = useState(true);

  //duplicate date to show in datepicker
  const [duplicateDate, setDuplicateDate] = useState(null);

  //state to disable enter button 
  const [isDisabled, setIsDisabled] = useState(true)


  const handleCloseFilter = () => setShowUpcomingFilter(false)

  //Get all tasks
  const getTasks = () => {
    const currentDate = new Date();
    const formattedDate = moment(currentDate).format('YYYY-MM-DD');

    if (toOrBytoggleOption) {
      axios.get(`/v2/tasks/starts-after/${formattedDate}?to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { setTask(res.data.data); setCount(res.data.count); })
        .catch((err) => {
          ShowToast({ message: `${err.response.data.message}`, type: 'error' });
        })
    }
    else if (!toOrBytoggleOption) {
      axios.get(`/v2/tasks/starts-after/${formattedDate}?by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { setTask(res.data.data); setCount(res.data.count); })
        .catch((err) => {
          ShowToast({ message: `${err.response.data.message}`, type: 'error' });
        })
    }
  }

  //Get searched tasks
  const getTaskBySearchInput = () => {
    const currentDate = new Date();
    const formattedDate = moment(currentDate).format('YYYY-MM-DD');

    setCurrentPage(1);

    if (toOrBytoggleOption) {
      axios.get(`/v1/tasks/upcoming/created/title/${searchInput}?created=${formattedDate}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { setTask(res.data.data); setCount(res.data.count); })
        .catch((err) => {
          ShowToast({ message: `${err.response.data.message}`, type: 'error' });
        })
    }
    else if (!toOrBytoggleOption) {
      axios.get(`/v1/tasks/upcoming/created/title/${searchInput}?created=${formattedDate}&by=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
        .then((res) => { setTask(res.data.data); setCount(res.data.count); })
        .catch((err) => {
          ShowToast({ message: `${err.response.data.message}`, type: 'error' });
        })
    }
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

  // Function to handle filter
  const handleFilterClick = () => {
    setIsFilterOn(true);
    setShowUpcomingFilter(false)
    if (!date && !assignedBy && !assignedTo) {
      getTasks();
      setIsFilterOn(false)
      setShowUpcomingFilter(false)
    }

    if (date || assignedBy || assignedTo) {
      toOrBytoggleOption && filterToggleOption
        ?
        (axios.get(`/v2/tasks/created?created=${date}&by=${assignedBy}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
          .then((res) => { setTask(res.data.data); setCount(res.data.count); })
          .catch((err) => {
            ShowToast({ message: `${err.response.data.message}`, type: 'error' });
          }))
        :
        toOrBytoggleOption && !filterToggleOption
          ?
          (axios.get(`/v2/tasks/due?due=${date}&by=${assignedBy}&to=${userName}&page=${currentPage}&pageSize=${taskPerPage}`)
            .then((res) => { setTask(res.data.data); setCount(res.data.count); })
            .catch((err) => {
              ShowToast({ message: `${err.response.data.message}`, type: 'error' });
            }))
          :
          !toOrBytoggleOption && filterToggleOption
            ?
            (axios.get(`/v2/tasks/created?created=${date}&by=${userName}&to=${assignedTo}&page=${currentPage}&pageSize=${taskPerPage}`)
              .then((res) => { setTask(res.data.data); setCount(res.data.count); })
              .catch((err) => {
                ShowToast({ message: `${err.response.data.message}`, type: 'error' });
              }))
            :
            (axios.get(`/v2/tasks/due?due=${date}&by=${userName}&to=${assignedTo}&page=${currentPage}&pageSize=${taskPerPage}`)
              .then((res) => { setTask(res.data.data); setCount(res.data.count); })
              .catch((err) => {
                ShowToast({ message: `${err.response.data.message}`, type: 'error' });
              }))
    }
  }

  //Function that handle dates ( handles date formates )
  const handleSelectedDate = (dateString) => {
    setDuplicateDate(dateString)
    const formattedDateTime = moment(dateString).format('YYYY-MM-DD HH:mm:ss');
    if (formattedDateTime === "Invalid date") {
      setDate('');
    } else {
      setDate(formattedDateTime);
    }
  }

  useEffect(() => {
    if (searchInput) {
      getTaskBySearchInput();
    }
    else if (isFilterOn) {
      handleFilterClick()
    }
    else {
      setAssignedBy('')
      setAssignedTo('')
      setDate('')
      setDuplicateDate(null)
      getTasks();
    }
  }, [searchInput, currentPage, toOrBytoggleOption, recentEditHappen, isFilterOn])

  useEffect(() => {
    if (date || assignedBy || assignedTo) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [date, assignedBy, assignedTo])

  return (
    <div className={showTaskDetails ? "upcoming_container_after" : "upcoming_container"} >
      <div className="upcoming_search_filter_wrapper">
        <SearchBar
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
        <div className="filter_icon_item_upcoming"  >
          <div id={isFilterOn ? "filter_icon_upcoming_active" : "filter_icon_upcoming"} onClick={() => setIsFilterOn(false)} >
            <TbAdjustmentsHorizontal color="#696969" size={30} id='pointer' onClick={() => { setShowTaskDetails(false); (!isFilterOn && setShowUpcomingFilter((prev) => !prev)); }} />
          </div>
          <Filter
            showFilter={showUpcomingFilter}
            handleCloseFilter={handleCloseFilter}
            setCurrentPage={setCurrentPage}
            handleFilterClick={handleFilterClick}
            isDisabled={isDisabled}
          >
            <div className="filter_wrapper">
              <ToggleButton
                option1={"Assigned date"}
                option2={"Deadline"}
                width="80%"
                toggleOption={filterToggleOption}
                handleToggleOption={handleFilterToggleButton}
              />
            </div>
            <div className="upcoming_canvas_body">
              <DatePicker
                className="canvas_body_item_inbox date_inbox"
                onChange={(date) => { handleSelectedDate(date); setDuplicateDate(date) }}
                minDate={new Date()}
                selected={duplicateDate}
                placeholderText={filterToggleOption ? "Assigned date" : "Deadline"}
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
  )
}

export default Upcoming



