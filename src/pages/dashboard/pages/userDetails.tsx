const { userId } = useParams();
import { useParams } from "react-router-dom";

const UserDetails = () => {
    return (
        <div>
            <h1>User Details for {userId}</h1>
        </div>
    );
}

export default UserDetails;