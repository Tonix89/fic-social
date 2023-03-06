/**
 * This function calls an API "GET" request and returns the data responses of the request.
 * @param {String} auth This is the access token of the request.
 * @param {String} user This is the name of a user.
 * @param {URL} userInfoUrl This is the base url of the API request endpoint.
 * @returns {Array} This returns an array of the API request.
 */
const userInfoUrl = "https://api.noroff.dev/api/v1/social/profiles/";
export async function getRequest(auth, user) {
  const response = await fetch(userInfoUrl + user, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  });
  return response.json();
}
