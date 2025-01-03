import filter from "../../assets/images/filter.png";
import ellipsis from "../../assets/images/ellipsis.png"
import Dropdown from "../Dropdown/Dropdown"
import { useState } from "react"

type TableProps<T extends object> = {
    users: T
} // users is a generic of type object just as in he Users component

type User = {
   [key: string]: any
}  //use index signature for type checking individual objects in the users array. 

export default function Table<T extends object>({ users }: TableProps<T[]>) {

    const [ activeId, setActiveId ] = useState<string>('');
    
    const shortenStr = (str: string, num: number): string => {
        if(str.length > 7) {
          return `${str.slice(0, num)}...`
        }
        else {
           return str
        }
      }
    
    return (

        <section className="table-container">
        <table>
         <thead>
         <tr>
           <th>
             <div>
            <p>Organization</p>
            <img src={filter} alt='filter icon'/> 
             </div>
           </th>
           <th>
           <div>
            <p>Username</p> 
            <img src={filter} alt='filter icon'/>  
            </div>    
           </th>
           <th>
           <div>
            <p>Email</p> 
            <img src={filter} alt='filter icon'/>      
           </div>
           </th>
           <th>
             <div>
            <p>Phone Number</p> 
            <img src={filter} alt='filter icon'/>    
             </div>
           </th>
           <th>
             <div>
            <p>Date Joined</p> 
            <img src={filter} alt='filter icon'/>    
             </div>
           </th>
           <th>
             <div>
             <p>Status</p>    
             <img src={filter} alt='filter icon'/> 
             </div>
           </th>
         </tr>
         </thead>
         <tbody>
           
            {
            users.map((user: User) => {  
              const { id, orgName, userName, email, phoneNumber, createdAt } = user
                
              return (
                <tr key={id} className="tr-body">
                <td>{orgName}</td>             
                <td>{userName}</td>   
                <td>{email}</td>   
                <td>{phoneNumber}</td>   
                <td>{createdAt}</td>   
                <td>
                  <div>
                    <p className='status'>Inactive</p>
                    <img src={ellipsis} alt="ellipsis icon"
                    onMouseEnter={() => setActiveId(id)} 
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