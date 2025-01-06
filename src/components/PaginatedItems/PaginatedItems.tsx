import Table from '../Table/Table';
import { useState, useEffect } from 'react';
import Skeleton from '../Skeleton/Skeleton';

const PaginatedItems = () => {
  const [userList, updateUserList] = useState([]);
  const [loading, updateLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(20);
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const apiConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    updateLoading(true);
    const users = localStorage.getItem('users');
    if (users) {
      updateUserList(JSON.parse(users));
      updateLoading(false);
      return;
    }

    // Fetch data from API
    fetch(`${baseUrl}?mocky-delay=100ms`, apiConfig)
      .then(response => response.json())
      .then(list => {
        updateUserList(list);
        localStorage.setItem('users', JSON.stringify(list));
        updateLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(userList.length / usersPerPage);

  const handleUsersPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentUsers = userList.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 7;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= halfMaxPagesToShow) {
        for (let i = 1; i <= maxPagesToShow - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage > totalPages - halfMaxPagesToShow) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - (maxPagesToShow - 2); i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - halfMaxPagesToShow + 1; i <= currentPage + halfMaxPagesToShow - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div id='PaginatedItems'>
      {loading && userList.length === 0 ? (
        <div id='loader' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <Table users={currentUsers} />
      )}

      <div id="pages_and_navigations">
        <div id='users_per_page'>
          <span>Showing</span>
          <select name="users_count" id="users_count" value={usersPerPage} onChange={handleUsersPerPageChange}>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>out of {userList.length}</span>
        </div>

        <div id="navigations">
          <div className="prev" onClick={handlePreviousPage}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.6">
                <path d="M10.0061 11.0573C10.8472 11.8984 9.54344 13.1595 8.745 12.3184L3.99424 7.56759C3.61581 7.23127 3.61581 6.64282 3.99424 6.3065L8.61858 1.64002C9.45967 0.841037 10.7208 2.10267 9.87967 2.94322L5.8859 6.937L10.0061 11.0573Z" fill="#213F7D"/>
              </g>
            </svg>
          </div>

          <div id='pages'>
            {renderPageNumbers().map((page, index) => (
              <p
                key={index}
                id={currentPage === page ? 'active' : ''}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
              >
                {page}
              </p>
            ))}
          </div>

          <div className="next" onClick={handleNextPage}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.99391 2.94274C3.15281 2.10165 4.45656 0.840502 5.255 1.68165L10.0058 6.43241C10.3842 6.76873 10.3842 7.35718 10.0058 7.6935L5.38142 12.36C4.54033 13.159 3.27918 11.8973 4.12033 11.0568L8.1141 7.063L3.99391 2.94274Z" fill="#213F7D"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginatedItems;