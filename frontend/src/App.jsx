import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./page/Register";
import Login from "./page/Login";
import HomePage from "./page/HomePage";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="*" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
