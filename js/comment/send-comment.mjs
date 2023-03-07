import { auth } from "../logout/authorize.mjs";
import { openComment } from "./comments.mjs";

/**
 * This function sent a comment using an API endpoint with "POST" method.
 * The request body depends if the comment is reply to main post or to another comment.
 * @param {number|string} id This is the id of the main post or  a comment.
 * @param {Array} data This is an array of data of the post.
 * @example
 * ```js
 * // Determine if the comment is a reply to the main post or to another comment by looking on its type.
 * const id = "12";
 * let requestBody = "";
 * if(typeof id === "string"){
 *          // Request body must include id. This is the id of the comment to reply.
 *          requestBody = {
 *                  body : comment,
 *                  replyToId : id
 *              }
 *      }else{
 *          // Request body must only be the comment value. This is a reply to the main post.
 *          requestBody = {
 *                  body : comment
 *              }
 *      }
 * ```
 */
export async function sendComment(id, data) {
  const commentInput = document.getElementById(`${data.id}-input`);
  if (commentInput.value) {
    // console.log(typeof id, id);
    let comBody = "";
    if (typeof id === "string") {
      comBody = {
        body: commentInput.value,
        replyToId: parseInt(id),
      };
    } else {
      comBody = {
        body: commentInput.value,
      };
    }
    try {
      //   console.log(comBody);
      const res = await fetch(
        `https://api.noroff.dev/api/v1/social/posts/${data.id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(comBody),
        }
      );
      //   console.log(res.json());
      if (res.ok) {
        openComment(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
