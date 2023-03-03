import { openComment } from "../comment/comments.mjs";

/**
 * This function will call a function that opens a modal to display the specific post with the comments.
 * @param {Element} button This is an html element that when clicked it will trigger to open the modal.
 * @example
 * ```js
 * const commentIcon = document.querySelector(".comment-icon");
 * commentIcon.addEventListener("click", function(){
 *  openModal(commmentIcon.id)
 * })
 * ```
 */

export function commentModal() {
  const commentBtn = document.querySelectorAll(".comment-button");
  commentBtn.forEach((commentBtnId) => {
    commentBtnId.addEventListener("click", function () {
      // console.log(commentBtnId.id);
      const postId = commentBtnId.id.split(".")[0];
      openComment(postId);
    });
  });

  const postImgBtn = document.querySelectorAll(".post-img");
  postImgBtn.forEach((postImgBtnId) => {
    postImgBtnId.addEventListener("click", function () {
      // console.log(commentBtnId.id);
      const postId = postImgBtnId.id.split("*")[0];
      openComment(postId);
    });
  });
}
