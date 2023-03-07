import { goDelete } from "../post/delete-post.mjs";
import { gotoedit } from "../post/edit-post.mjs";
import { hitLike } from "../post/like.mjs";

/**
 * This function triggers to call a function when a html element is clicked.
 * @param {Element} button This is a html element that trigger the a function when clicked.
 * @example
 * ```js
 * const deleteButton = document .querySelector(".delete-icon");
 * deleteButton.addEventListener("click", function(){
 *      deleteThis(deleteButton.id);
 * })
 * ```
 */

export function clickButton() {
  const delBtn = document.querySelectorAll(".del-button");
  delBtn.forEach((delBtnId) => {
    goDelete(delBtnId);
  });

  const postInput = document.querySelectorAll(".post-input");
  const editBtn = document.querySelectorAll(".edit-button");
  editBtn.forEach((editBtnId) => {
    gotoedit(postInput, editBtnId);
  });

  const likeBtn = document.querySelectorAll(".react-like");
  likeBtn.forEach((likeBtnId) => {
    // console.log(likeBtnId.id);
    hitLike(likeBtnId);
  });
}
