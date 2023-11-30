//Main dahsboard for Skater as per the admin panel.
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

function SkaterDashboard({ onLogout }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/skater/home">Skater Dashboard</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/skater/profile">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/skater/contact">Contact</NavLink>
            </li>
            {/* Other skater links */}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <LogoutButton onLogout={onLogout} />
            </li>
          </ul>
        </div>
      </nav>
      {/* Rest of the Skater Dashboard Content */}
    </div>
  );
}

export default SkaterDashboard;
