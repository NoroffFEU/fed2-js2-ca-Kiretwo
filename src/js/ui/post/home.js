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

export function handleAuthUI() {
  const accessToken = localStorage.getItem('accessToken');

  const createPostButton = document.getElementById('create-post-button');
  const logoutButton = document.getElementById('logout');
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');

  // Toggle the visibility of links and buttons if you are logged in or not
  if (createPostButton && logoutButton && loginLink && registerLink) {
    if (accessToken) {
      createPostButton.classList.remove('hidden');
      logoutButton.classList.remove('hidden');
      loginLink.classList.add('hidden');
      registerLink.classList.add('hidden');
    } else {
      createPostButton.classList.add('hidden');
      logoutButton.classList.add('hidden');
      loginLink.classList.remove('hidden');
      registerLink.classList.remove('hidden');
    }
  }

  // Add click event listeners to the links
  if (loginLink) {
    loginLink.addEventListener('click', () => {
      localStorage.clear();
    });
  }

  if (registerLink) {
    registerLink.addEventListener('click', () => {
      localStorage.clear();
    });
  }
}
