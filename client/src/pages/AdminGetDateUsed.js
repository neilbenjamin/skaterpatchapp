import React, { useEffect } from 'react';

function AdminGetDateUsed({ userId, patchId, onDateUsedFetched }) {
  useEffect(() => {
    const fetchDateUsed = async () => {
      // Ensure both userId and patchId are provided
      if (!userId || !patchId) return;

      try {
        // Fetch the date used for the specific patch of the user
        const response = await fetch(`/api/users/get-date-used/${userId}/patches/${patchId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch date used');
        }
        const { dateUsed } = await response.json();

        // Invoke the callback to pass the dateUsed to the parent component
        onDateUsedFetched(dateUsed);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDateUsed();
  }, [userId, patchId, onDateUsedFetched]); // Dependency array to control the effect

  // This component does not render anything, it's just for data fetching
  return null;
}

export default AdminGetDateUsed;
