import { auth } from "../logout/authorize.mjs";
import { validateUrl } from "../validate/url.mjs";
import { validateLength } from "../validate/length.mjs";

export function getBodyData(
  postInput,
  postTitleError,
  postMediaError,
  postError,
  postLoader
) {
  const inputArray = Array.prototype.slice.call(postInput).map((input) => {
    if (input.value) {
      return input.value;
    } else {
      return (input = "");
    }
  });
  // console.log(inputArray);
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
        addPost(postData, postError, postLoader);
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
      addPost(postData, postError, postLoader);
    }
  } else {
    postTitleError.classList.replace("d-none", "d-flex");
  }
}

function addPost(postData, postError, postLoader) {
  fetch("https://api.noroff.dev/api/v1/social/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      if (data.id) {
        postLoader.classList.replace("d-inline-block", "d-none");
        postError.innerHTML = "New post submitted successfuly";
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    })
    .catch((error) => {
      postLoader.classList.replace("d-inline-block", "d-none");
      postError.innerHTML =
        "There was a problem when submitting your post. Try again or reload the page. " +
        error;
    });
}
