import { getPostDetails } from "../post/post-details.mjs";
import { goDelete } from "../post/delete-post.mjs";
import { gotoedit } from "../post/edit-post.mjs";
import { hitLike } from "../post/like.mjs";
import { user } from "../logout/authorize.mjs";
import { countsLike } from "../post/like.mjs";
import { isItLiked } from "../post/liked-post.mjs";

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
        likeCont = `<img class="position-relative react-like" id="${id}/liked" src="icons/thumb_up_FILL1_wght600_GRAD-25_opsz24.svg"> <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" id="${id}-counter">${likes} </span>`;
      } else {
        likeCont = `<img class="position-relative react-like" id="${id}/${id}" src="icons/thumb_up_FILL0_wght200_GRAD0_opsz24.png"> <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" id="${id}-counter">${likes} </span>`;
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
      let editIcon = `<img src="icons/edit_FILL0_wght200_GRAD0_opsz24.png">`;
      let delIcon = `<img src="icons/delete_FILL0_wght200_GRAD0_opsz24.png">`;
      if (user !== name) {
        editIcon = "";
        delIcon = "";
      }
      let userAvatar = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
      </svg>`;
      if (avatar) {
        userAvatar = `<img src="${avatar}">`;
      }
      postCont.innerHTML += `<div class="post-card">
          <div class="post-card-header">
              <div class="user-cont">
                  ${userAvatar}
                  <div class="user-header-cont flex-grow-1">
                      <h5>${name}</h5>
                  </div>
                  <div data-bs-toggle="tooltip" data-bs-placement="top" title="Date Created : ${date} ${finalTime}"><img src="icons/calendar_month_FILL0_wght100_GRAD-25_opsz20.png"></div>
              </div>
          </div>
          <div class="post-card-body">
              <h6>${title}</h6>
              <p class="post-text">${body}</p>
              <img src="${mediaUrl}">
              <div class="post-buttons ">
                  <div class="position-relative">${likeCont}</div>
                  <div class="position-relative"><img  class="position-relative" src="icons/comment_bank_FILL0_wght200_GRAD0_opsz24.png"><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">${comments}</span></div>
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
    }
  });
}
