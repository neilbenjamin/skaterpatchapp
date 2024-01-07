import React, { useState, useEffect } from 'react';
import { fetchUsers } from './fetchUsers'; // Adjust the import path as necessary

function AdminPatchArchives() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [patchHistories, setPatchHistories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users when the component mounts
    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                setError(err.message);
            }
        };

        getUsers();
    }, []);

    // Fetch patch history when a user is selected
    useEffect(() => {
        if (!selectedUserId) return;

        const fetchPatchHistories = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/history/${selectedUserId}/patch-history`);

                if (!response.ok) {
                    throw new Error('Failed to fetch patch histories');
                }

                const data = await response.json();
                setPatchHistories(data.patchHistory);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatchHistories();
    }, [selectedUserId]);

    const handleUserChange = (e) => {
        setSelectedUserId(e.target.value);
    };

    return (
        <div>
            <h2>Patch History</h2>
            <select onChange={handleUserChange} value={selectedUserId}>
                <option value="">Select a User</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name} {user.surname}</option>
                ))}
            </select>

            {isLoading && <p>Loading patch histories...</p>}
            {error && <p>Error: {error}</p>}

            {patchHistories.length > 0 && (
                <ul>
                    {patchHistories.map((patchHistory, index) => (
                        <li key={index}>
                            <p>Date Used: {patchHistory.dateUsed}</p>
                            <p>Part of Day: {patchHistory.partOfDay}</p>
                            {/* Add more details here if necessary */}
                        </li>
                    ))}
                </ul>
            )}

            {patchHistories.length === 0 && !isLoading && <p>No patch history found for this user</p>}
        </div>
    );
}

export default AdminPatchArchives;
