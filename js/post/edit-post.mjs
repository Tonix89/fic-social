import { auth } from "../logout/authorize.mjs";

export async function editPost(postId) {
  return await fetch("https://api.noroff.dev/api/v1/social/posts/" + postId, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      //   console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}
