import { readPost } from "../../api/post/read.js";

// Function to initialize the post page by displaying the post content
export async function initPostPage(postId) {
  try {
    console.log("Initializing post page for post ID:", postId); // Debugging log

    const post = await readPost(postId);
    console.log("Fetched post:", post); // Debugging log

    // Get the post detail container
    const postDetailContainer = document.getElementById("post-detail");
    if (!postDetailContainer) {
      console.error("Post detail container not found in the DOM");
      return;
    }

    // Display the post details in the container
    postDetailContainer.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      ${post.media?.url ? `<img src="${post.media.url}" alt="${post.media.alt || "Post image"}">` : ""}
      <p>Posted by: ${post.author?.name || 'Unknown'}<p>
      <p>Created at: ${new Date(post.created).toLocaleString()}</p>
    `;
  } catch (error) {
    console.error("Error displaying post:", error);
    alert("Failed to load post. Please try again later.");
  }
}
