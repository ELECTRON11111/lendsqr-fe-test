// import Page from "../components/dashboard/common/Page"
import Card from "../../components/Card/Card";
import user from "../assets/dashboard/card-users.png"
import activeUsers from "../assets/dashboard/active-users.png"
import loanUsers from "../assets/dashboard/loan-users.png"
import savingsUsers from "../assets/dashboard/savings-users.png"
import PaginatedItems from "../../components/PaginatedItems/PaginatedItems";

export default function Users() {

    return (
    //  <Page title={"Users"}>
     <div>
      <div className="users-container">
      <div className="analytics-container">
       <Card title={"Users"} numbers={"2,543"} imgSrc={user} className={"users"}/>
       <Card title={"Active Users"} numbers={"2,543"} imgSrc={activeUsers} className={"active-users"}/>  
       <Card title={"Users with Loans"} numbers={"2,543"} imgSrc={loanUsers} className={"loan-users"}/>
       <Card title={"Users with Savings"} numbers={"2,543"} imgSrc={savingsUsers} className={"saving-users"}/>
      </div>

      <PaginatedItems/>
      </div>
     </div>
    )
}