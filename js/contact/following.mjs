export function following(data) {
  //   console.log(data);
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
        userAvatar = `<img data-bs-toggle="modal" data-bs-target="#user-image"  class="user-image btn p-0" src="${avatar}">`;
      }
      contactCont.innerHTML += `<div class="contact-profile-cont">
    ${userAvatar}
    <div class="contact-header-cont">
        <h5 class="m-0">${name}</h5>
        ${followerText}
    </div>
</div>`;
      if (contactCont2) {
        contactCont2.innerHTML += `<div class="contact-profile-cont">
        ${userAvatar}
    <div class="contact-header-cont ms-2">
        <h5 class="m-0">${name}</h5>
        ${followerText}
    </div>
</div>`;
      }
      if (contactSmBtn) {
        if (i !== 0) {
          contactSmCont.innerHTML += `<li><div class="contact-profile-cont">
          ${userAvatar}
    <div class="contact-header-cont ms-2">
        <h5 class="m-0">${name}</h5>
        ${followerText}
    </div>
</div></li>`;
        } else {
          contactSmBtn.innerHTML = `<div class="profile-img-cont">
          ${userAvatar}
    <div class="profile-header-cont d-flex">
        <h5>${name}</h5>
        ${followerText}
    </div>
</div>`;
        }
      }

      const userImage = document.querySelectorAll(".user-image");
      userImage.forEach((userImg) => {
        userImg.addEventListener("click", function () {
          const userImgModal = document.querySelector(".user-image-container");
          //   console.log(userImg.src);
          if (window.innerWidth > 768) {
            userImgModal.innerHTML = `<div class="d-flex justify-content-center" style="width:100vw;height:90vh;">
        <img class="mh-100 mw-100" src="${userImg.src}"/></div>`;
          } else {
            userImgModal.innerHTML = `<div class="d-flex justify-content-center">
        <img class="mh-100 mw-100" src="${userImg.src}"/></div>`;
          }
        });
      });
    });
  }
}
