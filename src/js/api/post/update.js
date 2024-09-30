import { API_SOCIAL_POSTS } from '../constants';
import { headers } from '../headers';

export async function updatePost(id, { title, body, tags = [], media }) {
  try {
    const postData = {
      title,
      body,
      tags,
    };

    // Add media if provided
    if (media && media.url) {
      postData.media = {
        url: media.url,
        alt: media.alt || "Post image",
      };
    }

    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
