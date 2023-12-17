import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AdminDeleteUserPage from "./AdminDeleteUserPage";

function AdminUpdateAdmin() {
  const [userId, setUserId] = useState("");
  const [name, setUserName] = useState("");
  const [surname, setUserSurname] = useState("");
  const [adminSupervisor, setAdminSupervisor] = useState("");
  const [contactNumberAdmin, setContactNumberAdmin] = useState("");
  const [adminShift, setAdminShift] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decodedToken = jwtDecode(token);
        const adminId = decodedToken.id;
        setUserId(adminId);

        const response = await fetch(
          `http://localhost:8080/api/users/get-user-profile/${adminId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch admin details");
        }

        const adminData = await response.json();
        setUserName(adminData.name || "");
        setUserSurname(adminData.surname || "");
        setAdminSupervisor(adminData.adminSupervisor || "");
        setContactNumberAdmin(adminData.contactNumberAdmin || "");
        setAdminShift(adminData.adminShift || "");
        setAdminRole(adminData.adminRole || "");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyContent = JSON.stringify({
      name,
      surname,
      adminRole,
      adminSupervisor,
      contactNumberAdmin,
      adminShift,
    });

    try {
      const response = await fetch(`/api/users/update-user-profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: bodyContent,
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        setSuccessMessage("Profile Updated Successfully");
        alert("Profile Updated Successfully");
      } else {
        console.error("Failed to update profile");
        setSuccessMessage("");
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("");
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="container mt-4 text-center">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-4 font-weight-bold">
            UPDATE ADMIN PROFILE
          </h2>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
        </div>

        {userId && (
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Admin Name:
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="User Name"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="Surname" className="form-label">
                Admin Surname:
              </label>
              <input
                type="text"
                className="form-control"
                value={surname}
                onChange={(e) => setUserSurname(e.target.value)}
                placeholder="User Surname"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="admin-supervisor" className="form-label">
                Admin Supervisor:
              </label>
              <input
                type="text"
                className="form-control"
                value={adminSupervisor}
                onChange={(e) => setAdminSupervisor(e.target.value)}
                placeholder="Admin Supervisor"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="admin-contact-number" className="form-label">
                Admin Contact:
              </label>
              <input
                type="tel"
                className="form-control"
                value={contactNumberAdmin}
                onChange={(e) => setContactNumberAdmin(e.target.value)}
                placeholder="Admin Contact No."
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="admin-shift" className="form-label">
                Admin Shift:
              </label>
              <input
                type="text"
                className="form-control"
                value={adminShift}
                onChange={(e) => setAdminShift(e.target.value)}
                placeholder="Admin Shift"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="admin-role" className="form-label">
                Admin Role:
              </label>
              <input
                type="text"
                className="form-control"
                value={adminRole}
                onChange={(e) => setAdminRole(e.target.value)}
                placeholder="Admin Role"
              />
            </div>
            <div className="row g-2 mt-3 justify-content-center">
              {" "}
              {/* Added justify-content-center */}
              <div className="col-12 col-md-auto">
                <button type="submit" className="btn btn-primary w-100">
                  Update Admin
                </button>
              </div>
              <div className="col-12 col-md-auto">
                <AdminDeleteUserPage userId={userId} />
              </div>
            </div>
          </form>
        )}
      </div>
      <img src="/western-province-figure-skating.png" alt="WP_Logo" />
    </div>
  );
}

export default AdminUpdateAdmin;
