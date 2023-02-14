import { profileCard } from "../profile/profile-cont.mjs";

const nameOfUser = document.querySelector("#nameOfUser");
const userPic = document.querySelector(".user-profile-pic");

const userInfoUrl = "https://api.noroff.dev/api/v1/social/profiles/";

export function getUserInfo(auth, user) {
  getRequest(auth, user)
    .then((res) => {
      console.log(res);
      if (res) {
        if (window.location.pathname === "/profile.html") {
          profileCard(res);
        }
        nameOfUser.innerHTML = `<h4>${res.name}</h4>`;
        if (res.avatar) {
          userPic.innerHTML = `<img src="${res.avatar}">`;
        } else {
          userPic.innerHTML = `<img src="images/profile-icon.png">`;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

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
