import { auth } from "../logout/authorize.mjs";

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
