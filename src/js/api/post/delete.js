import { API_SOCIAL_POSTS } from '../constants';
import { headers } from '../headers';

export async function deletePost(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    // Check if there is any content to parse
    if (response.status !== 204) {
      return await response.json(); // Parse JSON only if response is not empty
    }

    return; // Return nothing if the response is empty
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
