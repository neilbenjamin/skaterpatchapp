//Main delete function to delete user from the database. End point and function first tested in Thunderclient with the
//backend routers/controllers/models set up and then constructed in react to match. I used Hyperion, Thunderclient and Open AI with the error handling and route checking


import React, { useState } from "react";

//Importing userId to match correct user with database
function AdminDeleteUserPage({ userId }) {
  //State components to manage state logic
  const [isDeleted, setIsDeleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Async function to handle the delete fetch request
  const handleDelete = async () => {
    if (!userId) {
      setErrorMessage("No user selected.");
      return;
    }
    try {
      const response = await fetch(
        `/api/users/delete-user/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setIsDeleted(true);
        setErrorMessage("");
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  //JSX updating state based on user interaction.
  return (
    <div className="container">
      {isDeleted ? (
        <p>User has been successfully deleted.</p>
      ) : (
        <>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete User
          </button>
        </>
      )}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
}

export default AdminDeleteUserPage;
