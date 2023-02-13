import { logout } from "../logout/logout.mjs";

const profileBtn = document.querySelector("#profile-btn");
const contactBtn = document.querySelector("#contact-btn");
const profileCont = document.querySelector("#profile-cont");
const contactCont = document.querySelector("#contact-cont");

const logOutBtn = document.querySelector(".logout");

logOutBtn.addEventListener("click", function () {
  logout();
});

profileBtn.addEventListener("click", function () {
  profileCont.classList.replace("d-none", "d-flex");
  profileBtn.classList.add("active");
  contactBtn.classList.remove("active");
  contactCont.classList.replace("d-block", "d-none");
});

contactBtn.addEventListener("click", function () {
  contactCont.classList.replace("d-none", "d-block");
  contactBtn.classList.add("active");
  profileBtn.classList.remove("active");
  profileCont.classList.replace("d-flex", "d-none");
});
