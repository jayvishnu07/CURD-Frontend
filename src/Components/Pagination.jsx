import React from 'react';

//style sheets
import '../Css/Component.style/pagination.css'

//custom components
import { ContextState } from '../ContextApi/ContextApi';


const Pagination = ({ tasksPerPage, totalTasks, setCurrentPage, currentPage }) => {
  const pageNumbers = [];
  const { showTaskDetails } = ContextState();

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <nav>
      <ul className={showTaskDetails ? 'pagination' : "pagination"}>
        {pageNumbers.map(number => (
          <li key={number} className={number === currentPage ? 'page_item active' : 'page_item'} onClick={() => { paginate(number); }} id='pointer'>
            <span href='!#' >
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;