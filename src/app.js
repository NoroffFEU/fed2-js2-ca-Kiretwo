import "./css/style.css";
import router from "./js/router";
import { onRegister } from "./js/ui/auth/register.js";
import { onLogin } from "./js/ui/auth/login.js";
import { displayPosts } from "./js/ui/post/home.js";
import { initProfilePage } from "./js/ui/profile/display.js";
import { onUpdateProfile } from "./js/ui/profile/update.js";
import { handleAuthUI } from "./js/ui/post/home.js";
import { setLogoutListener } from "./js/ui/global/logout.js";

await router(window.location.pathname);

handleAuthUI();
setLogoutListener();

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
  displayPosts();
}

if (window.location.pathname === "/profile/") {
  initProfilePage();
}

// Add event listener for profile update form
const updateForm = document.forms.updateProfile;
if (updateForm) {
  updateForm.addEventListener('submit', onUpdateProfile);
}

