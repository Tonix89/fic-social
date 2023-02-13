export function logout() {
  localStorage.removeItem("nat");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}
