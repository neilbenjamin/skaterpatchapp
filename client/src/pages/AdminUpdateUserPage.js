// The Main User Update Component. This took a loooooong time to construct but a lot of fun matching all the properties together. 
//The logic of implementing the props and changing the state to reflect the user data and display of the form took a while to get right even with the 
//assistance of YouTube and openAi and Google. 

import React, { useState } from "react";
import AdminGetAllUsersPage from "./AdminGetAllUserPage";
import AdminDeleteUserPage from "./AdminDeleteUserPage";
// css
import '../style.css'


function AdminUpdateUserPage() {
  //Schema fields state. 
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [coachName, setCoachName] = useState("");
  const [wpnumber, setWpNumber] = useState("");
  const [contactNumberSkater, setContactNumberSkater] = useState("");
  const [contactNumberParent, setContactNumberParent] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  //Uses selected userId as para, to endpoint to get the correct user.
  const handleUserSelect = async (selectedUserId) => {
    setUserId(selectedUserId);
    if (selectedUserId) {
      try {
        const response = await fetch(
          `/api/users/get-user-profile/${selectedUserId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        //Updates as set by user otherwise stays empty.
        const userData = await response.json();
        setName(userData.name || "");
        setSurname(userData.surname || "");
        setCoachName(userData.coachName || "");
        setWpNumber(userData.wpnumber || "");
        setContactNumberSkater(userData.contactNumberSkater || "");
        setContactNumberParent(userData.contactNumberParent || "");
        setDateOfBirth(userData.dateOfBirth || "");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setName("");
      setSurname("");
      setCoachName("");
      setWpNumber("");
      setContactNumberSkater("");
      setContactNumberParent("");
      setDateOfBirth("");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const bodyContent = JSON.stringify({
      name,
      surname,
      coachName,
      wpnumber,
      contactNumberSkater,
      contactNumberParent,
      dateOfBirth,
    });

    try {
      const response = await fetch(
        `/api/users/update-user-profile/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: bodyContent,
        }
      );

      if (response.ok) {
        console.log("Profile updated successfully");
        setSuccessMessage("Profile Updated Successfully");
      } else {
        console.error("Failed to update profile");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("");
    }
  };

// JSX
  return (
    <div className="container mt-4 text-center">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-4 font-weight-bold">UPDATE SKATER PROFILE</h2>
          {/* Update the display based on the user data returned in the prop
          Passing prop to search database for user and then returning it here to update the userSelect async
          function which updates the correct userId and fields */}
          <AdminGetAllUsersPage onUserSelect={handleUserSelect} />
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
        </div>

        {userId && ( // Render the form only when a user is selected. This is vital so that the database is not updated with random data before a userId has been created at 
        //Login. Solution courtesy of YouTube and OpenAi.
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
            <div className="col-md-6">
            <label htmlFor="contact-number" className="form-label">Contact:</label>
              <input
                type="tel"
                className="form-control"
                value={contactNumberSkater}
                onChange={(e) => setContactNumberSkater(e.target.value)}
                placeholder="Skater Contact No."
              />
            </div>
            <div className="col-md-6">
            <label htmlFor="contact-parent" className="form-label">Contact Parent:</label>
              <input
                type="tel"
                className="form-control"
                value={contactNumberParent}
                onChange={(e) => setContactNumberParent(e.target.value)}
                placeholder="Parent Contact No."
              />
            </div>
            <div className="col-md-6">
            <label htmlFor="coach-name" className="form-label">Coach:</label>
              <input
                type="text"
                className="form-control"
                value={coachName}
                onChange={(e) => setCoachName(e.target.value)}
                placeholder="Coach Name"
              />
            </div>
            <div className="col-md-6">
            <label htmlFor="wp-number" className="form-label">WP-Number:</label>
              <input
                type="text"
                className="form-control"
                value={wpnumber}
                onChange={(e) => setWpNumber(e.target.value)}
                placeholder="WP Number"
              />
            </div>
            
            <div className="col-md-6">
              <label htmlFor="dateOfBirth" className="form-label">Date of Birth:</label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="row g-2 mt-3">
              <div className="col-12 col-md-auto">
                <button type="submit" className="btn btn-primary w-100">Update Profile</button>
              </div>
              <div className="col-12 col-md-auto">
                <AdminDeleteUserPage userId={userId} />
              </div>
            </div>
          </form>
        )}
      </div>
      <img src="/western-province-figure-skating.png" alt="WP_Logo"/>
    </div>
  );
}

export default AdminUpdateUserPage;
