//Logout component to remove the userId from localStorage and return the application back to
//login state.
import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton({ onLogout }) {
  //Clear localStaorage
  localStorage.removeItem("userToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
