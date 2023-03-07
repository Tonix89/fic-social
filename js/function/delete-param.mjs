/**
 * This function delete a parameter in the present window url.
 * @param {url} url This is the current page url.
 */

export function deleteEditParam() {
  var url = new URL(window.location.href);
  url.searchParams.delete("edit");
  window.history.replaceState(null, "", url);
}
