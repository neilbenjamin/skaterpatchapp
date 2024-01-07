//Main Profile display page for Admin User Profile importing the AdminGetAllUsersForProfile AdminUserProfileDisplayPage 
//and passing the necessary props out and receiving the data back from child components. 
//The display is slightly different here to display only the fields which will also mirror the skater 
//profile so the admin can essentially controller the skater's profile view here.
import React, { useState } from "react";
import AdminGetAllUsersForProfile from "./AdminGetAllUsersForProfile";
import AdminUserProfileDisplayPage from "./AdminUserProfileDisplayPage";

function AdminProfilePage() {
  const [selectedUserId, setSelectedUserId] = useState("");

  // This function handles the selection change from AdminGetAllUsersForProfile
  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div>
      {/* Pass the selection handler to AdminGetAllUsersForProfile */}
      <AdminGetAllUsersForProfile onUserSelect={handleUserSelection} />
      {/* Pass the selectedUserId to AdminUserProfileDisplayPage */}
      <AdminUserProfileDisplayPage userId={selectedUserId} />
      <div className="text-center">
        <img src="/western-province-figure-skating.png" alt="WP_Logo" />
      </div>
    </div>
  );
}

export default AdminProfilePage;
