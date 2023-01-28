const profileBtn = document.querySelector("#profile-btn");
const contactBtn = document.querySelector("#contact-btn");

function profileCont() {
  document.querySelector("#profile-cont").classList.add("d-block");
  document.querySelector("#profile-cont").classList.remove("d-none");
  profileBtn.classList.add("active");
  contactBtn.classList.remove("active");
  document.querySelector("#contact-cont").classList.remove("d-block");
  document.querySelector("#contact-cont").classList.add("d-none");
}
profileBtn.addEventListener("click", profileCont);

function contactCont() {
  document.querySelector("#contact-cont").classList.add("d-block");
  document.querySelector("#contact-cont").classList.remove("d-none");
  contactBtn.classList.add("active");
  profileBtn.classList.remove("active");
  document.querySelector("#profile-cont").classList.remove("d-block");
  document.querySelector("#profile-cont").classList.add("d-none");
}
contactBtn.addEventListener("click", contactCont);
