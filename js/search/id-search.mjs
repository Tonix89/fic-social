import { getPostDetails } from "../post/post-details.mjs";
import { goDelete } from "../post/delete-post.mjs";
import { gotoedit } from "../post/edit-post.mjs";
import { hitLike } from "../post/like.mjs";
import { user } from "../logout/authorize.mjs";
import { countsLike } from "../post/like.mjs";
import { isItLiked } from "../post/liked-post.mjs";
import { openComment } from "../comment/comments.mjs";
import { getFollowing } from "../follow/follow.mjs";
import { followUser } from "../follow/follow-user.mjs";
import { getContact } from "../contact/contact.mjs";

export function idSearch(numToString, postCont) {
  postCont.innerHTML = `<div class
    ="post-loader d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
    </div>`;
  const postHeader = document.querySelector(".post-header");
  postHeader.innerHTML = `Searching for Post Id :"${numToString}"`;

  getPostDetails(numToString).then((data) => {
    // console.log(data);
    if (data.errors) {
      postCont.innerHTML = `
      <div class="post-card text-center">
          <div class="post-card-header">
              
          </div>
          <div class="post-card-body">
          <h3>${data.errors[0].message}</h3>
          </div>
      </div>`;
    } else {
      const {
        id,
        title,
        body,
        tags,
        media,
        created,
        updated,
        author,
        reactions,
        _count,
      } = data;
      const likes = countsLike(reactions);
      const liked = isItLiked(id);
      // console.log(liked);
      let likeCont = "";
      if (liked && liked[0] == id) {
        likeCont = `<img class="position-relative react-like" id="${id}/liked" src="icons/thumb_up_FILL1_wght600_GRAD-25_opsz24.svg" alt="liked icon" /> <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" id="${id}-counter">${likes} </span>`;
      } else {
        likeCont = `<img class="position-relative react-like" id="${id}/${id}" src="icons/thumb_up_FILL0_wght200_GRAD0_opsz24.png" alt="like icon" /> <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" id="${id}-counter">${likes} </span>`;
      }
      const { comments } = _count;
      const { name, avatar } = author;
      const date = updated.split("T")[0];
      const time = updated.split("T")[1];
      const finalTime = time.split(".")[0];
      // console.log(media);
      let mediaUrl = media;
      if (!media) {
        mediaUrl = "";
      }
      let editIcon = `<img src="icons/edit_FILL0_wght200_GRAD0_opsz24.png" alt="edit icon" />`;
      let delIcon = `<img src="icons/delete_FILL0_wght200_GRAD0_opsz24.png" alt="delete icon" />`;
      if (user !== name) {
        editIcon = "";
        delIcon = "";
      }
      let userAvatar = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
      </svg>`;
      if (avatar) {
        userAvatar = `<img src="${avatar}" alt="user profile image" />`;
      }
      postCont.innerHTML += `<div class="post-card">
          <div class="post-card-header">
              <div class="user-cont">
                  ${userAvatar}
                  <div class="user-header-cont flex-grow-1">
                      <h5>${name}</h5>
                  </div>
                  <button class="follow-button btn p-0 text-muted m-0 fw-bold" id="${name}" style="font-size:12px;">Follow</button>
              </div>
          </div>
          <div class="post-card-body">
              <div class="d-flex align-items-center">
                <h6 class="m-0">${title}</h6>
                <div data-bs-toggle="tooltip" data-bs-placement="top" title="Date Created : ${date} ${finalTime}"><img src="icons/calendar_month_FILL0_wght100_GRAD-25_opsz20.png" alt="calendar icon" /></div>
              </div>
              <p class="post-text">${body}</p>
              <img src="${mediaUrl}">
              <div class="post-buttons ">
                  <div class="position-relative">${likeCont}</div>
                  <div class="position-relative"><img  class="position-relative comment-button" id="${id}.${id}" src="icons/comment_bank_FILL0_wght200_GRAD0_opsz24.png" alt="comment icon" /><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">${comments}</span></div>
                  <div class="del-button" id="${id}">${delIcon}</div>
                  <div class="edit-button" id="${id}-${id}">${editIcon}</div>
              </div>
          </div>
      </div> `;

      const postInput = document.querySelectorAll(".post-input");
      const postLoader = document.querySelector(".post-loader");
      postLoader.classList.replace("d-flex", "d-none");
      postHeader.innerHTML = `Search Results for Post Id :"${numToString}"`;
      if (data) {
        if (data.length === 0) {
          postCont.innerHTML = `<h3>"0" Search Result</h3>`;
        }
        if (data.errors) {
          postCont.innerHTML = `<h3>${data.errors[0].message}</h3>`;
        }
      }

      const editBtn = document.querySelectorAll(".edit-button");
      editBtn.forEach((editBtnId) => {
        // console.log(postInput, editBtnId);
        gotoedit(postInput, editBtnId);
      });

      const delBtn = document.querySelectorAll(".del-button");
      delBtn.forEach((delBtnId) => {
        goDelete(delBtnId);
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

      const followBtns = document.querySelectorAll(".follow-button");
      function followInfo(followBtns) {
        getFollowing().then((data) => {
          // console.log(data);
          getContact(data);
          if (data.following.length !== 0) {
            const followings = data.following;
            followings.forEach((following) => {
              const followBtns = document.querySelectorAll(
                `#${following.name}`
              );
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
    }
  });
}
