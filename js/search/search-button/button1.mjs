import { tagUserSearch } from "../tagUser-search.mjs";
import { idSearch } from "../id-search.mjs";

/**
 * This function changes the API request endpoint based on the search value.
 * Then it calls a function that send an API request.
 * @param {Element} searchInput This is a html element which holds the search value.
 * @param {Element} postCont This is a html element where the result be displayed.
 */
export function goSearch(searchInput, postCont) {
  const searchValue = searchInput.value.split("")[0];
  let searchUrl = "";
  if (searchValue === "#") {
    searchUrl =
      "https://api.noroff.dev/api/v1/social/posts?_author=true&_comments=true&_reactions=true&_tag=" +
      searchInput.value.split("#")[1];
    tagUserSearch(searchInput.value, searchUrl, postCont);
  } else {
    const isValueNumber = parseInt(searchInput.value);
    // console.log(isValueNumber);
    if (isNaN(isValueNumber)) {
      // console.log(searchInput.value);
      searchUrl = `https://api.noroff.dev/api/v1/social/profiles/${searchInput.value}/posts?_author=true&_comments=true&_reactions=true`;
      tagUserSearch(searchInput.value, searchUrl, postCont);
    } else {
      const numToString = isValueNumber.toString();
      idSearch(numToString, postCont);
    }
  }
}
