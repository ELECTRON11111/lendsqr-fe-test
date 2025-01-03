import { useParams } from "react-router-dom";

const UserDetails = () => {
    const { userId } = useParams();
    return (
        <div>
            <h1>User Details for {userId}</h1>
        </div>
    );
}

export default UserDetails;