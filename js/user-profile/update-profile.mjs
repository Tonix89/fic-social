import { user } from "../logout/authorize.mjs";
import { auth } from "../logout/authorize.mjs";

/**
 * This function sends an API "PUT" request to update a media link.
 * @param {URL} media This is an url of the media.
 * @param {Element} errorText This is a html element that will be display when error occur on request.
 * @returns {Array} This returns an array of data reponses of the request.
 */
export async function sendPicture(media, errorText) {
  return fetch(
    "https://api.noroff.dev/api/v1/social/profiles/" + user + "/media",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify({
        avatar: media,
      }),
    }
  )
    .then((res) => {
      //   console.log(res);
      if (res.ok) {
        return res.json();
      } else {
        errorText.classList.replace("d-none", "d-flex");
      }
    })
    .then((data) => {
      //   console.log(data);
      errorText.classList.replace("d-flex", "d-none");
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}
