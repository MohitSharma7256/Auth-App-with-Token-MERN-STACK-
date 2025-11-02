import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

// Login Component
const Login = () => {
    // State for form inputs and messages
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState({ text: "", type: "" });
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });
        setIsLoading(true);

        try {
            const { email, password } = formData;
            const res = await loginUser({ email, password });
            
            // Handle successful login
            if (res.data?.token || res.data?.data?.token) {
                const token = res.data.token || res.data.data.token;
                const userEmail = res.data.user?.email || email;
                
                login(token, userEmail);
                navigate("/home");
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            setMessage({ text: errorMessage, type: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Welcome Back</h2>
            
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="auth-form">
                {/* Email Input */}
                <div className="form-group">
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        className="form-input"
                    />
                </div>

                {/* Password Input */}
                <div className="form-group">
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                        className="form-input"
                    />
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="auth-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {/* Message Display */}
            {message.text && (
                <p className={`message ${message.type}`}>
                    {message.text}
                </p>
            )}

            {/* Registration Link */}
            <p className="auth-footer">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
