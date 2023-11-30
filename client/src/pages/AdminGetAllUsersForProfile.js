//Similar component to AdminGetAllUserPage, but with varying functionality. This component is used for
// selecting users meant for the main profile diaplay and has an immediate useEffect update trigger.
//Once again, first tested with routers, controllers, schema and Thunderclient and then using that data
//to build the fetch.

import React, { useState, useEffect } from "react";

function AdminGetAllUsersForProfile({ onUserSelect, updateTrigger }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          //Users the same endpoint to GET the necessary data.
          "http://localhost:8080/api/users/all-users"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [updateTrigger]); // Depend on updateTrigger

  const handleSelectionChange = (event) => {
    onUserSelect(event.target.value);
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4 border-bottom pb-2">
            Select User for Profile
          </h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <select className="form-select" onChange={handleSelectionChange}>
              <option value="">Select a User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} {user.surname}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminGetAllUsersForProfile;
