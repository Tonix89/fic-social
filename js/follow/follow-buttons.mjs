import { getFollowing } from "./follow.mjs";
import { followUser } from "./follow-user.mjs";
import { getContact } from "../contact/contact.mjs";
import { user } from "../logout/authorize.mjs";

/**
 * This functions will determined if the displayed users are followed by login user or not.
 * @param {Element} buttons These are html element.
 * @param {Array} data This is an array of data of who are the users followed by the login user.
 * @example
 * ```js
 * const buttons = document.querySelectorAll(".buttons");
 * const data = [{user1},{user3}];
 * // Loop the name of users the login user's follow then use it to get the html element to change the innerHTML.
 * const userButton = document.querySelector("user1");
 * userButton.innerHTML = "Followed";
 * // If the data lenght is 0, the login user is not following anyone.
 * buttos.innerHTML = "Follow";
 * ```
 */

export function followButtons() {
  const followBtns = document.querySelectorAll(".follow-button");
  function followInfo(followBtns) {
    getFollowing().then((data) => {
      // console.log(data);
      getContact(data);
      if (data.following.length !== 0) {
        const followings = data.following;
        followings.forEach((following) => {
          const userfollowBtns = document.querySelectorAll(
            `#${following.name}`
          );
          // console.log(userfollowBtns);
          if (userfollowBtns.length !== 0) {
            userfollowBtns.forEach((followBtn) => {
              followBtn.innerHTML = "Followed";
            });
          }
        });
      } else {
        followBtns.forEach((followBtn) => {
          followBtn.innerHTML = "Follow";
        });
      }
      followBtns.forEach((followBtn) => {
        if (followBtn.id === user) {
          followBtn.innerHTML = "";
        }
      });
    });
  }
  followInfo(followBtns);

  /**
   * This function will call a function that will send a "PUT" method request.
   * It will update the status of the other user if the login user is following or not the other user.
   * @param {Element} followBtns This is a html element.
   * @example
   * ```js
   * const followButtons = // Get all follow buttons available in current page.
   * // Get the id follow button you clicked using forEach().
   * followButtons.forEach((followButton)=>{
   *      // Get the id and use it as parameter in "PUT" request.
   *      putRequest(followButton);
   * })
   */

  followBtns.forEach((followBtn) => {
    followBtn.addEventListener("click", function () {
      let follow = `${followBtn.id}/follow`;
      if (followBtn.innerHTML === "Followed") {
        follow = `${followBtn.id}/unfollow`;
        const userfollowBtns = document.querySelectorAll(`#${followBtn.id}`);
        userfollowBtns.forEach((userfollowBtn) => {
          userfollowBtn.innerHTML = "Follow";
        });
      }
      followUser(follow).then((data) => {
        // console.log(data);
        if (data) {
          followInfo(followBtns);
        }
      });
    });
  });
}
