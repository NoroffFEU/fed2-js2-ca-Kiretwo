import { readPost } from "../../api/post/read.js";
import { onUpdatePost } from "../../ui/post/update.js";
import { authGuard } from "../../utilities/authGuard";

// Ensure the user is authenticated
authGuard();

// Function to initialize the edit post page
export async function initEditPostPage(postId) {
  try {
    // Fetch the post data to prepopulate the form
    const post = await readPost(postId);

    // Get the edit form from the DOM
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

    // Set the post ID in the form dataset to use during the update
    editForm.dataset.postId = postId;

    // Add the submit event listener to handle updating the post
    editForm.addEventListener("submit", (event) => {
      // Validate the form before submission
      if (!editForm.title.value.trim() || !editForm.body.value.trim()) {
        event.preventDefault(); // Prevent form submission if fields are empty
        alert("Title and Body are required fields.");
      } else {
        onUpdatePost(event); // Proceed with updating the post
      }
    });
  } catch (error) {
    console.error("Error initializing edit post page:", error);
    alert("Failed to load post for editing. Please try again later.");
  }
}

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const postId = params.get("id");

  if (postId) {
    await initEditPostPage(postId);
  } else {
    console.error("Invalid post URL, post ID is missing.");
  }
