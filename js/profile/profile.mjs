import { logout } from "../logout/logout.mjs";
import { getBodyData } from "../post/add-post.mjs";
import { getPost } from "../post/get-post.mjs";
import { deleteEditParam } from "../function/delete-param.mjs";
import { validateUrl } from "../validate/url.mjs";
import { sendPicture } from "../user-profile/update-profile.mjs";
import { goSearch } from "../search/search-button/button1.mjs";
import { createTagArray } from "../function/create-tagArray.mjs";
import { clickButton } from "../function/post-buttons.mjs";
import { commentModal } from "../function/comment-modal.mjs";
import { followButtons } from "../follow/follow-buttons.mjs";
import { userImage } from "../function/user-image.mjs";
import { postMedia } from "../function/post-media.mjs";
import { searchUser } from "../function/search-user.mjs";
import { getRequest } from "../user-profile/get-user.mjs";
import { auth } from "../logout/authorize.mjs";
import { profileCard } from "./profile-cont.mjs";

let username = searchUser();

getRequest(auth, username).then((res) => {
  profileCard(res);
});

// This function delete the page edit parameter everytime the page reloaded.
deleteEditParam();

// This function calls a function that logout the current user.
const logOutBtn = document.querySelector(".logout");
logOutBtn.addEventListener("click", function () {
  logout();
});

const profileBtn = document.querySelector("#profile-btn");
const contactBtn = document.querySelector("#contact-btn");
const profileCont = document.querySelector("#profile-cont");
const contactCont = document.querySelector("#contacts-cont");

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

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    profileCont.classList.replace("d-none", "d-flex");
    profileBtn.classList.add("active");
    contactBtn.classList.remove("active");
    contactCont.classList.replace("d-block", "d-none");
  }
});

const postTitleError = document.querySelector("#profilepostTitleError");
const postMediaError = document.querySelector("#profile-postMediaError");
const postBtn = document.querySelector("#profile-post-button");
const submitPostLoader = document.querySelector("#submit-post-loader");
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

  // console.log(postId);
  getBodyData(
    postInput,
    postTitleError,
    postMediaError,
    postError,
    submitPostLoader,
    postId
  );
});

const postTitleErrorSm = document.querySelector("#profilepostTitleErrorsm");
const postMediaErrorSm = document.querySelector("#profile-postMediaErrorsm");
const postBtnSm = document.querySelector("#profile-post-button-sm");
const submitPostLoaderSm = document.querySelector("#submit-post-loader-sm");
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

  // console.log(postId);
  getBodyData(
    postInputSm,
    postTitleErrorSm,
    postMediaErrorSm,
    postErrorSm,
    submitPostLoaderSm,
    postId
  );
});

const searchForm = document.querySelector(".search-form-cont");
const searchInput = document.querySelector(".search-input");
const searchForm2 = document.querySelector(".search-form-cont2");
const searchInput2 = document.querySelector(".search-input2");
const postHeader = document.querySelector(".post-header");
const searchBtn = document.querySelector(".search-button");
const searchBtn2 = document.querySelector(".search-button2");

const postCont = document.querySelector(".user-post-cont");
let postUrl = `https://api.noroff.dev/api/v1/social/profiles/${username}/posts?_author=true&_comments=true&_reactions=true`;

/**
 * This function calls a fucntion that send an API request and need the data to return.
 * @param {URL} postUrl This is the API request url endpoint.
 * @param {Element} postCont This is a html element where the API request result to be displayed.
 */

function callingGetPost(postUrl, postCont) {
  getPost(postUrl, postCont).then((data) => {
    // console.log(data);

    createTagArray(data);

    clickButton();

    commentModal();

    followButtons();

    userImage();

    postMedia();
  });
}
callingGetPost(postUrl, postCont);

// This function changes the API request url endpoint then call the API request function.

const oldPostBtn = document.getElementById("oldest-post");
oldPostBtn.addEventListener("click", function () {
  postUrl = `https://api.noroff.dev/api/v1/social/profiles/${username}/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=asc`;
  postCont.innerHTML = `<div class
    ="post-loader d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
    </div>`;
  postHeader.innerHTML = "Oldest Posts";
  callingGetPost(postUrl, postCont);
});

const followPostBtn = document.getElementById("followed-post");
followPostBtn.addEventListener("click", function () {
  postUrl = `https://api.noroff.dev/api/v1/social/posts/following?_author=true&_comments=true&_reactions=true`;
  postCont.innerHTML = `<div class
    ="post-loader d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
    </div>`;
  postHeader.innerHTML = "Following Posts";
  callingGetPost(postUrl, postCont);
});

const latestPostBtn = document.getElementById("latest-post");
latestPostBtn.addEventListener("click", function () {
  location.reload();
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
  postHeader.scrollIntoView();
  goSearch(searchInput, postCont);
});

searchBtn2.addEventListener("click", function (e) {
  e.preventDefault();
  postHeader.scrollIntoView();
  goSearch(searchInput2, postCont);
});

/**
 * This function updated the user profile media url.
 */
const updateProfile = document.querySelector(".update-profile-button");
updateProfile.addEventListener("click", function () {
  const updateBtns = document.querySelector(".update-buttons");
  const updateLdr = document.querySelector(".update-loader");
  const mediaInput = document.querySelector(".media-input");
  const editProfileCont = document.querySelector(".edit-profile-cont");
  const profilePictureError = document.querySelector("#profile-pictureError");
  if (mediaInput.value) {
    if (validateUrl(mediaInput.value) === true) {
      updateBtns.classList.replace("d-block", "d-none");
      updateLdr.classList.replace("d-none", "d-inline-block");
      profilePictureError.classList.replace("d-flex", "d-none");
      sendPicture(mediaInput.value, profilePictureError).then((data) => {
        if (data.name) {
          updateLdr.classList.replace("d-inline-block", "d-none");
          editProfileCont.innerHTML = `<h3 class="text-center">Profile Picture is Successfully Updated!</h3>`;
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          editProfileCont.innerHTML = `<h3>Sorry we have an error : ${data}`;
        }
      });
    } else {
      profilePictureError.classList.replace("d-none", "d-flex");
    }
  }
});
