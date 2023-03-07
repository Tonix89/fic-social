/**
 * This function will delete all the login details of user that stored in browser local storage.
 */
export function logout() {
  localStorage.removeItem("nat");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
