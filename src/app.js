import "./css/style.css";
import router from "./js/router";
import { onRegister } from "./js/ui/auth/register.js";

// Wrap the router logic in an async function
async function initializeApp() {
  await router(window.location.pathname);

  // Add the event listener to the registration form
  document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.forms['register'];
    if (registerForm) {
      registerForm.addEventListener('submit', onRegister);
    }
  });
}

// Call the initialize function
initializeApp();
