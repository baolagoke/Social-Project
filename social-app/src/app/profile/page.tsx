'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { endpoints } from '@/config/api';
import { Post } from '@/types/post';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  name: string | null;
  bio: string | null;
  profilePictureUrl: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    profilePictureUrl: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Fetch user profile and posts
    fetchProfile();
    fetchUserPosts();
  }, [router]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Token being sent:', token);

      if (!token) {
        console.error('No token found');
        router.push('/auth/login');
        return;
      }

      // Log token parts for debugging
      const [header, payload, signature] = token.split('.');
      console.log('Token header:', JSON.parse(atob(header)));
      console.log('Token payload:', JSON.parse(atob(payload)));

      const response = await axios.get(endpoints.profile, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log('Profile response:', response.data);
      setProfile(response.data);
      setEditForm({
        name: response.data.name || '',
        bio: response.data.bio || '',
        profilePictureUrl: response.data.profilePictureUrl || ''
      });
    } catch (err: any) {
      console.error('Profile fetch error:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        headers: err.response?.headers,
        config: err.response?.config
      });
      setError('Failed to load profile');
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push('/auth/login');
      }
    }
  };

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(endpoints.userPosts, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setPosts(response.data);
    } catch (err: any) {
      console.error('User posts fetch error:', err);
      setError('Failed to load posts');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(
        endpoints.profile,
        editForm,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      setMessage('Profile updated successfully');
      setIsEditing(false);
      fetchProfile(); // Refresh profile data
    } catch (err: any) {
      console.error('Profile update error:', {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        headers: err.response?.headers,
        config: err.response?.config
      });
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!profile) {
    return <div className="min-h-screen text-black flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen text-black bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          
          {error && <p className="bg-red-200 p-2 mb-2 text-red-800 rounded">{error}</p>}
          {message && <p className="bg-green-200 p-2 mb-2 text-green-800 rounded">{message}</p>}

          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {profile.profilePictureUrl && (
                  <img
                    src={profile.profilePictureUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold">{profile.name || profile.username}</h2>
                  <p className="text-gray-600">@{profile.username}</p>
                  <p className="text-gray-600">{profile.email}</p>
                </div>
              </div>
              
              {profile.bio && (
                <div className="mt-4">
                  <h3 className="font-semibold">Bio</h3>
                  <p className="text-gray-700">{profile.bio}</p>
                </div>
              )}

              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block mb-1">Name:</label>
                <input
                  type="text"
                  className="border w-full p-2 rounded"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Bio:</label>
                <textarea
                  className="border w-full p-2 rounded"
                  value={editForm.bio}
                  onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                  rows={4}
                />
              </div>

              <div>
                <label className="block mb-1">Profile Picture URL:</label>
                <input
                  type="url"
                  className="border w-full p-2 rounded"
                  value={editForm.profilePictureUrl}
                  onChange={(e) => setEditForm({...editForm, profilePictureUrl: e.target.value})}
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-black px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Your Posts</h2>
          <PostForm onPostCreated={fetchUserPosts} />
          <PostList posts={posts} />
        </div>
      </div>
    </div>
  );
}