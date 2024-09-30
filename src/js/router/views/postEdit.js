import { authGuard } from "../../utilities/authGuard";
import { onUpdatePost } from "../../ui/post/update.js";

authGuard();

export function initEditPostPage(postId) {
  // Select the form and populate it with the post data
  const editForm = document.forms['editPost'];
  
  if (!editForm) {
    console.error("Edit form not found in the DOM");
    return;
  }

  // Add the postId to the form for later use when updating
  editForm.dataset.postId = postId;

  // Set up the event listener for form submission
  editForm.addEventListener('submit', onUpdatePost);
}
