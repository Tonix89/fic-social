import { auth } from "../logout/authorize.mjs";
export function goDelete(delBtnId) {
  if (!delBtnId.innerHTML) {
    delBtnId.style.display = "none";
  }
  delBtnId.addEventListener("click", function () {
    console.log(delBtnId.id);
    const confirmDelete = "Are you sure you want to delete this post?";
    if (confirm(confirmDelete)) {
      deletePost(delBtnId.id);
    }
  });
}

function deletePost(postId) {
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
