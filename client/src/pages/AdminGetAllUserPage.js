//Main component to fetch the data for general purpose view to update the user.
//This was quite tricky to impliment as I wanted and relied quiet heaviliy on OpenAI for assistance.
import React, { useState, useEffect } from 'react';

function AdminGetAllUsersPage({ onUserSelect, updateTrigger }) {
  // State to store the list of users and loading status
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effect hook to fetch users data when the component mounts
  useEffect(() => {
    // Asynchronous function to fetch user data
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Send a request to the API endpoint for fetching all users
        const response = await fetch('http://localhost:8080/api/users/all-users');
        
        // Check if the response is successful; otherwise, throw an error
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        
        // Parse the response data as JSON and set it in the state
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        // Log and handle errors in case of failure
        console.error('Failed to fetch users:', error);
      } finally {
        // Mark loading as complete, whether successful or not
        setIsLoading(false);
      }
    };

    // Call the fetchUsers function when the component mounts
    fetchUsers();
  }, [updateTrigger]);

  // Function to handle user selection
  const handleUserSelect = (event) => {
    onUserSelect(event.target.value); // Pass the selected userId back to the parent component
  };

  // JSX to render the component
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4 border-bottom pb-2">All Users</h2>
          {isLoading ? (
            // Display a loading message while data is being fetched
            <p>Loading...</p>
          ) : (
            // Display a dropdown menu with user options once data is loaded. Pass data back to 
            //AdminUpdateUserPage.js
            <select className="form-select" onChange={handleUserSelect}>
              <option value="">Select a User</option>
              {users.map((user) => (
                // Map through the list of users and generate options
                <option key={user._id} value={user._id}>
                  {user.name} {user.surname} (ID: {user._id})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminGetAllUsersPage;
