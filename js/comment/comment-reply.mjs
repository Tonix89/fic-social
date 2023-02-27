export function getReply(data, id) {
  //   console.log(data, id);
  const comReply = data.comments.filter((comments) => {
    if (comments.replyToId) {
      return true;
    } else {
      return false;
    }
  });
  //   console.log(comReply);
  if (comReply) {
    comReply.forEach((reply) => {
      if (reply.replyToId === id) {
        const replyCont = document.getElementById(`${id}-reply`);
        replyCont.innerHTML += `<div class="border-top mt-2 mb-2">
          <div class="d-flex mt-2 ">
              <img class="rounded-circle" style="width:25px;height:25px" src="${reply.author.avatar}" alt="user profile image" />
              <div class="user-header-cont ps-3 flex-grow-1">
                  <h5 class="m-0">${reply.author.name}</h5>
              </div>
              <div data-bs-toggle="tooltip" data-bs-placement="top" title="Date Created :${reply.created}"><img src="icons/calendar_month_FILL0_wght100_GRAD-25_opsz20.png" alt="calendar icon" /></div>
          </div>
          <div class="d-flex flex-column">
              <p class="mt-3 bg-light p-2">${reply.body}</p>
              <p class="fs-6 m-0 p-0 fw-lighter reply-button btn bg-light align-self-end" id="${id}-@${reply.author.name}">Reply</p>
          </div>
      </div>`;
      }
    });
  }
}
