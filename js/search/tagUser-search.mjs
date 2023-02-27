import { getPost } from "../post/get-post.mjs";
import { gotoedit } from "../post/edit-post.mjs";
import { goDelete } from "../post/delete-post.mjs";
import { hitLike } from "../post/like.mjs";
import { openComment } from "../comment/comments.mjs";
import { getFollowing } from "../follow/follow.mjs";
import { followUser } from "../follow/follow-user.mjs";
import { getContact } from "../contact/contact.mjs";

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
    const postInput = document.querySelectorAll(".post-input");
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

    const editBtn = document.querySelectorAll(".edit-button");
    editBtn.forEach((editBtnId) => {
      // console.log(postInput, editBtnId);
      gotoedit(postInput, editBtnId);
    });

    const delBtn = document.querySelectorAll(".del-button");
    delBtn.forEach((delBtnId) => {
      goDelete(delBtnId);
    });

    const likeBtn = document.querySelectorAll(".react-like");
    likeBtn.forEach((likeBtnId) => {
      // console.log(likeBtnId.id);
      hitLike(likeBtnId);
    });

    const commentBtn = document.querySelectorAll(".comment-button");
    commentBtn.forEach((commentBtnId) => {
      commentBtnId.addEventListener("click", function () {
        // console.log(commentBtnId.id);
        const postId = commentBtnId.id.split(".")[0];
        openComment(postId);
      });
    });

    const followBtns = document.querySelectorAll(".follow-button");
    function followInfo(followBtns) {
      getFollowing().then((data) => {
        // console.log(data);
        getContact(data);
        if (data.following.length !== 0) {
          const followings = data.following;
          followings.forEach((following) => {
            const followBtns = document.querySelectorAll(`#${following.name}`);
            // console.log(followBtns);
            if (followBtns.length !== 0) {
              followBtns.forEach((followBtn) => {
                followBtn.innerHTML = "Followed";
              });
            }
          });
        } else {
          followBtns.forEach((followBtn) => {
            followBtn.innerHTML = "Follow";
          });
        }
      });
    }
    followInfo(followBtns);

    followBtns.forEach((followBtn) => {
      followBtn.addEventListener("click", function () {
        let follow = `${followBtn.id}/follow`;
        if (followBtn.innerHTML === "Followed") {
          follow = `${followBtn.id}/unfollow`;
          followBtn.innerHTML = "Follow";
        }
        followUser(follow).then((data) => {
          // console.log(data);
          if (data) {
            followInfo(followBtns);
          }
        });
      });
    });
  });
}
