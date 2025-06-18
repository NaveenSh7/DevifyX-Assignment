import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return (window.location.href = '/auth');

    axios
      .get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        window.location.href = '/auth';
      });
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div key={user._id} className="flex items-center gap-4 p-4 border rounded">
              <img
                src={user.avatarUrl || 'https://ui-avatars.com/api/?name=User'}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className=" text-gray-800">{user.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
