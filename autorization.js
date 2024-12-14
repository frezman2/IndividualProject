import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.data.success) {
        onLoginSuccess(response.data.user); // Pass user data to parent component
      } else {
        // Handle login failure (e.g., display error message)
      }
    } catch (error) {
      // Handle API request error gracefully
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Username and password input fields */}
      <button type="submit">Login</button>
    </form>
  );
}
import React from 'react';

function Profile({ user }) {
  if (!user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      {/* Display profile details */}
    </div>
  );
}

export default Profile;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  const [user, setUser] = useState(null); // User data state

  useEffect(() => {
    // Check for existing session on component mount if applicable
    const checkLogin = async () => {
      try {
        const response = await axios.get('/api/check-login');
        if (response.data.loggedIn) {
          setUser(response.data.user);
        }
      } catch (error) {
        // Handle API request error
      }
    };

    checkLogin();
  }, []); // Empty dependency array to run only once on mount

  const handleLoginSuccess = (userData) => {
    setUser(userData); // Update user state on successful login
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path="/profile"
          element={<Profile user={user}} />
        </Routes>
          </Router>
    )
}
