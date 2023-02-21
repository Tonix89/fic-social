import { auth, user } from "../logout/authorize.mjs";
import { getPostDetails } from "./post-details.mjs";

export function hitLike(reactBtn) {
  reactBtn.addEventListener("click", function () {
    console.log(reactBtn.id);
    const postId = reactBtn.id.split("/")[0];
    const likedStatus = reactBtn.id.split("/")[1];
    let symbol = "👎";
    let like = postId;
    if (postId === likedStatus) {
      symbol = "👍";
      like = "liked";
      reactBtn.src = "icons/thumb_up_FILL1_wght600_GRAD-25_opsz24.svg";
    } else {
      reactBtn.src = "icons/thumb_up_FILL0_wght200_GRAD0_opsz24.png";
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
        } else {
          console.log(res);
        }
      })
      .then((data) => {
        // console.log(data);
        saveLikedPost(data);
        reactBtn.id = `${postId}/${like}`;
        getPostDetails(postId).then((postData) => {
          //   console.log(postData);
          const { reactions } = postData;
          //   console.log(reactions);
          const likes = countsLike(reactions);
          const likeCOunter = document.getElementById(`${postId}-counter`);
          likeCOunter.innerHTML = likes;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

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
  const totalLikes = likes - unlikes;
  return totalLikes;
}

function saveLikedPost(data) {
  const likedPost = localStorage.getItem("likedPost" + user);
  let likePostArray = [];
  if (likedPost) {
    likePostArray = likedPost.split(",");
    console.log(likePostArray);
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
