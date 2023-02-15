import { logout } from "../logout/logout.mjs";
import { getBodyData } from "../post/add-post.mjs";
import { getPost } from "../post/get-post.mjs";
import { deletePost } from "../post/delete-post.mjs";
import { editPost } from "../post/edit-post.mjs";

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
  getBodyData(
    postInput,
    postTitleError,
    postMediaError,
    postError,
    postLoader,
    postId
  );
});

const postCont = document.querySelector(".user-post-cont");

const postUrl = "https://api.noroff.dev/api/v1/social/posts?_author=true";

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

        const inputArray = Array.prototype.slice.call(postInput);
        const [titleInput, bodyInput, tagsInput, mediaInput] = inputArray;
        titleInput.value = title;
        bodyInput.value = body;
        tagsInput.value = tags;
        mediaInput.value = media;

        postInput.forEach((inputClass) => {
          inputClass.classList.add("text-danger");
        });

        const queryString = document.location.search;
        const params = new URLSearchParams(queryString);
        const edit = params.get("edit");
        if (!edit) {
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

        document.querySelector(".header-nav").scrollIntoView();
      });
    });
  });
});
