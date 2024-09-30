import { API_SOCIAL_POSTS } from '../constants';
import { headers } from '../headers';

export async function createPost({ title, body, tags = [], media }) {
  try {
    const postData = {
      title,
      body,
      tags,
      ...(media && { media: { url: media } }) // Include media if provided
    };

    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: headers(), // Use the centralized headers function
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
