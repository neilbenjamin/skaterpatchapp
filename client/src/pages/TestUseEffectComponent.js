import React, { useState, useEffect } from 'react';

function TestUseEffectComponent() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      async function fetchUsers() {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch('/api/users/skater');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error(error.message);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      fetchUsers();
    }, []);

    return (
        <div>
            <h3>Users</h3>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>{user.name} {user.surname}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TestUseEffectComponent;
