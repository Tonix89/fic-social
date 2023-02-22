import { logout } from "../logout/logout.mjs";
import { getBodyData } from "../post/add-post.mjs";
import { getPost } from "../post/get-post.mjs";
import { gotoedit } from "../post/edit-post.mjs";
import { tagsArray } from "../post/filter-post.mjs";
import { deleteEditParam } from "../function/delete-param.mjs";
import { goDelete } from "../post/delete-post.mjs";
import { hitLike } from "../post/like.mjs";
import { goSearch } from "../search/search-button/button1.mjs";
import { openComment } from "../comment/comments.mjs";

deleteEditParam();

const logOutBtn = document.querySelector(".logout");

logOutBtn.addEventListener("click", function () {
  logout();
});

const postCont = document.querySelector(".user-post-cont");

const postUrl =
  "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true";

getPost(postUrl, postCont).then((data) => {
  // console.log(data);

  const tagList = document.querySelector("#tagList");
  tagsArray(data, tagList);

  const tagList2 = document.querySelector("#tagList2");
  tagsArray(data, tagList2);

  const delBtn = document.querySelectorAll(".del-button");
  delBtn.forEach((delBtnId) => {
    goDelete(delBtnId);
  });

  const postInput = document.querySelectorAll(".post-input");
  const editBtn = document.querySelectorAll(".edit-button");
  editBtn.forEach((editBtnId) => {
    gotoedit(postInput, editBtnId);
  });

  const likeBtn = document.querySelectorAll(".react-like");
  likeBtn.forEach((likeBtnId) => {
    // console.log(likeBtnId.id);
    hitLike(likeBtnId);
  });

  const commentBtn = document.querySelectorAll(".comment-button");
  commentBtn.forEach((commentBtnId) => {
    commentBtnId.addEventListener("click", function () {
      console.log(commentBtnId.id);
      const postId = commentBtnId.id.split(".")[0];
      openComment(postId);
    });
  });
});

const postTitleError = document.querySelector("#postTitleError");
const postMediaError = document.querySelector("#postMediaError");
const postBtn = document.querySelector("#post-button");
const submitPostLoader = document.querySelector("#submit-post-loader");
const postError = document.querySelector(".postError");
const searchForm = document.querySelector(".search-form-cont");
const searchInput = document.querySelector(".search-input");
const searchForm2 = document.querySelector(".search-form-cont2");
const searchInput2 = document.querySelector(".search-input2");
const postHeader = document.querySelector(".post-header");
const searchBtn = document.querySelector(".search-button");
const searchBtn2 = document.querySelector(".search-button2");

postBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const postInput = document.querySelectorAll(".post-input");
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
    submitPostLoader,
    postId
  );
});

searchForm.addEventListener("mouseover", function () {
  document.querySelector("#tagList").style.display = "block";
  getTag(searchInput);
});

searchForm.addEventListener("mouseout", function () {
  document.querySelector("#tagList").style.display = "none";
});

searchForm2.addEventListener("mouseover", function () {
  document.querySelector("#tagList2").style.display = "block";
  getTag(searchInput2);
});

searchForm2.addEventListener("mouseout", function () {
  document.querySelector("#tagList2").style.display = "none";
});

searchBtn.addEventListener("click", function () {
  document.querySelector("#tagList").style.display = "none";
});

searchBtn2.addEventListener("click", function () {
  document.querySelector("#tagList2").style.display = "none";
});

function getTag(inputValue) {
  // console.log(inputValue);
  const postTags = Array.prototype.slice.call(
    document.querySelectorAll(".postTags")
  );
  // console.log(postTags);
  postTags.forEach((tag) => {
    // console.log(tag.innerHTML);
    tag.addEventListener("click", function (e) {
      e.preventDefault();
      // console.log(tag.innerHTML);
      inputValue.value = `#${tag.innerHTML}`;
    });
  });
}

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  goSearch(searchInput, postCont);
});

searchBtn2.addEventListener("click", function (e) {
  e.preventDefault();
  postHeader.scrollIntoView();
  goSearch(searchInput2, postCont);
});
