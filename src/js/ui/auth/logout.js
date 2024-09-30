export function onLogout() {
  // Remove authentication details from localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('username');

  // Optionally, redirect to the login page or home page
  window.location.href = "/auth/login/";
}
