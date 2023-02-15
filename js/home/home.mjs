import { logout } from "../logout/logout.mjs";
import { getBodyData } from "../post/add-post.mjs";
// import { auth } from "../logout/authorize.mjs";
import { getPost } from "../post/get-post.mjs";

const logOutBtn = document.querySelector(".logout");

logOutBtn.addEventListener("click", function () {
  logout();
});

const postTitleError = document.querySelector("#postTitleError");
const postMediaError = document.querySelector("#postMediaError");
const postBtn = document.querySelector("#post-button");
const postLoader = document.querySelector("#post-loader");
const postInput = document.querySelectorAll(".post-input");
const postError = document.querySelector(".postError");

postBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getBodyData(postInput, postTitleError, postMediaError, postError, postLoader);
});

const postCont = document.querySelector(".user-post-cont");

const postUrl = "https://api.noroff.dev/api/v1/social/posts?_author=true";

getPost(postCont, postUrl);
