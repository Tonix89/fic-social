const userPic = document.querySelector(".user-pic");
const profileInfo = document.querySelector(".profile-text");

export function profileCard(userData) {
  //   console.log(userData);
  const { name, email, banner, avatar } = userData;
  // console.log(name, email, banner, avatar);
  const { followers, following, posts } = userData._count;
  // console.log(followers, following, posts);
  if (avatar) {
    userPic.innerHTML = `<img src="${avatar}">`;
  } else {
    userPic.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
      </svg>`;
  }
  profileInfo.innerHTML = `<h6>Name : ${name}</h6>
                        <h6>Email : ${email}</h6>
                        <h6>Post : ${posts}</h6>
                        <div class="follow">
                            <h6>Followers : ${followers}</h6>
                            <h6>Following : ${following}</h6>
                        </div>`;
}
