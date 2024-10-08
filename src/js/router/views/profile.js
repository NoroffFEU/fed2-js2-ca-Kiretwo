import { authGuard } from "../../utilities/authGuard";
import { initProfilePage } from "../../ui/profile/display.js";
import { onUpdateProfile } from "../../ui/profile/update.js";

authGuard();
initProfilePage();

const updateForm = document.forms.updateProfile;
if (updateForm) {
  updateForm.addEventListener("submit", onUpdateProfile);
}

