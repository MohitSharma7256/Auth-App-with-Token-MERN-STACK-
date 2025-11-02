import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || null);

    const login = (newToken, email) => {
        setToken(newToken);
        setUserEmail(email);
        localStorage.setItem("token", newToken);
        localStorage.setItem("userEmail", email);
    };

    const logout = () => {
        setToken(null);
        setUserEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
    };

    // Check for existing auth state on initial load
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedEmail = localStorage.getItem("userEmail");
        
        if (storedToken && storedEmail) {
            setToken(storedToken);
            setUserEmail(storedEmail);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ 
            token, 
            userEmail,
            login, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
