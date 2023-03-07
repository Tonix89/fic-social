import { user } from "../logout/authorize.mjs";

/**
 * This function checked if the post when load already liked by the login user or not.
 * @param {number} id This is the id of the post
 * @returns {Array} This return the id of the post if is matches the save like post and empty array if it not.
 */
export function isItLiked(id) {
  // console.log(likedPost, id);
  const likedPost = localStorage.getItem("likedPost" + user);
  // console.log(likedPost);
  let trueLike = "";
  if (likedPost) {
    const likePostArray = likedPost.split(",");
    trueLike = likePostArray.filter((likediId) => {
      if (likediId == id) {
        return true;
      } else {
        return false;
      }
    });
  }
  return trueLike;
}
