import { auth } from "../logout/authorize.mjs";
const postLoader = document.querySelector(".post-loader");
import { displayPost } from "./display-post.mjs";

/**
 * This function send an API "GET" request.
 * @param {URL} postUrl This is the API request endpoint.
 * @param {Element} postCont This is a html element where the error will display.
 * @returns {Array} This return the data from the API request.
 */
export async function getPost(postUrl, postCont) {
  return fetch(postUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  })
    .then((res) => {
      // console.log(res);
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      // console.log(data);
      if (data) {
        postLoader.classList.replace("d-flex", "d-none");
        postCont.innerHTML = "";

        data.forEach((post) => {
          // console.log(post);
          displayPost(post, postCont);
        });
      }
      return data;
    })
    .catch((error) => {
      console.log(error);
      postLoader.classList.replace("d-flex", "d-none");
      postCont.innerHTML = `<div class="post-card">
        <div class="post-card-header">
        </div>
        <div class="post-card-body">
            Sorry we have error fetching post data. ${error}.
        </div>
    </div>`;
    });
}
