import { countsLike } from "./like.mjs";
import { isItLiked } from "./liked-post.mjs";
import { user } from "../logout/authorize.mjs";

/**
 * This function get the data of a post then display it on a html element.
 * @param {Array} data This is an array of data of a post.
 * @param {Element} postCont This is a html element where data from post will be display.
 */
export function displayPost(data, postCont) {
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
  let mediaUrl = "";
  if (!media) {
    mediaUrl = "";
  } else {
    mediaUrl = `<img class="post-img" src="${media}" data-bs-toggle="modal" data-bs-target="#comment" id="${id}*${id}">`;
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
    userAvatar = `<img data-bs-toggle="modal" data-bs-target="#user-image"  class="user-image btn p-0" src="${avatar}" alt="user profile image" />`;
  }
  postCont.innerHTML += `<div class="post-card">
          <div class="post-card-header">
              <div class="user-cont">
                  ${userAvatar}
                  <div class="user-header-cont flex-grow-1">
                      <a class="text-decoration-none text-reset fw-bold" href="profile.html?user=${name}"><h5>${name}</h5></a>
                  </div>
                  <button class="follow-button btn p-0 text-muted m-0 fw-bold" id="${name}" style="font-size:12px;">Follow</button>
              </div>
          </div>
          <div class="post-card-body">
              <div class="d-flex align-items-center">
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Post ID : ${id}"><h6 class="m-0">${title}</h6></div>
                <div data-bs-toggle="tooltip" data-bs-placement="top" title="Date Created : ${date} ${finalTime}"><img src="icons/calendar_month_FILL0_wght100_GRAD-25_opsz20.png" alt="calendar icon" /></div>
              </div>
              <p class="post-text">${body}</p>
              ${mediaUrl}
              <div class="post-buttons ">
                  <div class="position-relative">${likeCont}</div>
                  <div class="position-relative" data-bs-toggle="modal" data-bs-target="#comment"><img  class="position-relative comment-button" id="${id}.${id}" src="icons/comment_bank_FILL0_wght200_GRAD0_opsz24.png" alt="comment icon" /><span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" id="${id}com-counter">${comments}</span></div>
                  <div class="del-button" id="${id}">${delIcon}</div>
                  <div class="edit-button" id="${id}-${id}">${editIcon}</div>
              </div>
          </div>
      </div> `;
}
