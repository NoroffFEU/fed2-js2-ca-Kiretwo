import { deletePost } from "../../api/post/delete.js";

export async function onDeletePost(postId) {
  try {
    await deletePost(postId);
    alert("Post deleted successfully!");
    window.location.href = "/"; // Redirect to home after deletion
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Failed to delete post. Please try again.");
  }
}
