import { auth } from "../logout/authorize.mjs";

/**
 * This function send and API "GET" request to get the details of the post.
 * @param {number} postId This is the id of the post.
 * @returns {Array} This return an array of data from the API request.
 */
export async function getPostDetails(postId) {
  const options = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  const response = await fetch(
    `https://api.noroff.dev/api/v1/social/posts/${postId}?_author=true&_comments=true&_reactions=true`,
    options
  );
  const data = await response.json();
  return data;
}
