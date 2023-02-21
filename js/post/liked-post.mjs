import { user } from "../logout/authorize.mjs";
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
