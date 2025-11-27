/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { type Filters } from "../../../types/filterTypes";

const Filter = (props: { show: boolean, closeFilter: () => void }) => {
    const naviagate = useNavigate();
    const searchParams = useSearchParams();
    const refs = useRef<{ [key: string]: HTMLInputElement | HTMLSelectElement | any }>({});

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams()
            params.set(name, value)
        
            return params.toString();
        },
        [searchParams]
    );

    const handleFormSubmission = () => {
        const filters: Filters = {
            orgName: refs.current["orgName"].value || "all", 
            userName: refs.current["userName"].value || "",
            email: refs.current["email"].value || "",
            phoneNumber: refs.current["phoneNumber"].value || "",
            status: refs.current["status"].value || "all",
        };

        // Add filters as search parameters
        const params: string[] = [];

        Object.entries(filters).forEach(filter => {
            const [key, value] = filter;
            params.push(createQueryString(key, value));    
        });

        naviagate(`?${params.join("&")}`);
        props.closeFilter();
    }

    const handleFiltersReset = () => {
        naviagate("/dashboard/users");
        props.closeFilter();
    }

    return (
        <>{props.show ? (<div id='filter'>
            <div id="organization-container" className="container">
                <label htmlFor="orgName">Organization</label>
                <select 
                    ref={el => { refs.current["orgName"] = el }}
                    name="orgName" 
                    id="orgName" aria-placeholder="Select"
                >
                    <option value="all">All</option>
                    <option value="lendsqr">Lendsqr</option>
                    <option value="irorun">Irorun</option>
                    <option value="lendstar">Lendstar</option>
                </select>
            </div>

            <div id="username-container" className="container">
                <label htmlFor="userName">Username</label>
                <input 
                    ref={el => { refs.current["userName"] = el }}
                    type="text" 
                    id="userName" name="userName" placeholder="User" 
                />
            </div>

            <div id="email-container" className="container">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    ref={el => { refs.current["email"] = el }}
                    id="email" name="email" placeholder="Email"
                />
            </div>

            <div id="date-container" className="container">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" placeholder="Date" />
            </div>

            <div id="phone-container" className="container">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input 
                    type="tel" 
                    ref={el => { refs.current["phoneNumber"] = el }}
                    id="phoneNumber" name="phoneNumber" placeholder="Phone Number" 
                />
            </div>

            <div id="status-container" className="container">
                <label htmlFor="status">Status</label>
                <select 
                    name="status" 
                    ref={el => { refs.current["status"] = el }}
                    id="status" aria-placeholder="Select"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                    <option value="blacklisted">Blacklisted</option>
                </select>
            </div>

            <div className="btns">
                <button className="reset-btn" onClick={() => handleFiltersReset()}>Reset</button>
                <button className="filter-btn" onClick={() => handleFormSubmission()} >Filter</button>
            </div>
        </div>): ""}</>
    );
}

export default Filter;