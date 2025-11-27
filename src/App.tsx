import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/UserDetails/UserDetails";

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
