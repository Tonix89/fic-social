// import { getPost } from "../post/get-post.mjs";
import { getUserInfo } from "../user-profile/user-info.mjs";
export const auth = localStorage.getItem("nat");
export const user = localStorage.getItem("user");

if (!auth) {
  window.location.href = "index.html";
} else {
  getUserInfo(auth, user);
}
