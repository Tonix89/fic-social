/**
 * This function creates an array of tags from tags of the posts.
 * @param {Array} data This is an array of data of all the posts.
 * @param {Element} tagList This is a html element where the tag array created will display.
 * @example
 * ```js
 * const tagList = document.querySelector(".taglist-container");
 * const data = [{post1: "Post 1", Tag:""},{post2: "Post 2", Tag:"tag"},{post3: "Post 3", Tag:"tag2"}];
 * const newArrayofTag = [];
 * data.forEach((tag)=>{
 *    if(tag){
 *      newArrayofTag.push(tag.Tag);
 *    }
 * })
 * // newArrayofTag will have have post2 and post3.
 * // Loop newArrayofTag then add to tagList innerHTML.
 * newArrayofTag.forEach((tag)=>{
 *  taglist.innerHTML += tag;
 * })
 * ```
 */
export function tagsArray(data, tagList) {
  const arrOfTags = [];
  data
    .filter((tagFilter) => {
      // console.log(tagFilter.tags);
      if (tagFilter.tags[0]) {
        return true;
      }
    })
    .filter((tagFilter) => {
      //   console.log(tagFilter);
      if (tagFilter.tags.length === 1) {
        arrOfTags.push(tagFilter.tags[0]);
        return true;
      } else {
        tagFilter.tags.forEach((singleTag) => {
          arrOfTags.push(singleTag);
        });
      }
    });
  //   console.log(arrOfTags);

  arrOfTags.forEach((tags) => {
    const list = document.createElement("li");
    list.className = "dropdown-item btn postTags";
    const listText = document.createTextNode(tags);
    list.appendChild(listText);
    tagList.appendChild(list);
  });
}
