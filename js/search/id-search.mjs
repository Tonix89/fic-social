import { getPostDetails } from "../post/post-details.mjs";
import { user } from "../logout/authorize.mjs";
import { countsLike } from "../post/like.mjs";
import { isItLiked } from "../post/liked-post.mjs";
import { clickButton } from "../function/post-buttons.mjs";
import { commentModal } from "../function/comment-modal.mjs";
import { followButtons } from "../follow/follow-buttons.mjs";
import { userImage } from "../function/user-image.mjs";
import { displayPost } from "../post/display-post.mjs";

/**
 * This function calls an API request and recieve an array of data to be displayed in the html.
 * @param {string | number} postId This is the id of the post that the user searched.
 * @param {Element} postCont  This is a html element where the result will be display.
 * @example
 * ```js
 * const postId = "1234";
 * const postCont = document.querySelector(".post-container");
 * getPostDetailsFunction(postId).then((postDetails)=>{
 *      postCont.innerHTML = postDetails;
 * })
 * ```
 */
export function idSearch(postId, postCont) {
  postCont.innerHTML = `<div class
    ="post-loader d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
    </div>`;
  const postHeader = document.querySelector(".post-header");
  postHeader.innerHTML = `Searching for Post Id :"${postId}"`;

  getPostDetails(postId).then((data) => {
    // console.log(data);
    if (data.errors) {
      postCont.innerHTML = `
      <div class="post-card text-center">
          <div class="post-card-header">
              
          </div>
          <div class="post-card-body">
          <h3>${data.errors[0].message}</h3>
          </div>
      </div>`;
    } else {
      displayPost(data, postCont);

      const postLoader = document.querySelector(".post-loader");
      postLoader.classList.replace("d-flex", "d-none");
      postHeader.innerHTML = `Search Results for Post Id :"${postId}"`;
      if (data) {
        if (data.length === 0) {
          postCont.innerHTML = `<h3>"0" Search Result</h3>`;
        }
        if (data.errors) {
          postCont.innerHTML = `<h3>${data.errors[0].message}</h3>`;
        }
      }

      clickButton();

      commentModal();

      followButtons();

      userImage();
    }
  });
}
