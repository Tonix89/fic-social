import { userImage } from "../function/user-image.mjs";
/**
 * This function get all the details in an array to display in the html element.
 * @param {Array} data This is an array of data of the followers and following.
 * @example
 * ```js
 * const data = [{id:user1,follower:true,following:false},{id:user2,follower:true,following:true},{id:user3,follower:true,following:false}];
 * //Loop data then assign innerHtml that passes the condition.
 * data.forEach((dat)=>{
 *      if(dat.follower){
 *          // Assign what will be in the innerHTML.
 *      }else{
 *          // Assign what will be in the innerHTML.
 *      }
 * })
 * ```
 */

export function following(data) {
  // console.log(data);
  const contactCont = document.querySelector(".contacts-cont");
  const contactCont2 = document.querySelector("#contacts-cont");
  const contactSmCont = document.querySelector(".contacts-sm");
  const contactSmBtn = document.querySelector(".contacts-sm-button");
  contactCont.innerHTML = "";
  if (contactCont2) {
    contactCont2.innerHTML = "";
  }
  if (data.length === 0) {
    contactCont.innerHTML = "You have 0 following and 0 followers.";
  } else {
    data.forEach((info, i) => {
      const { name, avatar, follower, following } = info;
      let followerText = "";
      const username = `<a class="text-decoration-none text-reset fw-bold" href="profile.html?user=${name}"><h5 class="m-0">${name}</h5></a>`;
      if (follower && !following) {
        followerText = `<h6 class="text-muted">Follower</h6>`;
      } else if (follower && following) {
        followerText = `<h6 class="text-muted">Follower/Following</h6>`;
      } else {
        followerText = `<h6 class="text-muted">Following</h6>`;
      }
      let userAvatar = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>`;
      if (avatar) {
        userAvatar = `<img data-bs-toggle="modal" data-bs-target="#user-image"  class="user-image btn p-0" src="${avatar}" alt="user profile image" />`;
      }
      contactCont.innerHTML += `<div class="contact-profile-cont">
    ${userAvatar}
    <div class="contact-header-cont">
        ${username}
        ${followerText}
    </div>
</div>`;
      if (contactCont2) {
        contactCont2.innerHTML += `<div class="contact-profile-cont">
        ${userAvatar}
    <div class="contact-header-cont ms-2">
    ${username}
        ${followerText}
    </div>
</div>`;
      }
      if (contactSmBtn) {
        if (i !== 0) {
          contactSmCont.innerHTML += `<li><div class="contact-profile-cont">
          ${userAvatar}
    <div class="contact-header-cont ms-2">
    ${username}
        ${followerText}
    </div>
</div></li>`;
        } else {
          contactSmBtn.innerHTML = `<div class="profile-img-cont">
          ${userAvatar}
    <div class="profile-header-cont d-flex">
    ${username}
        ${followerText}
    </div>
</div>`;
        }
      }

      userImage();
    });
  }
}
