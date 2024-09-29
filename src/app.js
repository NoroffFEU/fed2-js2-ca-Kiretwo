import "./css/style.css";
import router from "./js/router";
import { onRegister } from "./js/ui/auth/register.js";
import { onLogin } from "./js/ui/auth/login.js";
import { initHomePage } from "./js/ui/post/home.js";

await router(window.location.pathname);

const registerForm = document.forms['register'];
if (registerForm) {
  registerForm.addEventListener('submit', onRegister);
}

const loginForm = document.forms['login'];
if (loginForm) {
  loginForm.addEventListener('submit', onLogin);
}

// Display posts if we are on the homepage
if (window.location.pathname === "/") {
  initHomePage(); // Initialize home page
}
