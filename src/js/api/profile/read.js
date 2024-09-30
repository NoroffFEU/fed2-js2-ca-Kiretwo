import { API_SOCIAL_PROFILES } from '../constants';
import { headers } from '../headers';

// Function to read the profile of the logged-in user
export async function readProfile() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');

    if (!accessToken || !username) {
      throw new Error("No access token or username found. Please log in first.");
    }

    // Fetch logged-in user's profile
    const url = `${API_SOCIAL_PROFILES}/${username}?_followers=false&_following=false&_posts=true`;

    const response = await fetch(url, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const profile = await response.json();
    return profile.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
