import { readPosts } from "../../api/post/read.js";

export async function displayPosts() {
  try {
    const posts = await readPosts();

    const feedContainer = document.getElementById('feed');
    if (!feedContainer) {
      console.error('Feed container not found in the DOM');
      return;
    }

    feedContainer.innerHTML = ''; // Clear existing content

    posts.forEach(post => {
      const postElement = document.createElement('article');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h3><a href="/post/?id=${post.id}">${post.title}</a></h3>
        <p>${post.body}</p>
        ${post.media?.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}">` : ''}
        <p>Posted by: ${post.author?.name || 'Unknown'}</p>
      `;
      feedContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error displaying posts:', error);
    alert('Failed to load posts. Please try again later.');
  }
}
