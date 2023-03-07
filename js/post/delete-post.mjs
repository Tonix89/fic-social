import { auth } from "../logout/authorize.mjs";

/**
 * This function calls a function that sent an API request.
 * @param {Element} delBtnId This is a html element that calls a function when click.
 * @example
 * ```js
 * const delBtnId = document.querySelector(".delete-button");
 * delBtnId.addEventListener("click", function()=>{
 *  anotherFunction();
 * })
 * ```
 */
export function goDelete(delBtnId) {
  if (!delBtnId.innerHTML) {
    delBtnId.style.display = "none";
  }
  delBtnId.addEventListener("click", function () {
    // console.log(delBtnId.id);
    const confirmDelete = "Are you sure you want to delete this post?";
    if (confirm(confirmDelete)) {
      deletePost(delBtnId.id);
    }
  });
}

/**
 * This function sent an API "DELETE" request.
 * @param {String | number} postId  This is the id the post to be deleted.
 */
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
      // console.log(data);
      if (data) {
        location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
