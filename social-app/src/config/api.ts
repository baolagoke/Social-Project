const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api';

export const endpoints = {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    profile: `${API_BASE_URL}/users/profile`,
    posts: `${API_BASE_URL}/posts`,
    userPosts: `${API_BASE_URL}/posts/user`
}; 