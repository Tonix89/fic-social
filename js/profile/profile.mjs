import { logout } from "../logout/logout.mjs";
import { getBodyData } from "../post/add-post.mjs";
import { getPost } from "../post/get-post.mjs";
import { user } from "../logout/authorize.mjs";
import { deletePost } from "../post/delete-post.mjs";

const profileBtn = document.querySelector("#profile-btn");
const contactBtn = document.querySelector("#contact-btn");
const profileCont = document.querySelector("#profile-cont");
const contactCont = document.querySelector("#contact-cont");

const logOutBtn = document.querySelector(".logout");

logOutBtn.addEventListener("click", function () {
  logout();
});

profileBtn.addEventListener("click", function () {
  profileCont.classList.replace("d-none", "d-flex");
  profileBtn.classList.add("active");
  contactBtn.classList.remove("active");
  contactCont.classList.replace("d-block", "d-none");
});

contactBtn.addEventListener("click", function () {
  contactCont.classList.replace("d-none", "d-block");
  contactBtn.classList.add("active");
  profileBtn.classList.remove("active");
  profileCont.classList.replace("d-flex", "d-none");
});

const postTitleError = document.querySelector("#profilepostTitleError");
const postMediaError = document.querySelector("#profile-postMediaError");
const postBtn = document.querySelector("#profile-post-button");
const postLoader = document.querySelector("#post-loader");
const postInput = document.querySelectorAll(".post-input");
const postError = document.querySelector(".postError");

postBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getBodyData(postInput, postTitleError, postMediaError, postError, postLoader);
});

const postTitleErrorSm = document.querySelector("#profilepostTitleErrorsm");
const postMediaErrorSm = document.querySelector("#profile-postMediaErrorsm");
const postBtnSm = document.querySelector("#profile-post-button-sm");
const postLoaderSm = document.querySelector("#post-loader-sm");
const postInputSm = document.querySelectorAll(".post-input-sm");
const postErrorSm = document.querySelector(".postError-sm");

postBtnSm.addEventListener("click", function (e) {
  e.preventDefault();
  getBodyData(
    postInputSm,
    postTitleErrorSm,
    postMediaErrorSm,
    postErrorSm,
    postLoaderSm
  );
});

const postCont = document.querySelector(".user-post-cont");
const postUrl = `https://api.noroff.dev/api/v1/social/profiles/${user}/posts?_author=true`;

getPost(postCont, postUrl).then(function () {
  const delBtn = document.querySelectorAll(".del-button");

  delBtn.forEach((delBtnId) => {
    delBtnId.addEventListener("click", function () {
      console.log(delBtnId.id);
      const confirmDelete = "Are you sure you want to delete this post?";
      if (confirm(confirmDelete)) {
        deletePost(delBtnId.id);
      }
    });
  });
});
