import { updatePost } from "../../api/post/update.js";

export async function onUpdatePost(event) {
  event.preventDefault();

  const form = event.target;
  const postId = form.dataset.postId; // Get the postId from edit form dataset
  const title = form.title.value;
  const body = form.body.value;
  const tags = form.tags.value.split(",").map(tag => tag.trim());
  const mediaUrl = form.mediaUrl.value;
  const mediaAlt = form.mediaAlt.value;

  const postData = {
    title,
    body,
    tags,
    media: {
      url: mediaUrl,
      alt: mediaAlt || "Updated post image",
    },
  };

  try {
    await updatePost(postId, postData);
    alert("Post updated successfully!");
    window.location.href = `/post/?id=${postId}`;
  } catch (error) {
    console.error("Error updating post:", error);
    alert("Failed to update post. Please try again.");
  }
}
