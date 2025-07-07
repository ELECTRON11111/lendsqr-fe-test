"use client";
import "../styles/_login.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "../components/Spinner/Spinner";


function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


const Page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

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
        setTimeout(() => {
          setLoading(false);
          router.push("/dashboard/users")
        }, 2000); // Simulate a 2-second delay
    };

    return (
        <div id="login">
            <div className="left">
                <img src={"/login/lendsqr-logo.svg"} id="logo" />
                <img src={"/login/login-svg.svg"} id="vectorImg"/>
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

export default Page;
