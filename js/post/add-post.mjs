import { auth } from "../logout/authorize.mjs";
import { validateUrl } from "../validate/url.mjs";
import { validateLength } from "../validate/length.mjs";
let url = "https://api.noroff.dev/api/v1/social/posts";

/**
 *
 * @param {NodeList} postInput This is a nodelist of input in the post form.
 * @param {Element} postTitleError This is a html element that will display if validation is not successful.
 * @param {Element} postMediaError  This is a html element that will display if validation is not successful.
 * @param {Element} postError This is a html element that will display if validation is not successful.
 * @param {Element} postLoader This is a html element that will display if while the request is being process.
 * @param {String} postId Id of the post if it edited or null if it a new post.
 */
export function getBodyData(
  postInput,
  postTitleError,
  postMediaError,
  postError,
  postLoader,
  postId
) {
  /**
   * Check first if the request is to send a new post or to edit a post by checking if postId is true or false.
   */
  if (postId) {
    url = "https://api.noroff.dev/api/v1/social/posts/" + postId;
  }

  /**
   * Convert the nodelist to an array then return empty string if the value attribute is not true.
   */
  const inputArray = Array.prototype.slice.call(postInput).map((input) => {
    if (input.value) {
      return input.value;
    } else {
      return (input = "");
    }
  });
  // console.log(inputArray);
  /**
   * Destructured the inputArray.
   */
  const [title, body, tags, media] = inputArray;
  const tagsArray = tags.split(",");
  if (validateLength(title, 5) === true) {
    postTitleError.classList.replace("d-flex", "d-none");
    if (media) {
      if (validateUrl(media) === true) {
        const postData = {
          title: title,
          body: body,
          tags: tagsArray,
          media: media,
        };
        postMediaError.classList.replace("d-flex", "d-none");
        postLoader.classList.replace("d-none", "d-inline-block");
        addPost(postData, postError, postLoader, postId);
      } else {
        postMediaError.classList.replace("d-none", "d-flex");
      }
    } else {
      const postData = {
        title: title,
        body: body,
        tags: tagsArray,
        media: media,
      };
      postMediaError.classList.replace("d-flex", "d-none");
      postLoader.classList.replace("d-none", "d-inline-block");
      addPost(postData, postError, postLoader, postId);
    }
  } else {
    postTitleError.classList.replace("d-none", "d-flex");
  }
}

/**
 * This function sent an API "POST" request.
 * @param {object} postData The data of the body that will be sent to the "POST" request.
 * @param {Element} postError This is a html element where error will be display.
 * @param {Element} postLoader This is a html element that will be display while the request is still being processed.
 * @param {String} postId Id of the post if it edited or null if it a new post.
 */
function addPost(postData, postError, postLoader, postId) {
  let bodyData = "";
  if (postId) {
    bodyData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify(postData),
    };
  } else {
    bodyData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify(postData),
    };
  }
  // console.log(url, bodyData);
  fetch(url, bodyData)
    .then((response) => {
      // console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      // console.log(data);
      if (data.id) {
        postLoader.classList.replace("d-inline-block", "d-none");
        if (postId) {
          postError.innerHTML = "Post Edited successfuly";
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          postError.innerHTML = "New post submitted successfuly";
          setTimeout(() => {
            location.reload();
          }, 3000);
        }
      }
    })
    .catch((error) => {
      postLoader.classList.replace("d-inline-block", "d-none");
      postError.innerHTML =
        "There was a problem when submitting your post. Try again or reload the page. " +
        error;
    });
}
