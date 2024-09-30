import { onLogout } from "../auth/logout.js";

export function setLogoutListener() {
  // Find the logout button in the DOM
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', onLogout);
  }
}
