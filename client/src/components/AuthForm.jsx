import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate = useNavigate();
  const handleAuth = async () => {
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup';
      const res = await API.post(endpoint, { email, password });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        console.log("ss")
         navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.msg || 'Auth error');
    }
  };

  return (
    <div>
      <input
        type="email"
        className="w-full p-2 border rounded mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full p-2 border rounded mb-4"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 w-full text-white py-2 rounded hover:bg-blue-700"
        onClick={handleAuth}
      >
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </button>
    </div>
  );
}
