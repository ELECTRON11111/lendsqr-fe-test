import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/_login.scss";
// Image imports 
import logo from "../assets/images/login/lendsqr-logo.svg";
import vectorImg from "../assets/images/login/login-svg.svg";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
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

                    <form action="">
                        <input type="email" placeholder="Email" name="email" id="email" />
                        
                        <div className="password-container">
                            <input type={showPassword? "text": "password"} maxLength={25} placeholder="Password" name="password" id="password" />
                            <span className='show' onClick={() => setShowPassword((prevValue) => !prevValue)}>{showPassword ? "Hide": "Show"}</span>
                        </div>

                        <h5>FORGOT PASSWORD?</h5>
                        <button><Link to="/dashboard/users">LOG IN</Link></button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;