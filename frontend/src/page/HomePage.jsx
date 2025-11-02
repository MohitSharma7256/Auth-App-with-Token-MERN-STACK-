import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "../App.css";

const HomePage = () => {
  const { token, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If no token, redirect to login
    if (!token) {
      navigate('/login');
      return;
    }

    // In a real app, you would fetch user data here
    // For now, we'll just use the token to show the user is logged in
    const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
    setUserData({
      email: userEmail,
      username: userEmail.split('@')[0] || 'user123'
    });
  }, [token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>🎉 Welcome to Your Dashboard!</h1>
      <p>
        You have successfully logged in or registered.
        This is your secure home page powered by MERN Authentication.
      </p>

      {userData && (
        <div className="user-info">
          <h2>User Information</h2>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          
          <h3>Next Steps</h3>
          <ul className="todo-list">
            <li>Build your profile page</li>
            <li>Integrate API features</li>
            <li>Explore JWT-protected routes</li>
          </ul>
          
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
