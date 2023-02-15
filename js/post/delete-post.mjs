import { auth } from "../logout/authorize.mjs";

export function deletePost(postId) {
  fetch("https://api.noroff.dev/api/v1/social/posts/" + postId, {
    method: "DELETE",
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
      console.log(data);
      if (data) {
        location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
