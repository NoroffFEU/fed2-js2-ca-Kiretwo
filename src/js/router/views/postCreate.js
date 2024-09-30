import { onCreatePost } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard.js";

// Check if user is authorized to create a post
authGuard();

const form = document.forms.createPost;
if (form) {
  form.addEventListener("submit", onCreatePost);
}