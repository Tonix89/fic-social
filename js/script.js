import { signUp } from "./login/signup.mjs";
import { login } from "./login/login.mjs";

const logBtn = document.querySelector("#login-button");
const gotoSignUp = document.querySelector(".gotoSignUp");
const loginCard = document.querySelector("#login-card");
const signUpCard = document.querySelector("#signup-card");
const signUpBtn = document.querySelector("#signup-button");
const showPw = document.getElementById("showPw");

const noroffBaseUrl = "https://api.noroff.dev/api/v1";

logBtn.addEventListener("click", function (e) {
  e.preventDefault();
  login(noroffBaseUrl, e);
});

gotoSignUp.addEventListener("click", function (e) {
  e.preventDefault();
  loginCard.classList.replace("d-flex", "d-none");
  signUpCard.classList.replace("d-none", "d-flex");

  signUpBtn.addEventListener("click", function (e) {
    e.preventDefault();
    signUp(noroffBaseUrl, e);
  });
});

showPw.addEventListener("click", function () {
  if (showPw.checked) {
    document.getElementById("password").type = "text";
  } else {
    document.getElementById("password").type = "password";
  }
});
