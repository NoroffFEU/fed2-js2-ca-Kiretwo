import { onLogin } from "../../ui/auth/login";

const form = document.forms['login'];
if (form) {
  form.addEventListener("submit", onLogin);
}
