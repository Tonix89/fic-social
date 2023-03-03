/**
 * This function calls a function that creates an array of post tags.
 * @param {Array} data This is an array post data.
 * @param {Element} tagList This is a html element where the tag array to be displayed.
 */

import { tagsArray } from "../post/filter-post.mjs";
export function createTagArray(data) {
  const tagList = document.querySelector("#tagList");
  tagsArray(data, tagList);

  const tagList2 = document.querySelector("#tagList2");
  tagsArray(data, tagList2);
}
