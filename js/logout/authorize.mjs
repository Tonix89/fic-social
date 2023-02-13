import { getUserInfo } from "../user-profile/user-info.mjs";
const auth = localStorage.getItem("nat");
const user = localStorage.getItem("user");

if (!auth) {
  window.location.href = "index.html";
} else {
  getUserInfo(auth, user);
}
