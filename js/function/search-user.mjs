import { user } from "../logout/authorize.mjs";
export function searchUser() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const name = params.get("user");
  if (name) {
    return name;
  } else {
    return user;
  }
}
