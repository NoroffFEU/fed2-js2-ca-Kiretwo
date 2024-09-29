import { readPosts } from "../../api/post/read.js";

// Function to initialize the home page
export async function initHomePage() {
  try {
    const posts = await readPosts(12); // Fetch only the first 12 posts

    // Get the feed container in the HTML
    const feedContainer = document.getElementById('feed');
    if (!feedContainer) {
      console.error('Feed container not found in the DOM');
      return;
    }

    feedContainer.innerHTML = ''; // Clear any existing content

    // Render each post
    posts.forEach(post => {
      const postElement = document.createElement('article');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        ${post.media?.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}">` : ''}
        <span>By: ${post.author ? post.author.name : 'Unknown'}</span>
      `;
      feedContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error displaying posts:', error);
  }
}
