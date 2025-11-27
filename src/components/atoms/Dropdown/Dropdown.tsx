import { Link } from "react-router-dom"
import ViewDetailsIcon from "../../../assets/images/dropdown/view-details.png";
import BlacklistIcon from "../../../assets/images/dropdown/blacklist.png";
import activateIcon from "../../../assets/images/dropdown/activate.png";

type DropdownProps = {
    id: string
    toggleDropdown: { activeId: string | number, setActiveId:  React.Dispatch<React.SetStateAction<string | number>>}
}

export default function Dropdown({ id, toggleDropdown } : DropdownProps) {
    const { activeId, setActiveId } = toggleDropdown;

    return (
        <ul
            data-testid="dropdown"
            onMouseEnter={() => {setActiveId(id)}}
            onMouseLeave={() => setActiveId('')}
            className={`${(id == activeId) ? 'show' : '' } dropdown`}
        >
            <Link style={{
                textDecoration: "none"
            }} to={`/dashboard/users/${id}`}> 
            <li>
                <img src={ViewDetailsIcon} alt='view icon'/>
                <p>View Details</p>
            </li>  
            </Link>  
            <li>
                <img src={BlacklistIcon} alt='blacklist icon'/>
                <p>Blacklist User</p>
            </li>    
            <li>
                <img src={activateIcon} alt='activate icon'/>
                <p>Activate User</p>
            </li>    
        </ul>
    )
}