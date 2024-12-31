'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { endpoints } from '@/config/api';

export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [message, setMessage]   = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post(endpoints.login, {
        email,
        password,
      });

      const { message, token } = response.data;
      setMessage(message);

      console.log('Login response:', response.data);

      if (token) {
        localStorage.setItem('authToken', token);
        router.push('/profile');
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('Unable to login. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && <p className="bg-red-200 p-2 mb-2 text-red-800">{error}</p>}
        {message && <p className="bg-green-200 p-2 mb-2 text-green-800">{message}</p>}

        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            className="border w-full p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            className="border w-full p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}