import Link from 'next/link'
import "../../styles/_dropdown.scss"

type DropdownProps = {
    id: string
    toggleDropdown: { activeId: string | number, setActiveId:  React.Dispatch<React.SetStateAction<string | number>>}
}

export default function Dropdown({ id, toggleDropdown } : DropdownProps) {
    const { activeId, setActiveId } = toggleDropdown;

    return (
        <ul
            onMouseEnter={() => {setActiveId(id)}}
            onMouseLeave={() => setActiveId('')}
            className={`${(id == activeId) ? 'show' : '' } dropdown`}
        >
            <Link style={{
                textDecoration: "none"
            }} href={`/dashboard/users/${id}`}> 
            <li>
                <img src={'/dropdown/view-details.png'} alt='view icon'/>
                <p>View Details</p>
            </li>  
            </Link>  
            <li>
                <img src={'/dropdown/blacklist.png'} alt='view icon'/>
                <p>Blacklist User</p>
            </li>    
            <li>
                <img src={'/dropdown/activate.png'} alt='view icon'/>
                <p>Activate User</p>
            </li>    
        </ul>
    )
}