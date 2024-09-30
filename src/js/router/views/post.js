import { readPost } from "../../api/post/read.js";
import { onDeletePost } from "../../ui/post/delete.js";

export async function initPostPage(postId) {
  try {
    const post = await readPost(postId);
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
      <p>Posted by: ${post.author?.name || 'Unknown'}</p>
      <p>Created at: ${new Date(post.created).toLocaleString()}</p>
      <div id="post-actions" class="hidden">
        <button id="edit-post">Edit</button>
        <button id="delete-post">Delete</button>
      </div>
    `;

    // Check if the logged-in user is the author
    const accessToken = localStorage.getItem("accessToken");
    const loggedInUsername = localStorage.getItem("username");

    if (accessToken && post.author?.name === loggedInUsername) {
      // Display the edit and delete buttons
      const postActionsContainer = document.getElementById("post-actions");
      postActionsContainer.classList.remove("hidden");

      // Add event listeners
      document.getElementById("edit-post").addEventListener("click", () => {
        window.location.href = `/post/edit/?id=${postId}`;
      });

      document.getElementById("delete-post").addEventListener("click", async () => {
        const confirmDelete = confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
          await onDeletePost(postId);
        }
      });
    }
  } catch (error) {
    console.error("Error displaying post:", error);
    alert("Failed to load post. Please try again later.");
  }
}

// Execute when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (postId) {
    await initPostPage(postId);
  } else {
    console.error("Invalid post URL, post ID is missing.");
  }
});
