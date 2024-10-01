import { API_SOCIAL_POSTS } from '../constants';
import { headers } from '../headers';

// Function to fetch posts from api and limit to 12 post displayed
export async function readPosts(limit = 12) {
  try {
    const url = `${API_SOCIAL_POSTS}?_author=true`; // Fetch posts and author name

    const response = await fetch(url, {
      method: "GET",
      headers: headers(),
    });

    console.log('Fetching posts from URL:', url); // Debugging log
    console.log('API response status:', response.status); // Debugging log

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();

    console.log('Fetched posts:', posts); // Debugging log

    // Slice the posts to get the specified limit
    return posts.data.slice(0, limit);
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

// Function to read a single post by ID
export async function readPost(id) {
  try {
    const url = `${API_SOCIAL_POSTS}/${id}?_author=true`;

    console.log('Fetching post with ID:', id); // Debugging log
    console.log('Using URL:', url); // Debugging log

    const response = await fetch(url, {
      method: "GET",
      headers: headers(),
    });

    console.log('API response status:', response.status); // Debugging log

    if (!response.ok) {
      throw new Error("Failed to fetch the post");
    }

    const post = await response.json();

    console.log('Fetched post:', post); // Debugging log

    return post.data;
  } catch (error) {
    console.error("Error fetching the post:", error);
    throw error;
  }
}
