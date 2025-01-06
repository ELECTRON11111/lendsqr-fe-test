import Table from '../Table/Table';
import { useState, useEffect } from 'react';
import Skeleton from '../Skeleton/Skeleton';

const PaginatedItems = () => {
  const [userList, updateUserList] = useState([]);
  const [loading, updateLoading] = useState(false);
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const apiConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

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
     .then(list => {updateUserList(list); localStorage.setItem('users', JSON.stringify(list))});

  }, []);


  return (
    <div id='PaginatedItems'>
      {loading && userList.length == 0 ? <div id='loader' style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      :<Table users={[...userList]}/>}

      <div id="pages_and_navigations">
        <div id='users_per_page'>
          <span>Showing</span>  
          <select name="users_count" id="users_count">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>out of {userList.length}</span>
        </div>

        <div id="navigations">
          <div className="prev">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.6">
                <path d="M10.0061 11.0573C10.8472 11.8984 9.54344 13.1595 8.745 12.3184L3.99424 7.56759C3.61581 7.23127 3.61581 6.64282 3.99424 6.3065L8.61858 1.64002C9.45967 0.841037 10.7208 2.10267 9.87967 2.94322L5.8859 6.937L10.0061 11.0573Z" fill="#213F7D"/>
              </g>
            </svg>
          </div>

          <div id='pages'>
            {/* division of the users list into pages */}
            <p id='active'>1</p>
            <p>2</p>
            <p>3</p>
            <p>.....</p>
            <p>15</p>
          </div>

          <div className="next">
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
