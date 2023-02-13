import { logout } from "../logout/logout.mjs";

const logOutBtn = document.querySelector(".logout");

logOutBtn.addEventListener("click", function () {
  logout();
});
