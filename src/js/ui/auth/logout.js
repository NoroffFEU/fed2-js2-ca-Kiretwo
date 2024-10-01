export function onLogout() {
  // Remove authentication details from localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('username');

  // Redirect to login page after logging out
  window.location.href = "/auth/login/";
}
