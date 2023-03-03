import { userImage } from "../function/user-image.mjs";
import { profileCard } from "../profile/profile-cont.mjs";

const nameOfUser = document.querySelector("#nameOfUser");
const userPic = document.querySelector(".user-profile-pic");

const userInfoUrl = "https://api.noroff.dev/api/v1/social/profiles/";

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
        // console.log(res);
        if (window.location.pathname === "/profile.html") {
          profileCard(res);
        }
        nameOfUser.innerHTML = `<h4>${res.name}</h4>`;
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

/**
 * This function calls an API "GET" request and returns the data responses of the request.
 * @param {String} auth This is the access token of the request.
 * @param {String} user This is the name of a user.
 * @returns {Array} This returns an array of the API request.
 */
async function getRequest(auth, user) {
  const response = await fetch(userInfoUrl + user, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  });
  return response.json();
}
