import { readProfile } from "../../api/profile/read.js";

// Function to initialize the profile page for the logged-in user
export async function initProfilePage() {
  try {
    const profile = await readProfile();

    // Display profile information in the DOM
    const profileContainer = document.getElementById('profile');
    if (!profileContainer) {
      console.error('Profile container not found in the DOM');
      return;
    }

    profileContainer.innerHTML = `
      <h2>${profile.name || 'Unknown User'}</h2>
      <p>Email: ${profile.email || 'Not provided'}</p>
      ${profile.bio ? `<p>Bio: ${profile.bio}</p>` : '<p>No bio available.</p>'}
      ${profile.avatar?.url ? `<img src="${profile.avatar.url}" alt="${profile.avatar.alt || 'Profile avatar'}">` : '<p>No avatar available.</p>'}
      ${profile.banner?.url ? `<img src="${profile.banner.url}" alt="${profile.banner.alt || 'Profile banner'}">` : '<p>No banner available.</p>'}
    `;

    // Display user's posts in the DOM
    const postsContainer = document.getElementById('user-posts');
    if (!postsContainer) {
      console.error('Posts container not found in the DOM');
      return;
    }

    postsContainer.innerHTML = ''; // Clear any existing content
    profile.posts.forEach(post => {
      const postElement = document.createElement('article');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h3><a href="/post/?id=${post.id}">${post.title}</a></h3>
        <p>${post.body}</p>
        ${post.media?.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}">` : ''}
        <p>Created at: ${new Date(post.created).toLocaleString()}</p>
      `;
      postsContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error('Error displaying profile:', error);
    alert('Failed to load profile. Please try again later.');
  }
}
