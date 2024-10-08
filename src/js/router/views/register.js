import { onRegister } from "../../ui/auth/register.js";

const form = document.forms['register'];
if (form) {
  form.addEventListener("submit", onRegister);
}

