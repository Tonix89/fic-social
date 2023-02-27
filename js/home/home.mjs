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
import { getFollowing } from "../follow/follow.mjs";
import { followUser } from "../follow/follow-user.mjs";
import { getContact } from "../contact/contact.mjs";

deleteEditParam();

const logOutBtn = document.querySelector(".logout");

logOutBtn.addEventListener("click", function () {
  logout();
});

const postCont = document.querySelector(".user-post-cont");
const postHeader = document.querySelector(".post-header");

let postUrl =
  "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true&sort=created&sortOrder=desc";

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
        // console.log(commentBtnId.id);
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
        getContact(data);
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

    const userImage = document.querySelectorAll(".user-image");
    userImage.forEach((userImg) => {
      userImg.addEventListener("click", function () {
        const userImgModal = document.querySelector(".user-image-container");
        // console.log(userImg.src);
        userImgModal.innerHTML = `<div class="d-flex justify-content-center" style="width:100vw;height:90vh;">
        <img class="mh-100 mw-100" src="${userImg.src}" alt="user profile image" /></div>`;
      });
    });
  });
}
callingGetPost(postUrl, postCont);

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
