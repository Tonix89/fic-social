import { userImage } from "../function/user-image.mjs";
import { profileCard } from "../profile/profile-cont.mjs";
import { getRequest } from "./get-user.mjs";

const nameOfUser = document.querySelector("#nameOfUser");
const userPic = document.querySelector(".user-profile-pic");

/**
 * This function calls a function that send an API request and get an array of data to return and use it to display in html element.
 * @param {String} auth This is the access token for the API request.
 * @param {String} user  This is the name of the login user
 */
export function getUserInfo(auth, user) {
  getRequest(auth, user)
    .then((res) => {
      // console.log(res);
      if (res) {
        nameOfUser.innerHTML = res.name;
        if (res.avatar) {
          userPic.innerHTML = `<img class="user-image" src="${res.avatar}" alt="user profile image" />`;
        } else {
          userPic.innerHTML = `<img src="images/profile-icon.png" alt="user profile image" />`;
        }

        userImage();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
