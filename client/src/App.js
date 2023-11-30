
//Main app output

//Imprts and components
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegistration from "./RegisterLogin/userRegistration";
import UserLogin from "./RegisterLogin/userLogin";
import AdminDashboard from "./pages/AdminDashboard";
import SkaterDashboard from "./pages/SkaterDashboard";
// Admin Page Routes
import AdminContactPage from "./pages/AdminContactPage";
import AdminUpdateUserPage from "./pages/AdminUpdateUserPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import AdminHomePage from "./pages/AdminHomePage";
//Skater Pages
import SkaterContactPage from "./pages/SkaterContactPage";
import SkaterProfileDisplayPage from "./pages/SkaterProfileDisplayPage";
import SkaterHomePage from "./pages/SkaterHomePage";

//Mainstate of the application.
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  //Another challenging quandry based on correct JWT Token extraction. "role" is defined in login
  // passed into this function as a JWT from localStorage, containing the userId and role (skater or admin).
  //Rememeber on default, everyone is skater, until a super user (you or me) decides to change the skater's role
  //To a admin. This is currently done inside the application using the router.put('/update-role/:userId', updateRole); route
  //as defined in the server and necessary controllers and schema to update the role default role from skater to
  //admin. These rules are set up in the controllers where the JWT's are primarily initialized.
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem("userRole", role); // Storing user role in local storage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
  };

  return (
    // Main Router and display
    <Router>
      <div>
        {/* Ternary operator used to set dashboard paths based on user role */}
        {!isLoggedIn ? (
          <>
            <UserRegistration />
            <UserLogin onLoginSuccess={handleLoginSuccess} />
          </>
        ) : userRole === "admin" ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <SkaterDashboard onLogout={handleLogout} />
        )}
        <Routes>
          {/* AdminDashBoard */}
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/admin/new-user" element={<AdminUpdateUserPage />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route path="/admin/contact" element={<AdminContactPage />} />
          {/* SkaterDashBoard */}
          <Route path="/skater/contact" element={<SkaterContactPage />} />
          <Route
            path="/skater/profile"
            element={<SkaterProfileDisplayPage />}
          />
          <Route path="/skater/home" element={<SkaterHomePage />} />?
        </Routes>
      </div>
    </Router>
  );
}

export default App;
