import React, { useState, useEffect } from 'react';

function AdminUserProfileDisplayPage({ userId }) {
  const [userProfile, setUserProfile] = useState(null);
  const [mostRecentDateUsed, setMostRecentDateUsed] = useState('No date used yet');
  const [mostRecentPartOfDay, setMostRecentPartOfDay] = useState('Not available'); // New state for part of day
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/users/get-user-profile/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setUserProfile(data);

        const latestPatch = data.patches
          .filter(patch => patch.used)
          .reduce((latest, patch) => (patch.dateUsed > latest.dateUsed ? patch : latest), { dateUsed: '1900-01-01', partOfDay: '' });

        if (latestPatch.dateUsed !== '1900-01-01') {
          setMostRecentDateUsed(latestPatch.dateUsed);
          setMostRecentPartOfDay(latestPatch.partOfDay);
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (isLoading) {
    return <div className="container"><p>Loading profile...</p></div>;
  }

  if (error) {
    return <div className="container"><p>Error: {error}</p></div>;
  }

  if (!userProfile) {
    return <div className="container"><p>No profile found.</p></div>;
  }

  const profileFields = [
    { label: 'Skater Name', value: userProfile.name },
    { label: 'Skater Surname', value: userProfile.surname },
    { label: 'WP Number', value: userProfile.wpnumber || 'Add WP No.' },
    { label: 'Coach', value: userProfile.coachName || 'Add Coach' },
    { label: 'Patches Remaining', value: userProfile.patchesRemaining },
    { label: 'Date Purchased', value: userProfile.datePurchased },
    { label: 'Date Used', value: mostRecentDateUsed },
    { label: 'Part of Day', value: mostRecentPartOfDay },
    { label: 'Expiry Date', value: userProfile.expiryDate },
    { label: 'Patch Card No', value: userProfile.patchCardNumber },
    { label: 'Invoice Purchase No', value: userProfile.purchaseInvoiceNumber },
    { label: 'Contact Number', value: userProfile.contactNumberSkater || 'Add Contact No.' },
  ];

  return (
    <div className="container mt-4 text-center">
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
