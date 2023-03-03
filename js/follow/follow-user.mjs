import { auth } from "../logout/authorize.mjs";

/**
 * This function send an API "PUT" request to follow or unfollow a user by a login user.
 * @param {string} follow This is the parameter whether to follow or unfollow the clicked user.
 * This contents the name of the user that sent request and the action wants to request (follow or unfollow)
 * @returns {json} this is the data of the request if it is successful.
 */

export async function followUser(follow) {
  const res = await fetch(
    `https://api.noroff.dev/api/v1/social/profiles/${follow}`,
    {
      method: "PUT",
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
