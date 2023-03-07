import { getPost } from "../post/get-post.mjs";
import { clickButton } from "../function/post-buttons.mjs";
import { commentModal } from "../function/comment-modal.mjs";
import { followButtons } from "../follow/follow-buttons.mjs";
import { userImage } from "../function/user-image.mjs";

/**
 * This function calls a function that send an API request then receive a data back to use to display in html.
 * @param {String} searchInput This is the search value.
 * @param {URL} searchUrl This is the API request endpoint.
 * @param {Element} postCont This is a html element where the result to be displayed.
 * @example
 * ```js
 * const searchInput = "testing";
 * const searchUrl = "https://example.com/api/v1";
 * const postCont = document.querySelector(".post-container");
 * apiRequestFunction(searchInput, searchUrl).then((dataBack)=>{
 *    postCont.innerHTML = dataBack;
 * })
 * ```
 */
export function tagUserSearch(searchInput, searchUrl, postCont) {
  postCont.innerHTML = `<div class
    ="post-loader d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
    </div>`;
  const postHeader = document.querySelector(".post-header");
  postHeader.innerHTML = `Searching for "${searchInput}"`;

  getPost(searchUrl, postCont).then((data) => {
    postHeader.innerHTML = `Search Results for "${searchInput}"`;

    // console.log(data);
    if (data) {
      if (data.length === 0) {
        postCont.innerHTML = `
      <div class="post-card text-center">
          <div class="post-card-header">
              
          </div>
          <div class="post-card-body">
          <h3>No Post With This Tag</h3>
          </div>
      </div>`;
      }
    } else {
      postCont.innerHTML = `
      <div class="post-card text-center">
          <div class="post-card-header">
              
          </div>
          <div class="post-card-body">
          <h3>No User Found</h3>
          </div>
      </div>`;
    }

    clickButton();

    commentModal();

    followButtons();

    userImage();
  });
}
