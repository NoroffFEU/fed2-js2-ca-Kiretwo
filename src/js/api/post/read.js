import { API_SOCIAL_POSTS, API_KEY } from '../constants';

// Fetch multiple posts with a limit (default to 12)
export async function readPosts(limit = 12) {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error("No access token found. Please log in first.");
    }

    const url = `${API_SOCIAL_POSTS}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();
    console.log(response);
    // Slice the data to only return the first `limit` number of posts
    return posts.data.slice(0, limit);
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
