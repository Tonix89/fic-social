export function deleteEditParam() {
  var url = new URL(window.location.href);
  url.searchParams.delete("edit");
  window.history.replaceState(null, "", url);
}
