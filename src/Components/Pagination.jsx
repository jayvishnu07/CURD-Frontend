import React from 'react';
import '../Css/Component.style/pagination.css'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <span onClick={() => paginate(number)} href='!#' className='page-link'>
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;