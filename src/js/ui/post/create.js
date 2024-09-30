import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
  // Prevent the default form submission
  event.preventDefault();

  // Extract data from the form
  const form = event.target;
  const title = form.title.value;
  const body = form.body.value;
  const tags = form.tags.value.split(",").map(tag => tag.trim());
  const mediaUrl = form.mediaUrl.value; // Assuming there's an input named mediaUrl
  const mediaAlt = form.mediaAlt.value; // Assuming there's an input named mediaAlt

  const postData = {
    title,
    body,
    tags,
  };
  
  // Add media only if mediaUrl is provided
  if (mediaUrl) {
    postData.media = { url: mediaUrl, alt: mediaAlt || "Post image" };
  }

  try {
    console.log(postData)
    // Call the API to create the post
    await createPost(postData);
    alert("Post created successfully!");
    window.location.href = "/"; // Redirect to home after successful creation
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Failed to create post. Please check your input and try again. MediaURL might not be accessible.");
  }
}
