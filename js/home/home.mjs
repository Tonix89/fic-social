import { logout } from "../logout/logout.mjs";
import { getBodyData } from "../post/add-post.mjs";
import { getPost } from "../post/get-post.mjs";
import { deleteEditParam } from "../function/delete-param.mjs";
import { goSearch } from "../search/search-button/button1.mjs";
import { userImage } from "../function/user-image.mjs";
import { followButtons } from "../follow/follow-buttons.mjs";
import { commentModal } from "../function/comment-modal.mjs";
import { clickButton } from "../function/post-buttons.mjs";
import { createTagArray } from "../function/create-tagArray.mjs";

// This function delete the page parameter everytime the page reloaded.
deleteEditParam();

// This function calls a function that logout the current user.
const logOutBtn = document.querySelector(".logout");
logOutBtn.addEventListener("click", function () {
  logout();
});

const postCont = document.querySelector(".user-post-cont");
const postHeader = document.querySelector(".post-header");

let postUrl =
  "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc";

/**
 * This function calls a fucntion that send an API request and need the data to return.
 * @param {URL} postUrl This is the API request url endpoint.
 * @param {Element} postCont This is a html element where the API request result to be displayed.
 */

export function callingGetPost(postUrl, postCont) {
  getPost(postUrl, postCont).then((data) => {
    // console.log(data);

    createTagArray(data);

    clickButton();

    commentModal();

    followButtons();

    userImage();
  });
}
callingGetPost(postUrl, postCont);

// This functions changes the API request url endpoint then call the API request function.

const oldPostBtn = document.getElementById("oldest-post");
oldPostBtn.addEventListener("click", function () {
  postUrl =
    "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=asc";
  postCont.innerHTML = `<div class
    ="post-loader d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
    </div>`;
  postHeader.innerHTML = "Oldest Posts";
  callingGetPost(postUrl, postCont);
});

// This function changes the API request url endpoint then call the API request function.

const followPostBtn = document.getElementById("followed-post");
followPostBtn.addEventListener("click", function () {
  postUrl =
    "https://api.noroff.dev/api/v1/social/posts/following?_author=true&_comments=true&_reactions=true";
  postCont.innerHTML = `<div class
    ="post-loader d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
    </div>`;
  postHeader.innerHTML = "Following Posts";
  callingGetPost(postUrl, postCont);
});

// This function refresh the page to run the API Request again with its original url endpoint.
const latestPostBtn = document.getElementById("latest-post");
latestPostBtn.addEventListener("click", function () {
  location.reload();
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
const searchBtn = document.querySelector(".search-button");
const searchBtn2 = document.querySelector(".search-button2");

/**
 *  This function send the input of post form and changes the value of the postId if it is edited or new post.
 * @param {Element} postBtn This is a button a html that trigger the form to submit.
 * @param {string | number} postId This  is the id of the post if edited and it is null if a new post.
 * @example
 * ```js
 * const postBtn = document.querySelector(".post-button"),
 * const postId = "";
 * // Get the current url parameter if "edit" key is true.
 * if(edit){
 * // Change postId value to "edit" value.
 * }
 * ```
 */
postBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const postInput = document.querySelectorAll(".post-input");

  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const edit = params.get("edit");

  let postId = "";
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

/**
 * This function get tag value to be search.
 * @param {Element} inputValue This is a html element that holds the value to be search.
 * @param {Array} postTags This is an array of post tags.
 * @example
 * ```js
 * const postTags = [ tag1, tag2, tag3];
 * const inputValue = document.querySelector(".search-form");
 * postTags.forEach((tag)=>{
 *    tag.addEventListener("click", function(){
 *      inputValue.value = tag;
 *  })
 * })
 * ```
 */
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
  if (searchInput.value) {
    goSearch(searchInput, postCont);
  }
});

searchBtn2.addEventListener("click", function (e) {
  e.preventDefault();
  if (searchInput2.value) {
    postHeader.scrollIntoView();
    goSearch(searchInput2, postCont);
  }
});
