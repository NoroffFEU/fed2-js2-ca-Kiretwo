import { createPost } from "../../api/post/create.js";

export async function onCreatePost(event) {
  event.preventDefault(); // Prevent default form submission

  // Extract form data
  const form = event.target;
  const title = form.title.value;
  const body = form.body.value;
  const tags = form.tags.value.split(",").map(tag => tag.trim());
  const media = form.mediaUrl.value;

  const postData = {
    title,
    body,
    tags: tags.filter(tag => tag), // Remove empty tags
    media: media ? { url: media, alt: "User-provided image" } : null,
  };

  try {
    // Call the API to create the post
    await createPost(postData);

    // Redirect or update UI after a successful post
    alert("Post created successfully!");
    window.location.href = "/"; // Redirect to homepage or feed
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Failed to create post. Please try again.");
  }
}
