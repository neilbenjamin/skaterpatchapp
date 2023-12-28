import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function SkaterProfileUpdate() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSkaterProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decodedToken = jwtDecode(token);
        const skaterId = decodedToken.id;
        setUserId(skaterId);

        const response = await fetch(
          `/api/users/get-user-profile/${skaterId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch skater details");
        }

        const skaterData = await response.json();
        setName(skaterData.name || "");
        setSurname(skaterData.surname || "");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSkaterProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyContent = JSON.stringify({
      name,
      surname
    });

    try {
      const response = await fetch(`/api/users/update-user-profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: bodyContent,
      });

      if (response.ok) {
        setSuccessMessage("Profile Updated Successfully");
      } else {
        console.error("Failed to update profile");
        setErrorMessage("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Skater Profile</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="surname" className="form-label">Surname:</label>
          <input
            type="text"
            className="form-control"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Surname"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </div>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default SkaterProfileUpdate;
