import { auth } from "../logout/authorize.mjs";

/**
 * This function get the post details to be edit and display it on the create a post form
 * then set the post id as url parameter without reloading the page.
 * @param {NodeList} postInput This is a nodelist of input in the post form.
 * @param {Element} editBtnId This is a html element that calls a function when click.
 * @example
 * ```js
 * const editBtnId = document.querySelector(".edit-button")
 * // Get all the input element in the post form then destructured.
 * const postInput = document.querySelectorAll(".post-input");
 * const [titleInput, bodyInput, tagsInput, mediaInput] = postInput;
 * // The data of the post then destructured.
 * const postData = {title:this is the title, body:"",tags:"",media:""}
 * const { title, body, tags, media } = postData;
 * editBtnId.addEventListener("click", function(){
 *     titleInput.value = title;
 *     bodyInput.value = body;
 *     tagsInput.value = tags;
 *     mediaInput.value = media;
 * })
 * ```
 */
export function gotoedit(postInput, editBtnId) {
  if (!editBtnId.innerHTML) {
    editBtnId.style.display = "none";
  }
  editBtnId.addEventListener("click", function () {
    const posttoEditId = editBtnId.id.split("-")[0];
    // console.log(postId);
    editPost(posttoEditId).then((data) => {
      // console.log(data);
      const { title, body, tags, media } = data;
      // console.log(title, body, tags, media);

      const inputArray = Array.prototype.slice.call(postInput);
      const [titleInput, bodyInput, tagsInput, mediaInput] = inputArray;
      titleInput.value = title;
      bodyInput.value = body;
      tagsInput.value = tags;
      mediaInput.value = media;

      postInput.forEach((inputClass) => {
        inputClass.classList.add("text-danger");
      });

      const queryString = document.location.search;
      const params = new URLSearchParams(queryString);
      const edit = params.get("edit");
      if (!edit) {
        const url = window.location.href;
        const newUrl = url + "?edit=" + data.id;
        window.history.pushState({ path: newUrl }, "", newUrl);
      } else {
        var url = new URL(window.location.href);
        url.searchParams.set("edit", data.id);
        window.history.replaceState(null, "", url);
      }

      document.querySelector(".edit-post").innerHTML = "Edit Post";
      document.querySelector(".edit-post").classList.add("text-danger");

      document.querySelector(".header-nav").scrollIntoView();
    });
  });
}

/**
 * This function sent an API "GET" request.
 * @param {string | number} postId This is the id of the post.
 * @returns {Array} This return an arrat of data of the post.
 */
async function editPost(postId) {
  return await fetch("https://api.noroff.dev/api/v1/social/posts/" + postId, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      //   console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}
