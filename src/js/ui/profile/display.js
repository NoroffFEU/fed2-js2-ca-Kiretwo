import { readProfile } from "../../api/profile/read.js";

export async function initProfilePage() {
  try {
    const profile = await readProfile();

    // Display profile information in the DOM
    const profileContainer = document.getElementById("profile");
    if (!profileContainer) {
      console.error("Profile container not found in the DOM");
      return;
    }

    profileContainer.innerHTML = `
      <div class="profile-header position-relative mb-5">
        ${
          profile.banner?.url
            ? `
        <img src="${profile.banner.url}" alt="${profile.banner.alt || "Profile banner"}" class="img-fluid w-100">
        `
            : `
        <!-- Default banner if no banner URL -->
        <div class="default-banner bg-secondary w-100" style="height: 200px;"></div>
        `
        }
        ${
          profile.avatar?.url
            ? `
        <img src="${profile.avatar.url}" alt="${profile.avatar.alt || "Profile avatar"}" class="avatar-img rounded-circle">
        `
            : `
        <!-- Default avatar if no avatar URL -->
        <div class="avatar-img rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center">
          <span style="font-size: 2rem;">${profile.name ? profile.name.charAt(0).toUpperCase() : "U"}</span>
        </div>
        `
        }
      </div>
      <div class="profile-info text-center">
        <h2>${profile.name || "Unknown User"}</h2>
        ${profile.bio ? `<p class="lead">${profile.bio}</p>` : "<p>No bio available.</p>"}
        <p>Email: ${profile.email || "Not provided"}</p>
      </div>
    `;

    // Display user's posts in the DOM
    const postsContainer = document.getElementById("user-posts");
    if (!postsContainer) {
      console.error("Posts container not found in the DOM");
      return;
    }

    postsContainer.innerHTML = ""; // Clear any existing content

    if (profile.posts && profile.posts.length > 0) {
      // Create a row for the posts grid
      const row = document.createElement("div");
      row.classList.add("row", "gy-4");

      profile.posts.forEach((post) => {
        const col = document.createElement("div");
        col.classList.add("col-12", "col-md-6", "col-lg-4");

        const postElement = document.createElement("div");
        postElement.classList.add("card", "h-100");

        postElement.innerHTML = `
          <a href="/post/?id=${post.id}" class="text-decoration-none h-100 d-flex flex-column">
            ${
              post.media?.url
                ? `
            <img src="${post.media.url}" alt="${post.media.alt || "Post image"}" class="card-img-top">
            `
                : ""
            }
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body.substring(0, 100)}${post.body.length > 100 ? "..." : ""}</p>
              <p class="card-text mt-auto">
                <small class="text-muted">Created at: ${new Date(post.created).toLocaleString()}</small>
              </p>
            </div>
          </a>
        `;

        col.appendChild(postElement);
        row.appendChild(col);
      });

      postsContainer.appendChild(row);
    } else {
      postsContainer.innerHTML = "<p>No posts available.</p>";
    }
  } catch (error) {
    console.error("Error displaying profile:", error);
    alert("Failed to load profile. Please try again later.");
  }
}
