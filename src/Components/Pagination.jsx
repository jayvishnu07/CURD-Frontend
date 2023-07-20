import React from 'react';
import '../Css/Component.style/pagination.css'
import { ContextState } from '../ContextApi/ContextApi';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    const { userName, showTaskDescription } = ContextState();


    // http://localhost:8080/api/v1/tasks/count


    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={showTaskDescription ? 'pagination width' : "pagination"}>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item' >
                        <span id='pointer' onClick={() => { paginate(number); console.log("number from pagination => ", number); }} href='!#' className={number === currentPage ? 'page-link active' : 'page-link'}>
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;