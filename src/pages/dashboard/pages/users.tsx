import Card from "../../../components/Card/Card";

const Users = () => {
    const cardData = [
        {
            imgSrc: "../../../../public/users-images/users-icon.svg",
            title: "USERS",
            numbers: "2,453"
        },
        {
            imgSrc: "../../../../public/users-images/active-users-icon.svg",
            title: "ACTIVE USERS",
            numbers: "2,453"
        }, 
        {
            imgSrc: "../../../../public/users-images/users-with-loans-icon.svg",
            title: "USERS WITH LOANS",
            numbers: "12,453"
        },
        {
            imgSrc: "../../../../public/users-images/users-with-savings.svg",
            title: "USERS WITH SAVINGS",
            numbers: "102,453"
        }
    ]

    return (
        <div id="users-page">
            {/* <h1>HELLO THERE</h1> */}
            <h2>Users</h2>

            <div id="cards">
                {cardData.map((data, index):any => <Card key={index} imgSrc={data.imgSrc} title={data.title} numbers={data.numbers} />)}
            </div>

            <div id="user-listing"></div>
        </div>
    );
}

export default Users;
