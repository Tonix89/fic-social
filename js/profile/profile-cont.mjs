import { userImage } from "../function/user-image.mjs";

const userPic = document.querySelector(".user-pic");
const profileInfo = document.querySelector(".profile-text");

/**
 * This function destructured the data about the login user then display to the html profile container.
 * @param {Array} userData This is an array of data baout the user.
 */
export function profileCard(userData) {
  // console.log(userData);
  const { name, email, banner, avatar } = userData;
  // console.log(name, email, banner, avatar);
  const { followers, following, posts } = userData._count;
  // console.log(followers, following, posts);
  if (avatar) {
    userPic.innerHTML = `<img data-bs-toggle="modal" data-bs-target="#user-image" class="avatar position-relative user-image btn p-0" src="${avatar}" alt="user profile image" /><span class="position-absolute top-100 update-icon translate-middle btn" ><img class="edit-profile-button d-flex" src="icons/edit_square_FILL0_wght600_GRAD-25_opsz20.png" data-bs-toggle="modal" data-bs-target="#changePicture"/></span>`;
  } else {
    userPic.innerHTML = `<svg class="position-relative" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
      </svg><span class="position-absolute top-100 start-100 translate-middle btn" ><img class="edit-profile-button d-flex" src="icons/edit_square_FILL0_wght600_GRAD-25_opsz20.png" data-bs-toggle="modal" data-bs-target="#changePicture"/></span>`;
  }
  profileInfo.innerHTML = `
  <h6>Name : ${name}</h6>
                        <h6>Email : ${email}</h6>
                        <h6>Post : ${posts}</h6>
                        <div class="follow">
                            <h6>Followers : ${followers}</h6>
                            <h6>Following : ${following}</h6>
                        </div>`;

  userImage();
}
