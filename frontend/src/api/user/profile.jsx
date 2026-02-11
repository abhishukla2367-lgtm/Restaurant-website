import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Pointing to /api/auth/profile to match backend
                const response = await fetch('/api/auth/profile');
                
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: Not Found`);
                }

                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error} (Check if Backend is running)</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>User Profile</h1>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    {/* Fixed .length error using optional chaining */}
                    <p>Total Orders: {user.orders?.length || 0}</p>
                </div>
            )}
        </div>
    );
};

export default Profile;
