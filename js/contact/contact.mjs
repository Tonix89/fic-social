export function getContact(data) {
  console.log(data);
  const contactCont = document.querySelector(".contacts-cont");
  const contactSmCont = document.querySelector(".contacts-sm");
  const contactSmBtn = document.querySelector(".contacts-sm-button");
  contactCont.innerHTML = "";
  contactSmCont.innerHTML = "";
  if (data.length === 0) {
    contactCont.innerHTML = "You followed No One.";
  } else {
    data.forEach((info, i) => {
      const { name, avatar } = info;
      contactCont.innerHTML += `<div class="contact-profile-cont">
    <img src="${avatar}">
    <div class="contact-header-cont">
        <h5>${name}</h5>
    </div>
</div>`;
      if (i !== 0) {
        contactSmCont.innerHTML += `<li><div class="contact-profile-cont">
    <img src="${avatar}">
    <div class="contact-header-cont ms-2">
        <h5>${name}</h5>
    </div>
</div></li>`;
      } else {
        contactSmBtn.innerHTML = `<div class="profile-img-cont">
    <img src="${avatar}">
    <div class="profile-header-cont">
        <h5>${name}</h5>
    </div>
</div>`;
      }
    });
  }
}
