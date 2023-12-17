import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const AdminHomePage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserProfile = async (userId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/get-user-profile/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user profile: ${response.status}`);
        }
        const userData = await response.json();
        setUserName(userData.name); // Assuming the response includes a 'name' field
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.id) {
          fetchUserProfile(decodedToken.id);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div className="container mt-4 text-center">
      <img src="/western-province-figure-skating.png" alt="WP_Logo" />
      <div className="container mt-4 text-center">
        <h1 className="mb-3">SKATER PATCH</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">WELCOME {userName.toUpperCase()}</h5>
            <p className="card-text">UPDATE OR VIEW A SKATER'S PROFILE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
