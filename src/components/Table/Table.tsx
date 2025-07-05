import Dropdown from "../Dropdown/Dropdown";
import Filter from "../Filter/Filter";
import { useState } from "react"

// generic type: user object
type TableProps<T extends object> = {
  users: T
} 

// index signature: check individual objects
type User = {
  [key: string]: any
} 

export default function Table<T extends object>({ users }: TableProps<T[]>) {

    const [activeId, setActiveId ] = useState<string>('');
    const [showFilter, updateShowFilter] = useState<boolean>(false);
    
    return (
        <section className="table-container">
        <table>
         <thead>
         <tr>
           <th style={{position: "relative"}}>
              <Filter show={showFilter} closeFilter={() => updateShowFilter(false)} />  
             <div>
            <p>Organization</p>
            <img src={'/table/filter.png'} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/> 
             </div>
           </th>
           <th>
           <div>
            <p>Username</p> 
            <img src={'/table/filter.png'} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/>
            </div>    
           </th>
           <th>
           <div>
            <p>Email</p> 
            <img src={'/table/filter.png'} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/>      
           </div>
           </th>
           <th>
             <div>
            <p>Phone Number</p> 
            <img src={'/table/filter.png'} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/>    
             </div>
           </th>
           <th>
             <div>
            <p>Date Joined</p> 
            <img src={'/table/filter.png'} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/>    
             </div>
           </th>
           <th>
             <div>
             <p>Status</p>    
             <img src={'/table/filter.png'} alt='filter icon' onClick={() => updateShowFilter((prev) => !prev)}/> 
             </div>
           </th>
         </tr>
         </thead>
         <tbody>
           
            {
            users.map((user: User) => {  
              const { id, orgName, userName, email, phoneNumber, createdAt, status } = user;
                
              return (
                <tr key={id} className="tr-body">
                <td>{orgName}</td>             
                <td>{userName}</td>   
                <td>{email}</td>   
                <td>{phoneNumber}</td>   
                <td>{createdAt}</td>   
                <td>
                  <div>
                    <p className={`status ${status.toString().toLocaleLowerCase()}`}>{status}</p>
                    <img src={'/table/ellipsis.png'} alt="ellipsis icon"
                    onMouseEnter={() => {setActiveId(id)}} 
                    />
                    <Dropdown id={id} toggleDropdown={{activeId, setActiveId}}/>
                  </div>
                </td>   
                </tr>                     
              )})     
            }          
         </tbody>
        </table>
     </section>     
    )
}