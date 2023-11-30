//My main admin dashboard with react-router-dom establishing the Main Navigation Links for the Admin Dashboard.

import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../components/LogoutButton"; //Imported logout to remain across screen changes.
//Next function for display is to build a mobile first addition to this desktop application. I used Hyperion, YouTube and and Open AI to 
//remind me of React-Router-Dom which is quite tricky.

function AdminDashboard({ onLogout }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/admin/home">
          Admin Dashboard
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/new-user">
                Update User
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/profile">
                User Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <LogoutButton onLogout={onLogout} />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default AdminDashboard;
