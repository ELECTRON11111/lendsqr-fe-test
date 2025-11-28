import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/atoms/Spinner/Spinner";

import logo from "../../assets/images/login/lendsqr-logo.svg";
import vectorImg from "../../assets/images/login/login-svg.svg";

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (!email || !password) {
          setError("All fields are required. Use any email or password");
          return;
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address (Any)");
            return;
        }

        setLoading(true);
        setError("");

        // Simulate a 2-second delay
        setTimeout(() => {
          setLoading(false);
          navigate("/dashboard/users")
        }, 2000);
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
                            data-testid="email"
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        
                        <div className="password-container">
                            <input
                                data-testid="password"
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
                        <button disabled={loading} onClick={handleLoginClick}>
                            {loading ? 
                                <div id="loader">
                                    <Spinner />
                                    <span>Loading ...</span>
                                </div> 
                                : <span>LOG IN</span>
                            }
                        </button>
                        {error && <p data-testid="error" className="error">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
