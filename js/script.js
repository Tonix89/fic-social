const logBtn = document.querySelector("#login-button");
const emailValue = document.querySelector("#email");
const pwValue = document.querySelector("#password");

function login() {
  if (emailValue.value && pwValue.value) {
    logBtn.href = "home.html";
  } else {
    logBtn.href = "#";
  }
}
logBtn.addEventListener("click", login);
