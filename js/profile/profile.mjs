import { logout } from "../logout/logout.mjs";
import { getBodyData } from "../post/add-post.mjs";
import { getPost } from "../post/get-post.mjs";
import { user } from "../logout/authorize.mjs";
import { deletePost } from "../post/delete-post.mjs";
import { editPost } from "../post/edit-post.mjs";

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
  const queryString = document.location.search;

  const params = new URLSearchParams(queryString);

  //console.log(params);
  let postId = "";
  const edit = params.get("edit");
  if (edit) {
    postId = edit;
    document.querySelector(".edit-post").classList.remove("text-danger");
    postInput.forEach((inputClass) => {
      inputClass.classList.remove("text-danger");
    });
  }

  console.log(postId);
  getBodyData(
    postInput,
    postTitleError,
    postMediaError,
    postError,
    postLoader,
    postId
  );
});

const postTitleErrorSm = document.querySelector("#profilepostTitleErrorsm");
const postMediaErrorSm = document.querySelector("#profile-postMediaErrorsm");
const postBtnSm = document.querySelector("#profile-post-button-sm");
const postLoaderSm = document.querySelector("#post-loader-sm");
const postInputSm = document.querySelectorAll(".post-input-sm");
const postErrorSm = document.querySelector(".postError-sm");

postBtnSm.addEventListener("click", function (e) {
  e.preventDefault();
  const queryString = document.location.search;

  const params = new URLSearchParams(queryString);

  //console.log(params);
  let postId = "";
  const edit = params.get("edit");
  if (edit) {
    postId = edit;
    document.querySelector(".edit-post-sm").classList.remove("text-danger");
    postInputSm.forEach((inputClass) => {
      inputClass.classList.remove("text-danger");
    });
  }

  console.log(postId);
  getBodyData(
    postInputSm,
    postTitleErrorSm,
    postMediaErrorSm,
    postErrorSm,
    postLoaderSm,
    postId
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

  const editBtn = document.querySelectorAll(".edit-button");

  editBtn.forEach((editBtnId) => {
    editBtnId.addEventListener("click", function () {
      const posttoEditId = editBtnId.id.split("-")[0];
      // console.log(postId);
      editPost(posttoEditId).then((data) => {
        // console.log(data);
        const { title, body, tags, media } = data;
        // console.log(title, body, tags, media);

        const inputArraySm = Array.prototype.slice.call(postInputSm);
        const [titleInputSm, bodyInputSm, tagsInputSm, mediaInputSm] =
          inputArraySm;
        titleInputSm.value = title;
        bodyInputSm.value = body;
        tagsInputSm.value = tags;
        mediaInputSm.value = media;

        document.querySelector(".edit-post-sm").innerHTML = "Edit Post";
        document.querySelector(".edit-post-sm").classList.add("text-danger");
        postInputSm.forEach((inputClass) => {
          inputClass.classList.add("text-danger");
        });

        const inputArray = Array.prototype.slice.call(postInput);
        const [titleInput, bodyInput, tagsInput, mediaInput] = inputArray;
        titleInput.value = title;
        bodyInput.value = body;
        tagsInput.value = tags;
        mediaInput.value = media;

        const queryString = document.location.search;
        const params = new URLSearchParams(queryString);
        const edits = params.get("edit");
        if (!edits) {
          const url = window.location.href;
          const newUrl = url + "?edit=" + data.id;
          window.history.pushState({ path: newUrl }, "", newUrl);
        } else {
          var url = new URL(window.location.href);
          url.searchParams.set("edit", data.id);
          window.history.replaceState(null, "", url);
        }

        document.querySelector(".edit-post").innerHTML = "Edit Post";
        document.querySelector(".edit-post").classList.add("text-danger");
        postInput.forEach((inputClass) => {
          inputClass.classList.add("text-danger");
        });

        document.querySelector(".header-nav").scrollIntoView();
      });
    });
  });
});
