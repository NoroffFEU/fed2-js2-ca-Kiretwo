import { readPost } from "../../api/post/read.js";
import { onUpdatePost } from "../../ui/post/update.js";
import { authGuard } from "../../utilities/authGuard";

authGuard();

export async function initEditPostPage(postId) {
  try {
    // Fetch the post data to prepopulate the form
    const post = await readPost(postId);

    // Get the edit form
    const editForm = document.forms.editPost;
    if (!editForm) {
      console.error("Edit form not found in the DOM");
      return;
    }

    // Prepopulate the form fields with the post data
    editForm.title.value = post.title || '';
    editForm.body.value = post.body || '';
    editForm.tags.value = post.tags?.join(', ') || '';
    editForm.mediaUrl.value = post.media?.url || '';
    editForm.mediaAlt.value = post.media?.alt || '';

    // Set post ID in the form dataset to use during the update
    editForm.dataset.postId = postId;

    // Add the submit event listener to handle updating the post
    editForm.addEventListener("submit", onUpdatePost);
  } catch (error) {
    console.error("Error initializing edit post page:", error);
    alert("Failed to load post for editing. Please try again later.");
  }
}

// Execute the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", async () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const postId = params.get("id");

  if (postId) {
    await initEditPostPage(postId);
  } else {
    console.error("Invalid post URL, post ID is missing.");
  }
});
