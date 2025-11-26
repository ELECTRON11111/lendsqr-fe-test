import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Login from "./components/templates/Login/Login";
import Users from "./components/templates/Users/Users";
import UserDetails from "./components/templates/UserDetails/UserDetails";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Navigate to="/dashboard/users" replace />} />
                <Route path="/dashboard/users" element={<Users />} />
                <Route path="/dashboard/users/:id" element={<UserDetails />} />
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
