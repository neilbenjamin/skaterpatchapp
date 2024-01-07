import React, { useState } from "react";
import AdminGetAllUserPage from "./AdminGetAllUserPage";
import "../style.css";

function AdminUpdatePatchCard() {
  const [userId, setUserId] = useState("");
  const [patches, setPatches] = useState([]);
  const [patchCardNumber, setPatchCardNumber] = useState("");
  const [purchaseInvoiceNumber, setPurchaseInvoiceNumber] = useState("");
  const [patchesRemaining, setPatchesRemaining] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

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
    const newPatchCardNumber = "PC" + Math.floor(Math.random() * 10000);
    const newPurchaseInvoiceNumber = "INV" + Math.floor(Math.random() * 10000);

    try {
      const response = await fetch(`/api/users/purchase-patch-card/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patchCardNumber: newPatchCardNumber,
          purchaseInvoiceNumber: newPurchaseInvoiceNumber,
        }),      
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setPatches(updatedUserData.user.patches);
        setPatchesRemaining(updatedUserData.user.patchesRemaining || 0);
        setPatchCardNumber(newPatchCardNumber);
        setPurchaseInvoiceNumber(newPurchaseInvoiceNumber);
        setSuccessMessage("New patch card purchased successfully");
        //Check correct patch output
        // console.log("Patches remaining after fetch:", updatedUserData.user.patchesRemaining);

      } else {
        throw new Error("Failed to purchase new patch card");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage(
        "An error occurred while purchasing the new patch card."
      );
      
    }
  };

  const handleSubmit = async (patchId, e) => {
    e.preventDefault();

    const patchToUpdate = patches.find((patch) => patch._id === patchId);

    if (!patchToUpdate) {
      console.error("Patch not found");
      return;
    }

    if (!patchToUpdate.used || !patchToUpdate.dateUsed || !patchToUpdate.partOfDay) {
      setSuccessMessage("Please fill in all fields before updating the patch.");
      return;
    }

    const updatedPatchData = {
      used: patchToUpdate.used,
      dateUsed: patchToUpdate.dateUsed,
      partOfDay: patchToUpdate.partOfDay,
    };

    try {
      const updateResponse = await fetch(`/api/users/${userId}/patches/${patchId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPatchData),
      });

      if (updateResponse.ok) {
        const updatedUserData = await updateResponse.json();
        setPatches(updatedUserData.user.patches);
        setPatchesRemaining(updatedUserData.user.patches.filter((patch) => !patch.used).length);

        if (patchToUpdate.used) {
          const patchHistoryData = {
            userId: userId,
            name: updatedUserData.user.name,  // Assuming userName is available in updatedUserData
            surname: updatedUserData.user.surname,  // Assuming userSurname is available in updatedUserData
            used: patchToUpdate.used,
            dateUsed: patchToUpdate.dateUsed,
            partOfDay: patchToUpdate.partOfDay,
            patchId: patchId // Unique identifier for the patch
          };

          await fetch(`/api/history/${userId}/add-patch-history`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patchHistoryData),
          });
        }

        setSuccessMessage("Patch updated successfully");
        //Check correct patch output
        // console.log("Patches remaining after fetch:", updatedUserData.user.patchesRemaining);

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
          <AdminGetAllUserPage onUserSelect={handleUserSelect} />
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
        </div>

        {userId && (
          <>
            {patchesRemaining === 0 || patches.length === 0 ? (
              <button onClick={handlePurchasePatchCard} className="btn btn-secondary mb-3">
                Purchase New Patch Card
              </button>
            ) : null}

            {patches.map((patch, index) => {
              if (!patch.updated) {
                return (
                  <div key={index} className="row mb-3">
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={patch.used}
                          onChange={e => handlePatchChange(index, "used", e.target.checked)}
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
                            onChange={e => handlePatchChange(index, "dateUsed", e.target.value)}
                          />
                        </div>
                        <div className="col-md-3">
                          <select
                            className="form-control"
                            value={patch.partOfDay || ""}
                            onChange={e => handlePatchChange(index, "partOfDay", e.target.value)}
                          >
                            <option value="">Select Session</option>
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Evening">Evening</option>
                          </select>
                        </div>
                        <div className="col-md-1">
                          <button
                            onClick={e => handleSubmit(patch._id, e)}
                            className="btn btn-secondary"
                          >
                            Update Patch
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </>
        )}
      </div>
      <img src="/western-province-figure-skating.png" alt="WP_Logo" />
    </div>
  );
}

export default AdminUpdatePatchCard;
