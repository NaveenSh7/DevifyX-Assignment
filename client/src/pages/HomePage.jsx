import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return (window.location.href = '/auth');

    axios
      .get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        window.location.href = '/auth';
      });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadAvatar = async () => {
    const fileInput = document.getElementById('avatarInput');
    if (!fileInput.files[0]) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('avatar', fileInput.files[0]);

    try {
      const res = await axios.post('http://localhost:5000/api/avatar/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setUser((prev) => ({ ...prev, avatarUrl: res.data.avatarUrl }));
      setPreview(null);
    } catch (err) {
      alert('Upload failed');
      console.log(err)
    }
    setLoading(false);
  };

  const deleteAvatar = async () => {
    setLoading(true);
    try {
      await axios.delete('http://localhost:5000/api/avatar/delete', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((prev) => ({ ...prev, avatarUrl: null }));
      setPreview('https://docs.gravatar.com/wp-content/uploads/2025/02/avatar-mysteryperson-20250210-256.png');
    } catch {
      alert('Delete failed');
    }
    setLoading(false);
  };

  if (!user) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow text-center max-w-md w-full">
     <img
  src={preview || user.avatarUrl || 'https://ui-avatars.com/api/?name=User'}
  alt="avatar"
  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
  style={{ maxWidth: '12rem', maxHeight: '12rem' }}
/>


        <h1 className="text-xl font-bold mb-2">{user.email}</h1>

        <input
          id="avatarInput"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="mb-8 "
        />

        <div className="flex justify-center gap-4 mb-4">
          <button
            disabled={!preview || loading}
            onClick={uploadAvatar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Change Avatar'}
          </button>
          <button
            disabled={!user.avatarUrl || loading}
            onClick={deleteAvatar}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Delete Avatar'}
          </button>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/auth';
          }}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
