import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import searchIcon from "../../../assets/images/dashboard-header/search-icon.svg";

export const SearchBar = () => {
    const navigate = useNavigate();
    const searchInputRef = useRef(null);

    const handleSearch = (query: string) => {
        navigate(`?search=${query}`);
    }

    return (
        <div className="search">
            <input type="text" data-testid="search-input" ref={searchInputRef} placeholder="Search for anything" />
            <span data-testid="search" onClick={() => handleSearch((searchInputRef.current as unknown as HTMLInputElement).value)}>
                <img src={searchIcon} id="search-icon"/>
            </span>
        </div>
    )
}