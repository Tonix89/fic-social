import { getPostDetails } from "../post/post-details.mjs";
import { countsLike } from "../post/like.mjs";
import { isItLiked } from "../post/liked-post.mjs";
import { hitLike } from "../post/like.mjs";
import { user } from "../logout/authorize.mjs";
import { getComments } from "./get-comments.mjs";
import { userImage } from "../function/user-image.mjs";

/**
 * This function is only used to call another function that expect return from another module.
 * @param {number} id This is the id of the Post.
 * @example
 * ```js
 * // Call a function and expect a return of data like arrays.
 * const id = 12;
 * myFunction(id).then((data)=>{
 * // The data is the data of the post with an id of 12 return from function myFunction.
 * })
 * ```
 */

export function openComment(id) {
  getPostDetails(id).then((data) => {
    const commentCont = document.querySelector(".comment-container");
    commentCont.innerHTML = `<div class
    ="post-loader d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
    </div>`;
    // console.log(data);
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
    if (liked && liked[0] == id && likes !== 0) {
      likeCont = `<img class="position-relative react-like" id="${id}/liked/modal" src="icons/thumb_up_FILL1_wght600_GRAD-25_opsz24.svg" alt="Liked icon" /> <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" id="${id}-counter-modal">${likes} </span>`;
    } else {
      likeCont = `<img class="position-relative react-like" id="${id}/${id}/modal" src="icons/thumb_up_FILL0_wght200_GRAD0_opsz24.png" alt="Like icon" /> <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" id="${id}-counter-modal">${likes} </span>`;
    }
    const { comments } = _count;
    const { name, avatar } = author;
    const date = updated.split("T")[0];
    const time = updated.split("T")[1];
    const finalTime = time.split(".")[0];
    const commentCounter = document.getElementById(`${id}com-counter`);
    commentCounter.innerHTML = comments;
    // console.log(commentCounter, comments);
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
      userAvatar = `<img data-bs-toggle="modal" data-bs-target="#user-image"  class="user-image rounded-circle btn p-0" style="width:25px;height:25px" src="${avatar}" alt="user profile image">`;
    }

    commentCont.innerHTML = `<div class="comment-cont-div">
                            <div class=" d-flex justify-content-center border-end" id="comment-img-cont"><img class="w-auto mw-100 h-auto" src="${mediaUrl}" alt="${title}" /></div>
                            <div class="col-md-4 comment-card border-start" >
                                    <div class="card-header">
                                        <div class="d-flex align-items-center">
                                            ${userAvatar}
                                            <div class="user-header-cont ps-3 flex-grow-1">
                                                <h5 class="m-0">${name}</h5>
                                            </div>
                                            <div data-bs-toggle="tooltip" data-bs-placement="top" title="Date Created : ${date} ${finalTime}"><img src="icons/calendar_month_FILL0_wght100_GRAD-25_opsz20.png" alt="calendar icon" /></div>
                                        </div>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex flex-column flex-grow-1">
                                            <h6>${title}</h6>
                                            <p class="card-text">${body}</p>
                                            <div class="post-buttons d-flex align-self-end mt-3 ">
                                                <div class="position-relative btn p-0 m-2">${likeCont}</div>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex flex-column" style="height:60vh;">
                                            <h6>Comments</h6>
                                            <div class="comments-card  p-1 overflow-auto flex-grow-1"  id="${id}-post" >
                                            </div>
                                            <div class="row text-center m-1">
                                            <input class="comment-input col-10 border border-1 border-light rounded-pill pe-1" id="${id}-input"  type="text" placeholder="add comment"><div class="btn col-2 p-0" id="comment-button" ><img src="icons/send_FILL1_wght600_GRAD200_opsz24.svg" alt="send icon" /><span id="comment-button-loader" class="d-none" role="status" aria-hidden="true"></span></div>
                                            </div>
                                        </li>
                                    </ul>
                            </div>
    </div>`;

    const likeBtn = document.querySelectorAll(".react-like");
    likeBtn.forEach((likeBtnId) => {
      // console.log(likeBtnId.id);
      hitLike(likeBtnId);
    });

    const comCard = document.querySelector(".comment-card");
    const imgCont = document.querySelector("#comment-img-cont");
    const comModDial = document.querySelector("#comment-modal-dialog");
    if (!mediaUrl) {
      imgCont.classList.replace("d-flex", "d-none");
      comCard.classList.remove("col-md-4");
      comModDial.classList.replace("modal-fullscreen", "modal-md");
    } else {
      imgCont.classList.replace("d-none", "d-flex");
      comCard.classList.add("col-md-4");
      comModDial.classList.replace("modal-md", "modal-fullscreen");
    }
    const commentCard = document.querySelector(".comments-card");
    getComments(data, commentCard);

    userImage();
  });
}
