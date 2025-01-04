import viewDetails from '../../assets/images/view-details.png'
import blacklist from '../../assets/images/blacklist.png'
import activate from '../../assets/images/activate.png'
import { Link } from 'react-router-dom'
import "../../styles/_dropdown.scss"

type DropdownProps = {
    id: string
    toggleDropdown: { activeId: string, setActiveId:  React.Dispatch<React.SetStateAction<string>>}
}

export default function Dropdown({ id, toggleDropdown } : DropdownProps) {
    const { activeId, setActiveId } = toggleDropdown;

    return (
        <ul
         onMouseEnter={() => {setActiveId(id)}}
         onMouseLeave={() => setActiveId('')}
         className={`${(id === activeId) ? 'show' : '' } dropdown`}>
            <Link style={{
                textDecoration: "none"
            }} to={`/dashboard/users/${id}`}> 
            <li>
            <img src={viewDetails} alt='view icon'/>
            <p>View Details</p>
            </li>  
            </Link>  
            <li>
            <img src={blacklist} alt='view icon'/>
            <p>Blacklist User</p>
            </li>    
            <li>
            <img src={activate} alt='view icon'/>
            <p>Activate User</p>
            </li>    
        </ul>
    )
}