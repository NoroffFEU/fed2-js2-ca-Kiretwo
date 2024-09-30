import { API_SOCIAL_POSTS } from '../constants';
import { headers } from '../headers';

export async function createPost({ title, body, tags = [], media }) {
  try {
    // Prepare the postData object
    const postData = {
      title,
      body,
      tags,
    };

    // Add the media object only if a URL is provided
    if (media && media.url) {
      postData.media = {
        url: media.url,
        alt: media.alt || "Post image", // Provide a default alt text if none is provided
      };
    }

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

