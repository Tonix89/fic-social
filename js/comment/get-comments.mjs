import { sendComment } from "./send-comment.mjs";
import { getReply } from "./comment-reply.mjs";

/**
 * This function gets all the main comments of a post.
 * @param {Array} data This is an arrays of a post data.
 * @param {Element} commentCard This is a html element where the result will be display.
 * @example
 * ```js
 * // First filter if the comment is replying to the post and not to another comment.
 * const  data = [{com1:comment, reply:true, replyToId:12}, {com2:comment,id:2,reply:false}, {com3:comment,reply:true, replyToId:13}];
 * const dataFiltered = data.filter((param)=>{
 *      if(!reply){
 *          return true;
 *      }else{
 *          return false;
 *      }
 * })
 * // The dataFiltered will now have {com2:comment,id:2,reply:false} remain.
 * // Extract the data from the remaining array and used it to display in commentCard element.
 * ```
 */
export function getComments(data, commentCard) {
  //   console.log(data);
  const mainComments = data.comments.filter((comments) => {
    if (!comments.replyToId) {
      return true;
    } else {
      return false;
    }
  });
  mainComments.forEach((comment) => {
    const { body, replyToId, id, postId, owner, created, author } = comment;
    const { name, email, avatar, banner } = author;
    commentCard.innerHTML += `<div class="border-bottom mb-2">
      <div class="d-flex ">
          <img class="rounded-circle" style="width:25px;height:25px" src="${avatar}" alt="user profile image" />
          <div class="user-header-cont ps-3 flex-grow-1">
              <h5 class="m-0">${name}</h5>
          </div>
          <div data-bs-toggle="tooltip" data-bs-placement="top" title="Date Created :${created}"><img src="icons/calendar_month_FILL0_wght100_GRAD-25_opsz20.png" alt="calendar icon" /></div>
      </div>
      <div class="d-flex flex-column">
          <p class="mt-3 bg-light p-2">${body}</p>
          <p class="fs-6 m-0 p-0 fw-lighter reply-button btn bg-light align-self-end" id="${id}-@${name}">Reply</p>
          <div class="ps-5 pe-5" id="${id}-reply"></div>
      </div>
  </div>
  `;
    getReply(data, id);
  });

  const replyToBtns = document.querySelectorAll(".reply-button");
  const postCommentInput = document.getElementById(`${data.id}-input`);
  let repToCom = "";
  replyToBtns.forEach((replyToBtn) => {
    const repsId = replyToBtn.id.split("-");
    const [repBtnId, repAuthor] = repsId;
    replyToBtn.addEventListener("click", function () {
      postCommentInput.value = repAuthor;
      //   console.log(repBtnId, repAuthor);
      postCommentInput.scrollIntoView();
      repToCom = repBtnId;
    });
  });
  const comBtn = document.querySelector("#comment-button");
  comBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let isReply = postCommentInput.value.split("")[0];
    if (isReply === "@") {
      sendComment(repToCom, data);
    } else {
      repToCom = data.id;
      sendComment(repToCom, data);
    }
  });
}
