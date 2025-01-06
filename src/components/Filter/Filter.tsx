import "../../styles/_filter.scss";

const Filter = (props: {show: boolean}) => {
    return (
        <>{props.show ? (<div id='filter'>
            <div id="organization-container" className="container">
                <label htmlFor="orgName">Organization</label>
                <select name="orgName" id="orgName" aria-placeholder="Select">
                    <option value="lendsqr">Lendsqr</option>
                    <option value="irorun">Irorun</option>
                    <option value="lendstar">Lendstar</option>
                </select>
            </div>

            <div id="username-container" className="container">
                <label htmlFor="userName">Username</label>
                <input type="text" id="userName" name="userName" placeholder="User" />
            </div>

            <div id="email-container" className="container">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email"/>
            </div>

            <div id="date-container" className="container">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" placeholder="Date" />
            </div>

            <div id="phone-container" className="container">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" />
            </div>

            <div id="status-container" className="container">
                <label htmlFor="status">Status</label>
                <select name="status" id="status" aria-placeholder="Select">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                    <option value="blacklisted">Blacklisted</option>
                </select>
            </div>

            <div className="btns">
                <button className="reset-btn">Reset</button>
                <button className="filter-btn">Filter</button>
            </div>
        </div>): ""}</>
    );
}

export default Filter;
