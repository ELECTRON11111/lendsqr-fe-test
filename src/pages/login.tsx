import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/_login.scss";
// Image imports 
import logo from "../assets/images/login/lendsqr-logo.svg";
import vectorImg from "../assets/images/login/login-svg.svg";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (!email || !password) {
            setError("All fields are required");
            return;
        }
        setLoading(true);
        setError("");
        setTimeout(() => {
            setLoading(false);
            // "/dashboard/users"
            navigate("/dashboard/users")

        }, 2000); // Simulate a 2-second delay
    };

    return (
        <div id="login">
            <div className="left">
                <img src={logo} id="logo" />
                <img src={vectorImg} id="vectorImg"/>
            </div>
            <div className="right">
                <div className="right-content">
                    <div className="text">
                        <h1>Welcome!</h1>
                        <p>Enter details to login.</p>
                    </div>

                    <div className="form">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                maxLength={25}
                                placeholder="Password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className='show' onClick={() => setShowPassword((prevValue) => !prevValue)}>
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </div>

                        <h5>FORGOT PASSWORD?</h5>
                        <button onClick={handleLoginClick}>
                            {loading ? <span>Loading ...</span> : <Link to="/dashboard/users">LOG IN</Link>}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;