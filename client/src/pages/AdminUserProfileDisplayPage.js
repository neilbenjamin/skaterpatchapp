//Component used to fetch a single user profile from the database based on the user id
//passed in as prop from the AdminGetAllUsersForProfile.js component. Based on the userId, 
//This component will get the required userId and return the fields stipulated below which will give us 
//the main Sinle User Profile when imported into the AdminProfilePage.js. Again, relied quite heavily on OpenAI for clarity and examples to asssist.
import React, { useState, useEffect } from 'react';

function AdminUserProfileDisplayPage({ userId }) {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        //New endpoint for single userId fetch.
        const response = await fetch(`http://localhost:8080/api/users/get-user-profile/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!userId) {
    return <div className="container"><p>Please select a user to view their profile.</p></div>;
  }

  if (isLoading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  if (!userProfile) {
    return <div className="container"><p>No user profile found.</p></div>;
  }

  const profileFields = [
    { label: 'Skater Name', value: userProfile.name },
    { label: 'WP Number', value: userProfile.wpnumber },
    { label: 'Coach', value: userProfile.coachName },
    { label: 'Patches Remaining', value: userProfile.patchesRemaining },
    { label: 'Date Purchased', value: userProfile.datePurchased },
    { label: 'Date Used', value: userProfile.dateUsed },
    { label: 'Expiry Date', value: userProfile.expiryDate },
    { label: 'Patch Card No', value: userProfile.patchCardNumber },
    { label: 'Invoice Purchase No', value: userProfile.purchaseInvoiceNumber },
  ];

  return (
    <div className="container">
      <h3>{userProfile.name + ' ' + userProfile.surname}</h3>
      <div className="row">
        {profileFields.map((field, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{field.label}</h5>
                <p className="card-text">{field.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUserProfileDisplayPage;
