// A reusable function to fetch users
export const fetchUsers = async () => {
    try {
        const response = await fetch('/api/users/skater');
        
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        
        const data = await response.json();
        return data;  // Return the fetched data
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;  // Rethrow the error for handling in the calling component
    }
};
