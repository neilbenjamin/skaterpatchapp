//Main Skater profile display. I will incorpate an image in due course. The core function of the application 
//is realized here when skaters are able to view their skater patch status and how many patches they have 
//left. I also aim to incorporate a coach section where coaches are able to send feedback to individuals skaters 
// as well as general messages to all skaters. 
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function SkaterProfileDisplayPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      setIsLoading(true);
      try {
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
  }, []);

  if (isLoading) {
    return <div className="container"><p>Loading...</p></div>;
  }
//Same view as per the admin page. 
  if (!userProfile) {
    return <div className="container"><p>User profile not found.</p></div>;
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
                <p className="card-text">{field.value || 'Not Available'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkaterProfileDisplayPage;
