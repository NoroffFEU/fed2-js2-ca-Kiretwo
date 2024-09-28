import "./css/style.css";
import router from "./js/router";
import { onRegister } from "./js/ui/auth/register.js";
import { onLogin } from "./js/ui/auth/login.js";
import { displayPosts } from "./js/router/views/home.js";

// Initialize the app
async function initializeApp() {
  await router(window.location.pathname);

  // Add the event listener to the registration form if it's present
  document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.forms['register'];
    if (registerForm) {
      registerForm.addEventListener('submit', onRegister);
    }

    // Add the event listener to the login form if it's present
    const loginForm = document.forms['login'];
    if (loginForm) {
      loginForm.addEventListener('submit', onLogin);
    }

    // Display posts if we are on the homepage
    if (window.location.pathname === "/") {
      displayPosts();
    }
  });
}

initializeApp();

