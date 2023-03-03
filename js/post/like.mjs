import { auth, user } from "../logout/authorize.mjs";
import { getPostDetails } from "./post-details.mjs";

/**
 * This function send an API "PUT" request.
 * @param {Element} reactBtn This is a html element that trigger the API request when click.
 */
export function hitLike(reactBtn) {
  reactBtn.addEventListener("click", function () {
    // console.log(reactBtn.id);
    const reactButton = reactBtn.id.split("/");
    const [postId, likedStatus, inModal] = reactButton;
    let symbol = "👎";
    let like = postId;
    if (postId === likedStatus) {
      symbol = "👍";
      like = "liked";
      reactBtn.src = "icons/thumb_up_FILL1_wght600_GRAD-25_opsz24.svg";
      if (inModal) {
        const postReactBtn = document.getElementById(`${postId}/${postId}`);
        postReactBtn.src = "icons/thumb_up_FILL1_wght600_GRAD-25_opsz24.svg";
        postReactBtn.id = `${postId}/${like}`;
      }
    } else {
      reactBtn.src = "icons/thumb_up_FILL0_wght200_GRAD0_opsz24.png";
      if (inModal) {
        const postReactBtn = document.getElementById(`${postId}/liked`);
        postReactBtn.src = "icons/thumb_up_FILL0_wght200_GRAD0_opsz24.png";
        postReactBtn.id = `${postId}/${like}`;
      }
    }
    fetch(
      `https://api.noroff.dev/api/v1/social/posts/${postId}/react/${symbol}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify({
          message: "liked",
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        // console.log(data);
        saveLikedPost(data);
        if (inModal) {
          reactBtn.id = `${postId}/${like}/modal`;
        } else {
          reactBtn.id = `${postId}/${like}`;
        }
        getPostDetails(postId).then((postData) => {
          //   console.log(postData);
          const { reactions } = postData;
          //   console.log(reactions);
          const likes = countsLike(reactions);
          if (inModal) {
            const likeCOunter = document.getElementById(`${postId}-counter`);
            likeCOunter.innerHTML = likes;
            const likeCOunterModal = document.getElementById(
              `${postId}-counter-modal`
            );
            likeCOunterModal.innerHTML = likes;
          } else {
            const likeCOunter = document.getElementById(`${postId}-counter`);
            likeCOunter.innerHTML = likes;
          }
        });
      })
      .catch((error) => {
        console.log(error);
        if (symbol === "👍") {
          reactBtn.src = "icons/thumb_up_FILL0_wght200_GRAD0_opsz24.png";
        } else {
          reactBtn.src = "icons/thumb_up_FILL1_wght600_GRAD-25_opsz24.svg";
        }
        alert(`Error: ${error}`);
      });
  });
}

/**
 * This function counts how many like reactions subtract by how many unlike reaction.
 * @param {Array} reactions This is an array of reactions in the posts.
 * @returns {number} This return the total likes subtracted by total unlike reaction.
 */
export function countsLike(reactions) {
  const likeSymbol = reactions.filter((reaction) => {
    if (reaction.symbol === "👍") {
      return true;
    }
  });
  const unlikeSymbol = reactions.filter((reaction) => {
    if (reaction.symbol === "👎") {
      return true;
    }
  });
  let unlikes = 0;
  if (unlikeSymbol.length > 0) {
    unlikes = unlikeSymbol[0].count;
  }
  let likes = 0;
  if (likeSymbol.length > 0) {
    likes = likeSymbol[0].count;
  }
  //console.log(likes, unlikes);
  let totalLikes = likes - unlikes;
  if (totalLikes < 0) {
    totalLikes = 0;
  }
  return totalLikes;
}

/**
 * This function save the liked posts of the login user in the local storage.
 * @param {Object} data This is the data response from API request.
 * @example
 * ```js
 * const data = {symbol: '👍', count: 1, postId: 3863};
 * let likePostArray = [];
 * if(data.symbol === '👍'){
 *  likePostArray.push(data.postId);
 *  // Save only the post id with the user name as the key so that the login user will retrived the owned data.
 * }else{
 *  // This means the login user unlike the post so we should take it out to the save like post post in the local storage.
 * }
 * ```
 */
function saveLikedPost(data) {
  const likedPost = localStorage.getItem("likedPost" + user);
  let likePostArray = [];
  if (likedPost) {
    likePostArray = likedPost.split(",");
    // console.log(likePostArray);
  }
  if (data.symbol === "👍") {
    likePostArray.push(data.postId);
    localStorage.setItem("likedPost" + user, likePostArray);
  } else {
    const newLikePostArray = likePostArray.filter((postid) => {
      if (postid != data.postId) {
        return true;
      } else {
        return false;
      }
    });
    // console.log(newLikePostArray);
    localStorage.setItem("likedPost" + user, newLikePostArray);
  }
}
