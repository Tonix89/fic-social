/**
 * This function throw an error message if the media link is not public or can't load.
 * @param {Element} postImgs This is an array of img element in html.
 */
export function postMedia() {
  const postImgs = document.querySelectorAll(".post-img");
  postImgs.forEach((postImg) => {
    postImg.addEventListener("error", function () {
      const text = document.createElement("p");
      text.classList.add("m-0", "text-danger", "fw-bold");
      text.textContent =
        "The media url is either broken or not accessible publicly.";
      postImg.parentNode.insertBefore(text, postImg);
    });
  });
}
