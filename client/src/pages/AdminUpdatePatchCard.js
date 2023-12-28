import React, { useState } from "react";
import AdminGetAllUsersPage from "./AdminGetAllUserPage";

function AdminUpdatePatchCard() {
  const [userId, setUserId] = useState("");
  const [patches, setPatches] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [patchCardNumber, setPatchCardNumber] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [purchaseInvoiceNumber, setPurchaseInvoiceNumber] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [patchesRemaining, setPatchesRemaining] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const handleUserSelect = async (selectedUserId) => {
    setUserId(selectedUserId);
    if (selectedUserId) {
      try {
        const response = await fetch(`/api/users/get-user-profile/${selectedUserId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await response.json();
        setPatches(userData.patches || []);
        setPatchCardNumber(userData.patchCardNumber || "");
        setPurchaseInvoiceNumber(userData.purchaseInvoiceNumber || "");
        setPatchesRemaining(userData.patchesRemaining || 0);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setPatches([]);
      setPatchCardNumber("");
      setPurchaseInvoiceNumber("");
      setPatchesRemaining(0);
    }
  };

  const handlePatchChange = (patchIndex, field, value) => {
    setPatches((prevPatches) =>
      prevPatches.map((patch, index) =>
        index === patchIndex ? { ...patch, [field]: value } : patch
      )
    );
  };

  const handlePurchasePatchCard = async () => {
    try {
      const response = await fetch(`/api/users/purchase-patch-card/${userId}`, {
        method: "POST"
      });

      if (response.ok) {
        setSuccessMessage("New patch card purchased successfully");
        // Fetch updated user data to reflect new patches and patchesRemaining
        const updatedUserData = await response.json();
        setPatches(updatedUserData.user.patches);
        setPatchesRemaining(updatedUserData.user.patchesRemaining);
      } else {
        throw new Error("Failed to purchase new patch card");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("An error occurred while purchasing the new patch card.");
    }
  };

  const handleSubmit = async (patchId, e) => {
    e.preventDefault();
    const patchToUpdate = patches.find(patch => patch._id === patchId);
  
    if (!patchToUpdate) {
      console.error("Patch not found");
      return;
    }
  
    // Check if all required fields are filled in
    if (!patchToUpdate.used || !patchToUpdate.dateUsed || !patchToUpdate.partOfDay) {
      setSuccessMessage("Please fill in all fields before updating the patch.");
      return;
    }
  
    // Ensure partOfDay is either a valid enum value or null
    const updatedPatchData = {
      ...patchToUpdate,
      partOfDay: patchToUpdate.partOfDay || null,
    };
  
    try {
      const response = await fetch(`/api/users/${userId}/patches/${patchId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPatchData),
      });
  
      if (response.ok) {
        setSuccessMessage("Patch card updated successfully");
        const updatedUserData = await response.json();
        setPatches(updatedUserData.user.patches);
        // Update patchesRemaining based on the number of unused patches
        setPatchesRemaining(updatedUserData.user.patches.filter(patch => !patch.used).length);
      } else {
        throw new Error("Failed to update patch card");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("An error occurred while updating the patch card.");
    }
  };
  
  


return (
  <div className="container mt-4 text-center">
    <div className="row">
      <div className="col-12">
        <h2 className="text-center mb-4 font-weight-bold">UPDATE PATCH CARD</h2>
        <AdminGetAllUsersPage onUserSelect={handleUserSelect} />
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
      </div>

      {userId && (
  <>
    <button onClick={handlePurchasePatchCard} className="btn btn-secondary mb-3">
      Purchase New Patch Card
    </button>

    {patches.map((patch, index) => (
      <div key={index} className="row mb-3">
        <div className="col-md-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={patch.used}
              onChange={(e) => handlePatchChange(index, 'used', e.target.checked)}
              id={`patch-used-${index}`}
            />
            <label className="form-check-label" htmlFor={`patch-used-${index}`}>
              Patch #{index + 1} Used
            </label>
          </div>
        </div>
        {patch.used && (
          <>
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                value={patch.dateUsed || ""}
                onChange={(e) => handlePatchChange(index, 'dateUsed', e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                value={patch.partOfDay || ""}
                onChange={(e) => handlePatchChange(index, 'partOfDay', e.target.value)}
              >
                <option value="">Select Session</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </div>
          </>
        )}
        <div className="col-md-1">
          <button onClick={(e) => handleSubmit(patch._id, e)} className="btn btn-primary">
            Update Patch
          </button>
        </div>
      </div>
    ))}
  </>
)}
    </div>
    <img src="/western-province-figure-skating.png" alt="WP_Logo" />
  </div>
);
}

export default AdminUpdatePatchCard;
