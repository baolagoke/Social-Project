'use client';

import { Post } from '@/types/post';
import Image from 'next/image';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-3 mb-3">
            {post.author.profilePictureUrl ? (
              <img
                src={post.author.profilePictureUrl}
                alt={post.author.username}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg">
                  {post.author.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <p className="font-semibold">
                {post.author.name || post.author.username}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
        </div>
      ))}
    </div>
  );
} 