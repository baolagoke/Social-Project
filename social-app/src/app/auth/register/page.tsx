'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { endpoints } from '@/config/api';

// Example Register Page
export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(endpoints.register, {
        username,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log("response", response);
      setSuccess(response.data.message); 
      // e.g. "User registered successfully"
    } catch (err: any) {
      // If error is returned from the server
      if (err.response) {
        setError(err.response.data.message || 'Registration failed');
      } else {
        setError('Unable to register. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        
        {error && <p className="bg-red-200 p-2 mb-2 text-red-800">{error}</p>}
        {success && <p className="bg-green-200 p-2 mb-2 text-green-800">{success}</p>}

        <div className="mb-4">
          <label className="block mb-1">Username:</label>
          <input
            type="text"
            className="border w-full p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
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
          Sign Up
        </button>
      </form>
    </div>
  );
}