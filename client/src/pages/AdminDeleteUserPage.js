import React, { useState } from "react";

function AdminDeleteUserPage({ userId }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    if (!userId) {
      setErrorMessage("No user selected.");
      return;
    }

    // Confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) {
      console.log("Deletion canceled by user");
      return; // Exit the function if user cancels
    }

    try {
      const response = await fetch(`/api/users/delete-user/${userId}`, {
        method: "DELETE",
      });

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
