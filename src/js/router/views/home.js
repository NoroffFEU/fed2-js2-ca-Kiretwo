import { authGuard } from "../../utilities/authGuard";
import { displayPosts } from "../../ui/post/home.js";
import { handleAuthUI } from "../../ui/post/home.js";

authGuard();
handleAuthUI();
displayPosts();
