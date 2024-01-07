import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserRegistration from "./RegisterLogin/userRegistration";
import UserLogin from "./RegisterLogin/userLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHomePage from "./pages/AdminHomePage";
import AdminUpdateUserPage from "./pages/AdminUpdateUserPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import AdminUpdateAdmin from "./pages/AdminUpdateAdmin";
import AdminContactPage from "./pages/AdminContactPage";
import SkaterDashboard from "./pages/SkaterDashboard";
import SkaterHomePage from "./pages/SkaterHomePage";
import SkaterProfileDisplayPage from "./pages/SkaterProfileDisplayPage";
import SkaterContactPage from "./pages/SkaterContactPage";
import SkaterProfileUpdate from "./pages/SkaterProfileUpdate"
import AdminUpdatePatchCard from "./pages/AdminUpdatePatchCard";
import TestUseEffectComponent from "./pages/TestUseEffectComponent";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Initialize state from localStorage
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserRole = localStorage.getItem("userRole");
    if (storedIsLoggedIn && storedUserRole) {
      setIsLoggedIn(storedIsLoggedIn);
      setUserRole(storedUserRole);
    }
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userRole", userRole);
  }, [isLoggedIn, userRole]);

  const handleLoginSuccess = (role, name) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
  };


  return (
    <Router>
      <div>
        {isLoggedIn && userRole === "admin" && <AdminDashboard onLogout={handleLogout} />}
        {isLoggedIn && userRole === "skater" && <SkaterDashboard onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={!isLoggedIn ? 
            <>
              <UserRegistration />
              <UserLogin onLoginSuccess={handleLoginSuccess} />
            </> : 
            <Navigate to={userRole === "admin" ? "/admin/home" : "/skater/home"} />
          } />
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/admin/update-patchcard" element={<AdminUpdatePatchCard />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route path="/admin/new-user" element={<AdminUpdateUserPage />} />
          <Route path = "/admin/admin-update" element = {<AdminUpdateAdmin />} />
          <Route path="/admin/contact" element={<AdminContactPage />} />
          <Route path="/admin/test" element={<TestUseEffectComponent />} />
          <Route path="/skater/contact" element={<SkaterContactPage />} />    
          <Route path="/skater/profile" element={<SkaterProfileDisplayPage />} />
          <Route path="/skater/home" element={<SkaterHomePage />} />
          <Route path="/skater/update-profile" element={<SkaterProfileUpdate />} />

          
          {/* Redirect from root to login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
