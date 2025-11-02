import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate passwords match
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        
        // Validate password strength (optional)
        if (password.length < 6) {
            setMessage("Password must be at least 6 characters long");
            return;
        }
        
        setMessage("Creating your account...");
        
        try {
            const res = await registerUser({ username, email, password });
            console.log('Registration response:', res);
            
            if (res.data && res.data.token) {
                // Handle successful registration with token
                login(res.data.token, email);
                navigate("/home");
            } else if (res.data && res.data.user) {
                // Handle successful registration with user data
                login(res.data.token || res.data.data?.token, res.data.user.email || email);
                navigate("/home");
            } else {
                console.error('Unexpected response structure:', res);
                setMessage("Registration successful but couldn't process the response");
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage(error.response?.data?.error || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password (min 6 characters)" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    minLength="6"
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                />
                <button type="submit" className="auth-button">
                    Register
                </button>
            </form>
            <p className="message">{message}</p>
            <p className="auth-footer">
                Already have an account? <a href="/login">Log in here</a>
            </p>
        </div>
    );
};

export default Register;
