import { tagUserSearch } from "../tagUser-search.mjs";
import { idSearch } from "../id-search.mjs";
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
