import { user } from "../logout/authorize.mjs";
import { auth } from "../logout/authorize.mjs";

export async function getFollowing() {
  const res = await fetch(
    `https://api.noroff.dev/api/v1/social/profiles/${user}?_following=true&_followers=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
  );
  return res.json();
}
