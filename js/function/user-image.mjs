/**
 * This function opens the user image or avatar in a modal.
 * @param {Element} userImage This is a html element where the user image is.
 * @param {Element} userImgModal This is a html element where the user image to be displayed.
 * @example
 * ```js
 * const userImage = document.querySelector(".user-image");
 * const userImgModal = document.querySelector (".image-modal");
 * userImage.addEventListener("click", function(){
 *      userImgModal.innerHTML = userImage;
 * })
 * ```
 */

export function userImage() {
  const userImage = document.querySelectorAll(".user-image");

  userImage.forEach((userImg) => {
    userImg.addEventListener("error", function () {
      let newImg = document.createElement("div");
      newImg.innerHTML = `<img src="images/profile-icon.png" data-bs-toggle="tooltip" data-bs-placement="top" title="Media url is either broken or not public."/>`;
      userImg.parentNode.replaceChild(newImg, userImg);
    });

    userImg.addEventListener("click", function () {
      const userImgModal = document.querySelector(".user-image-container");
      if (window.innerWidth > 768) {
        userImgModal.innerHTML = `<div class="d-flex justify-content-center" style="width:100vw;height:90vh;">
            <img class="mh-100 mw-100" src="${userImg.src}" alt="user profile image"/></div>`;
      } else {
        userImgModal.innerHTML = `<div class="d-flex justify-content-center">
            <img class="mh-100 mw-100" src="${userImg.src}" alt="user profile image"/></div>`;
      }
      window.onresize = function () {
        if (window.innerWidth > 768) {
          userImgModal.innerHTML = `<div class="d-flex justify-content-center" style="width:100vw;height:90vh;">
            <img class="mh-100 mw-100" src="${userImg.src}" alt="user profile image"/></div>`;
        } else {
          userImgModal.innerHTML = `<div class="d-flex justify-content-center">
            <img class="mh-100 mw-100" src="${userImg.src}" alt="user profile image"/></div>`;
        }
      };
    });
  });
}
