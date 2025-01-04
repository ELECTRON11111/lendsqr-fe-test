import Table from '../Table/Table';
import { useState, useEffect } from 'react';

const PaginatedItems = () => {
  const [userList, updateUserList] = useState([]);
  const baseUrl = `${import.meta.env.VITE_API_URL}`;
  const apiConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  useEffect(() => {
    // Fetch data from API
    fetch(`${baseUrl}?mocky-delay=100ms`, apiConfig)
     .then(response => response.json())
     .then(list => updateUserList(list));
    
  }, []);

  return (
    <div id='PaginatedItems'>
      <Table users={[...userList]}/>
    </div>
  );
}

export default PaginatedItems;
