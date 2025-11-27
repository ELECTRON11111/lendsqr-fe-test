import { useState } from "react";
import { type User } from "../../../types/userTypes";
import { useNavigate } from "react-router-dom";
import Filter from "../Filter/Filter";
import Dropdown from "../../atoms/Dropdown/Dropdown";

import filterIcon from "../../../assets/images/table/filter.png";
import ellipsisIcon from "../../../assets/images/table/ellipsis.png";

export default function Table({ users }: { users: User[] }) {
    const navigate = useNavigate();
    const [activeId, setActiveId ] = useState<string | number>('');
    const [showFilter, updateShowFilter] = useState<boolean>(false);
    
    return (
      <section className="table-container">
        {users.length !== 0 ? 
        <table>
          <thead>
            <tr>
                <th style={{position: "relative"}}>
                  <Filter show={showFilter} closeFilter={() => updateShowFilter(false)} />  
                  <div>
                    <p>Organization</p>
                    <img src={filterIcon} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/> 
                  </div>
                </th>
                <th>
                  <div>
                    <p>Username</p> 
                    <img src={filterIcon} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/>
                  </div>    
                </th>
                <th>
                  <div>
                    <p>Email</p> 
                    <img src={filterIcon} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/>      
                  </div>
                </th>
                <th>
                  <div>
                    <p>Phone Number</p> 
                    <img src={filterIcon} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/>    
                  </div>
                </th>
                <th>
                  <div>
                    <p>Date Joined</p> 
                    <img src={filterIcon} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/>    
                  </div>
                </th>
                <th>
                  <div>
                    <p>Status</p>    
                    <img src={filterIcon} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/> 
                  </div>
                </th>
            </tr>
          </thead>
          <tbody> 
            {users.map((user: User) => {  
              const { id, orgName, userName, email, phoneNumber, createdAt, status } = user;
                
              return (
                <tr key={id} data-testid="tr" className="tr-body">
                  <td>{orgName}</td>             
                  <td>{userName}</td>   
                  <td>{email}</td>   
                  <td>{phoneNumber}</td>   
                  <td>{createdAt}</td>   
                  <td>
                    <div>
                      <p className={`status ${status.toString().toLocaleLowerCase()}`}>{status}</p>
                      <img 
                        src={ellipsisIcon} alt="ellipsis icon"
                        onMouseEnter={() => {setActiveId(id)}} 
                      />
                      <Dropdown id={`${id}`} toggleDropdown={{activeId, setActiveId}}/>
                    </div>
                  </td>   
                </tr>
              )
            })
            }
          </tbody>
        </table>
      : (
        <div id="empty-users-list">
          <h1>Oops, user list is empty.</h1>
          <p>Consider altering your filters to get users present on this list</p>
          <button className="filter-btn" onClick={() => navigate("/dashboard/users")}>Reset</button>
        </div>
      )}
    </section>     
  )
}