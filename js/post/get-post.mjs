import { auth } from "../logout/authorize.mjs";
import { user } from "../logout/authorize.mjs";
const postLoader = document.querySelector(".post-loader");
export function getPost(postCont, postUrl) {
  return fetch(postUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      postLoader.classList.replace("d-flex", "d-none");
      data.forEach((post) => {
        // console.log(post);
        const {
          id,
          title,
          body,
          tags,
          media,
          created,
          updated,
          author,
          _count,
        } = post;
        const { comments, reactions } = _count;
        const { name, avatar } = author;
        const date = updated.split("T")[0];
        // console.log(date);
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
                    <div class="user-header-cont">
                        <h5>${name}</h5>
                    </div>
                </div>
                <div><p class="card-text"><small class="text-muted">Date : ${date}</small></p></div>
            </div>
            <div class="post-card-body">
                <h6>${title}</h6>
                <p class="post-text">${body}</p>
                <img src="${media}">
                <div class="post-buttons">
                    <div><img src="icons/thumb_up_FILL0_wght200_GRAD0_opsz24.png"> ${reactions}</div>
                    <div><img src="icons/comment_bank_FILL0_wght200_GRAD0_opsz24.png">${comments}</div>
                    <div class="del-button" id="${id}">${delIcon}</div>
                    <div class="edit-button" id="${id}-${id}">${editIcon}</div>
                </div>
            </div>
        </div> `;
      });
    })
    .catch((error) => {
      console.log(error);
      postCont.innerHTML = `<div class="post-card">
      <div class="post-card-header">
      </div>
      <div class="post-card-body">
          Sorry we have error fetching post data. ${error}.
      </div>
  </div>`;
    });
}
