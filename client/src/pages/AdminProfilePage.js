//Main Profile display page for Admin User Profile importing the AdminGetAllUsersForProfile AdminUserProfileDisplayPage 
//and passing the necessary props out and receiving the data back from child components. 
//The display is slightly different here to display only the fields which will also mirror the skater 
//profile so the admin can essentially controller the skater's profile view here.
import React, { useState } from "react";
import AdminGetAllUsersForProfile from "./AdminGetAllUsersForProfile";
import AdminUserProfileDisplayPage from "./AdminUserProfileDisplayPage";

function AdminProfilePage() {
  const [selectedUserId, setSelectedUserId] = useState("");

  return (
    <div>
      {/* Setting the prop to get the selected user */}
      <AdminGetAllUsersForProfile onUserSelect={setSelectedUserId} />
      {/* Setting the prop to pass the selectedUser ID to the page component used to display the selected user profile. */}
      <AdminUserProfileDisplayPage userId={selectedUserId} />
    </div>
  );
}

export default AdminProfilePage;
