// src/pages/postDetail.js
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

    // Check if the logged-in user is the author
    const accessToken = localStorage.getItem("accessToken");
    const loggedInUsername = localStorage.getItem("username");
    const isAuthor = accessToken && post.author?.name === loggedInUsername;

    // Display the post details in the container
    postDetailContainer.innerHTML = `
      <div class="card mb-5">
        ${
          post.media?.url
            ? `
          <img src="${post.media.url}" alt="${post.media.alt || "Post image"}" class="card-img-top img-fluid">
        `
            : ""
        }
        <div class="card-body">
          <h1 class="card-title">${post.title}</h1>
          <p class="card-text">${post.body}</p>
        </div>
        <div class="card-footer text-muted d-flex justify-content-between">
          <span>Posted by: ${post.author?.name || "Unknown"}</span>
          <span>Created at: ${new Date(post.created).toLocaleString()}</span>
        </div>
      </div>
      ${
        isAuthor
          ? `
        <div id="post-actions" class="mt-3 text-center">
          <button id="edit-post" class="btn btn-primary me-2">Edit</button>
          <button id="delete-post" class="btn btn-danger">Delete</button>
        </div>
      `
          : ""
      }
    `;

    if (isAuthor) {
      // Add event listeners
      document.getElementById("edit-post").addEventListener("click", () => {
        window.location.href = `/post/edit/?id=${postId}`;
      });

      document
        .getElementById("delete-post")
        .addEventListener("click", async () => {
          const confirmDelete = confirm(
            "Are you sure you want to delete this post?"
          );
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
