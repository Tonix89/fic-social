import { auth } from "../logout/authorize.mjs";

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
