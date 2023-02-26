import { auth } from "../logout/authorize.mjs";

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
  return res.json();
}
