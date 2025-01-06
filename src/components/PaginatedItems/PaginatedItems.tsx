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
    </div>
  );
}

export default PaginatedItems;
