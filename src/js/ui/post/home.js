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
      const postElement = document.createElement('div');
      postElement.classList.add('col-12', 'col-md-6', 'col-lg-4');

      postElement.innerHTML = `
        <a href="/post/?id=${post.id}" class="text-decoration-none">
          <div class="card h-100">
            ${post.media?.url ? `
              <img src="${post.media.url}" class="card-img-top" alt="${post.media.alt || 'Post image'}">
            ` : ''}
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body}</p>
              <p class="card-text mt-auto">
                <small class="text-muted">Posted by: ${post.author?.name || 'Unknown'}</small>
              </p>
            </div>
          </div>
        </a>
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
}
