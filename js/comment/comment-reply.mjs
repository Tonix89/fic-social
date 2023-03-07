/**
 * This function filter the comments that is a reply from  a comment or "replyTtoId" is  true.
 * @param {array} data Array of comments in from an API Call.
 * @param {number} id This is the id of the comment that has reply.
 * @example
 * ```mjs
 * // Filter first all the comments with has a reply.
 * const  data = [{com1:comment, reply:true, replyToId:12}, {com2:comment,id:2,reply:false}, {com3:comment,reply:true, replyToId:13}];
 * const dataFiltered = data.filter((param)=>{
 *      if(param.id){
 *      return true
 *      }else{
 *      return false
 *      }
 *  })
 * // dataFiltered will now only have [{com1:comment, reply:true, replyToId:12}, {com3:comment,reply:true,replyToId:13}];
 * // Next is to match which comment it replies using id param.
 * const id = 12;
 * dataFiltered.forEach((param)=>{
 * if(id === replyToId){
 *  // The expected result will be com1.
 * }
 * })
 * ```
 */

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
