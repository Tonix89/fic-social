import { auth } from "../logout/authorize.mjs";
import { searchUser } from "../function/search-user.mjs";

/**
 * This function get the details of the login user of who is following and follower using API "GET" request.
 * @param {string} user This is the name of login user.
 * @returns {array} This return an array of data of the API request.
 */

export async function getFollowing() {
  let username = searchUser();
  const res = await fetch(
    `https://api.noroff.dev/api/v1/social/profiles/${username}?_following=true&_followers=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );
  if (res.ok) {
    return res.json();
  } else {
    res.json().then((data) => {
      alert(`Error: ${data.errors[0].message}`);
    });
  }
}
