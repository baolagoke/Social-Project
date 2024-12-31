export interface Post {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
    name: string | null;
    profilePictureUrl: string | null;
  };
} 