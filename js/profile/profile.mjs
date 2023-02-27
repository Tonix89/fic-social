import { logout } from "../logout/logout.mjs";
import { getBodyData } from "../post/add-post.mjs";
import { getPost } from "../post/get-post.mjs";
import { user } from "../logout/authorize.mjs";
import { gotoedit } from "../post/edit-post.mjs";
import { tagsArray } from "../post/filter-post.mjs";
import { deleteEditParam } from "../function/delete-param.mjs";
import { goDelete } from "../post/delete-post.mjs";
import { validateUrl } from "../validate/url.mjs";
import { sendPicture } from "../user-profile/update-profile.mjs";
import { hitLike } from "../post/like.mjs";
import { goSearch } from "../search/search-button/button1.mjs";
import { openComment } from "../comment/comments.mjs";
import { getFollowing } from "../follow/follow.mjs";
import { getContact } from "../contact/contact.mjs";

deleteEditParam();

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

  console.log(postId);
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

  console.log(postId);
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
let postUrl = `https://api.noroff.dev/api/v1/social/profiles/${user}/posts?_author=true&_comments=true&_reactions=true`;

function callingGetPost(postUrl, postCont) {
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

    const postImgBtn = document.querySelectorAll(".post-img");
    postImgBtn.forEach((postImgBtnId) => {
      postImgBtnId.addEventListener("click", function () {
        // console.log(commentBtnId.id);
        const postId = postImgBtnId.id.split("*")[0];
        openComment(postId);
      });
    });

    const followBtns = document.querySelectorAll(".follow-button");
    function followInfo(followBtns) {
      getFollowing().then((data) => {
        // console.log(data);
        if (data.following.length !== 0) {
          const followings = data.following;
          followings.forEach((following) => {
            const followBtns = document.querySelectorAll(`#${following.name}`);
            // console.log(followBtns);
            if (followBtns.length !== 0) {
              followBtns.forEach((followBtn) => {
                followBtn.innerHTML = "Followed";
              });
            }
          });
        } else {
          followBtns.forEach((followBtn) => {
            followBtn.innerHTML = "Follow";
          });
        }
        getContact(data.following);
      });
    }
    followInfo(followBtns);

    followBtns.forEach((followBtn) => {
      followBtn.addEventListener("click", function () {
        let follow = `${followBtn.id}/follow`;
        if (followBtn.innerHTML === "Followed") {
          follow = `${followBtn.id}/unfollow`;
          followBtn.innerHTML = "Follow";
        }
        followUser(follow).then((data) => {
          // console.log(data);
          if (data) {
            followInfo(followBtns);
          }
        });
      });
    });
  });
}
callingGetPost(postUrl, postCont);

const oldPostBtn = document.getElementById("oldest-post");
oldPostBtn.addEventListener("click", function () {
  postUrl = `https://api.noroff.dev/api/v1/social/profiles/${user}/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=asc`;
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
